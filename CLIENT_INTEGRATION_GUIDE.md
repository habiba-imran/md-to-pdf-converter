# Client Integration Guide

This guide is for enterprise client teams integrating the active Urdu Voice Agent browser SDK shipped from `uva-agent-system/sdk/`. It documents only the client-facing contract and the host-backend handshake required to start a voice session.

## 1. Overview And Core Features

The SDK provides:

- low-latency browser-to-agent voice sessions over WebRTC using LiveKit
- real-time microphone capture and agent playback
- agent speaking state events
- transcript delivery from the active room
- background token refresh for long-running sessions
- optional live metrics event parsing when the backend publishes them

The SDK does not contain provider secrets and does not call STT, LLM, TTS, or database services directly.

## 2. Installation And Prerequisites

### Requirements

- Node.js `20+` recommended for package build/test workflows
- a modern browser with:
  - WebRTC support
  - microphone device access
  - `fetch`
  - `TextDecoder`
- a host backend endpoint that returns a LiveKit session payload

### Package install

Current package name from `uva-agent-system/sdk/package.json`:

```bash
npm install @uva/voice
```

Local tarball workflow:

```bash
cd uva-agent-system/sdk
npm pack
npm install ./uva-voice-0.1.0.tgz
```

## 3. Quickstart And Basic Usage

### 9-line TypeScript quickstart

```ts
import { UrduVoiceAgent } from '@uva/voice';

const agent = new UrduVoiceAgent({
  publishableKey: 'pk_live_example',
  sessionEndpoint: 'https://host.example.com/api/voice/session',
});

await agent.connect({ agentId: 'agent_123' });
agent.on('agent_speaking', (speaking) => console.log({ speaking }));
await agent.disconnect();
```

### What your backend must return

Your `sessionEndpoint` must return JSON in this shape:

```json
{
  "token": "LIVEKIT_JWT",
  "wsUrl": "wss://your-livekit-host",
  "roomName": "generated-room-id",
  "refreshUrl": "https://host.example.com/api/voice/session/refresh",
  "expiresIn": 120
}
```

The browser SDK expects your backend to own all server-side authentication and to relay a ready-to-use session payload.

## 4. API Reference

## `UrduVoiceAgent`

### Constructor

```ts
new UrduVoiceAgent(options)
```

### Supported constructor options in the current package

| Option | Type | Required | Description |
|---|---|---|---|
| `publishableKey` | `string` | Yes | Public identifier sent to your host backend. It is safe to ship in the browser bundle and does not authorize by itself. |
| `sessionEndpoint` | `string` | Yes | Your server endpoint that creates a session and returns the LiveKit token payload. |
| `refreshEndpoint` | `string` | No | Optional override for token refresh. If omitted, the SDK falls back to the response `refreshUrl` or a `/refresh` URL convention. |

### Requested options not present in the current shipped SDK

The current implementation in `uva-agent-system/sdk/src/index.ts` does not expose these constructor fields:

| Requested field | Current status | Current integration pattern |
|---|---|---|
| `clientToken` | Not implemented | Use your own backend auth before calling `sessionEndpoint`. |
| `tenantId` | Not implemented | Tenant routing is handled server-side by your session backend and our control plane. |
| `environment` | Not implemented | Choose dev/staging/prod by pointing to the appropriate `sessionEndpoint`. |
| `autoReconnect` | Not implemented | The SDK performs token refresh, but not a full custom reconnect policy surface. |

### Connect

```ts
await agent.connect({ agentId })
```

Behavior:

1. POSTs to `sessionEndpoint` with:

```json
{
  "publishableKey": "your-public-key",
  "agentId": "agent_123"
}
```

2. Connects to LiveKit using the returned `wsUrl` and `token`
3. Enables the local microphone
4. Starts the background token refresh timer

Errors:

- `quota_exceeded`
- `agent_not_found`
- `session_failed`

### Disconnect

```ts
await agent.disconnect()
```

Behavior:

- clears the token refresh timer
- disconnects the active LiveKit room if connected

### Event subscription

```ts
agent.on(eventName, handler)
```

Supported events in the current package:

| Event | Payload | Description |
|---|---|---|
| `connected` | none | Fired after the LiveKit room connects. |
| `disconnected` | LiveKit reason | Fired when the room disconnects. |
| `ended` | LiveKit reason | Fired together with `disconnected` for session-end handling. |
| `transcript` | `{ text: string; final: boolean }` | Fired for transcription segments received from the room. |
| `speaking` | `boolean` | True when any participant is marked as an active speaker. |
| `agent_speaking` | `boolean` | True when a non-local participant is speaking. |
| `metrics_updated` | `unknown` | Fired when room metadata or a data message contains JSON with `type` equal to `metrics_updated` or `turn_latency`. |
| `error` | `UvaError` | Fired for media device and refresh failures. |

### Requested methods and events not present in the current shipped SDK

The following interfaces were requested for the client manual but are not currently implemented in `uva-agent-system/sdk/src/index.ts`:

| Interface | Current status |
|---|---|
| `muteMicrophone()` | Not implemented |
| `unmuteMicrophone()` | Not implemented |
| `sendTextMessage()` | Not implemented |
| `user_speaking` event | Not implemented |
| `connection_state_changed` event | Not implemented |

If you need them now, implement a thin application wrapper around the underlying session state rather than assuming these methods already exist in the SDK package.

## 5. Connection Lifecycle And Token Renewal

### Session lifecycle from the client perspective

1. Your app creates a `UrduVoiceAgent` instance.
2. Your app calls `connect({ agentId })` from a user-driven action.
3. The SDK requests a session from your backend.
4. Your backend returns a LiveKit session payload.
5. The SDK joins the room and enables microphone capture.
6. The SDK refreshes the token in the background before expiry.
7. Your app calls `disconnect()` when the session should end.

### Auto-renewal behavior

The current SDK schedules token refresh based on `expiresIn`:

- default token lifetime is treated as `120` seconds if your backend omits `expiresIn`
- refresh is attempted roughly `60` seconds before expiry
- if the underlying `livekit-client` room supports `updateToken()`, the new token is applied without dropping the room

### Session continuity expectations

- normal token rotation should not interrupt the call
- if refresh fails, the SDK emits `error` and does not expose a custom retry state machine
- if your product requires richer reconnect UX, add it in your app layer around `connected`, `disconnected`, and `error`

### Session limits

Session limits are enforced server-side. Typical server-side rejection categories exposed to the SDK today are:

- tenant/session quota exhaustion
- unknown or inaccessible agent
- general session creation failure

The browser SDK does not decide quota policy locally.

## 6. Browser And Audio Permissions Handling

### Best practices

1. Trigger `connect()` only from a direct user gesture such as a button click.
2. Explain microphone usage before calling `connect()`.
3. Keep the call control visible until the browser permission prompt is resolved.
4. Handle rejected permission gracefully and offer a retry action.

### Why a click-to-call flow matters

Modern browsers restrict:

- microphone access without user intent
- autoplay of remote audio in some contexts

Calling `connect()` from a button press gives the best chance of satisfying both microphone and autoplay policies in one flow.

### Recommended UI flow

1. User clicks `Start Call`
2. App shows `Requesting microphone access...`
3. App calls `connect({ agentId })`
4. On success, show active call UI
5. On failure, show a retry option and a device/network hint

## 7. Error Codes, Limits, And Troubleshooting

### SDK error taxonomy currently emitted

| SDK code | Meaning | Recommended UI response |
|---|---|---|
| `quota_exceeded` | Server rejected session creation due to quota or concurrency limits. | Show a quota/capacity message and block immediate retry unless your backend advises otherwise. |
| `agent_not_found` | Requested agent is unknown or unavailable to the caller. | Show a configuration error and log the agent identifier used by your app. |
| `session_failed` | Generic session setup or refresh failure. | Show a retry option and inspect browser/device/network state. |

### Recommended UI-level normalization

If your product requires more granular client-facing error labels such as `ERR_MIC_PERMISSION_DENIED`, keep them in your app layer and derive them from the SDK error plus browser context:

| UI code | Derive from | Recommended action |
|---|---|---|
| `ERR_MIC_PERMISSION_DENIED` | `session_failed` during microphone enable or a browser media permission rejection | Ask the user to enable the microphone and retry. |
| `ERR_TOKEN_EXPIRED` | repeated refresh failures followed by disconnect | Restart the session by calling your backend again. |
| `ERR_NETWORK_DISCONNECTED` | browser offline event or LiveKit disconnect after connectivity loss | Show reconnect UI and restart the session when network returns. |

### Operational limits to communicate to end users

Use these as integration guidance rather than hard-coded SDK constants:

- stable broadband or high-quality mobile data is required for real-time voice
- browser microphone permission is mandatory
- long-running sessions depend on successful background token refresh
- if your backend enforces tenant-specific concurrency or minute caps, surface those limits in your own UI and admin tooling

### Troubleshooting checklist

1. `connect()` fails immediately:
   - verify `sessionEndpoint` is reachable from the browser
   - verify your backend returns `token`, `wsUrl`, and `roomName`
2. Browser prompts for microphone and then fails:
   - verify the site is served over HTTPS
   - verify the user granted microphone access
3. Connect succeeds but no audio is heard:
   - verify browser output device selection
   - verify autoplay is not blocked
4. Calls drop around one to two minutes:
   - verify your backend exposes a working refresh endpoint
   - verify the refresh response includes a valid replacement token
5. Metrics never arrive:
   - this is expected unless the backend publishes room metadata or data-channel payloads with `type: "metrics_updated"` or `type: "turn_latency"`

## 8. Host Backend Contract Summary

Your browser app should never mint LiveKit tokens directly. The required pattern is:

1. Browser calls your backend
2. Your backend authenticates the user and decides which agent is allowed
3. Your backend calls the voice platform control plane
4. Your backend returns the session payload to the browser
5. Browser SDK joins LiveKit using that payload

This keeps provider credentials and token-minting authority out of the browser bundle.


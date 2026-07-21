# LiveKit Urdu Voice Agent — Pakistan Telephony Research

---

# M1 · Telecom Regulation & Numbering (Pakistan)

## 1.1 Governing Authority

The **Pakistan Telecommunication Authority (PTA)** is the sole regulator of the country's telecom sector, established under the Pakistan Telecommunication (Re-organization) Act, 1996 (the "PTA Act"). No entity may establish, maintain, or operate any telecommunications system or provide any telecommunications service without a license granted by the PTA. This applies equally to IP-based voice services — VoIP and SIP are not exempt from licensing purely because they run over the internet.

**Key regulatory documents:**
- Pakistan Telecommunication (Re-organization) Act, 1996
- Pakistan Telecommunication Rules, 2000
- Telecom De-regulation Policy, 2003 (introduced LL and LDI license categories)
- IP Whitelisting Regulations, 2019 (gazette notified; updated gazette notification January 2025, titled "IP Whitelisting Regulations, 2024")
- Telecom Consumer Protection Regulations, 2009
- Protection from Spam, Unsolicited, Fraudulent and Obnoxious Communication Regulations, 2009

**PTA contact channels for licensing:**
- Licensing Division: https://www.pta.gov.pk/category/licensing-721279833-2023-05-30
- IP whitelisting portal: https://ipregistration.pta.gov.pk
- Vigilance Directorate email for IP/VoIP queries: ipreport@pta.gov.pk

---

## 1.2 License Categories Relevant to Voice Agents

PTA's licensing regime uses a technology-neutral framework introduced in the 2003 De-regulation Policy. The following license categories are directly relevant to anyone deploying a SIP/VoIP-based voice agent that terminates calls on Pakistani phone numbers.

### 1.2.1 Long Distance and International (LDI) License

The LDI license authorizes the holder to establish, maintain, and operate a public fixed switched network for nationwide long-distance and international telephony. LDI licensees have the right to carry voice traffic across Pakistan and to and from international networks. They may provide IP/VoIP services within the flexibility of their license. Only LDI (and LL) licensees can lawfully carry and switch voice traffic in Pakistan.

**Notable current LDI licensees include:** PTCL, CMPak LDI Ltd. (Zong), and a small number of others. PTA issued three new LDI licenses in FY2024, bringing the total to a limited pool.

For a voice agent system, an LDI licensee is the mandatory upstream provider for any call that traverses the Pakistani PSTN or terminates on Pakistani mobile numbers. You will contract with an LDI operator; you will not become one.

### 1.2.2 Fixed Local Loop (FLL) / Local Loop (LL) License

The LL license (issued as Fixed Local Loop or Wireless Local Loop) authorizes the provision of fixed-line telephone access services within a defined geographic telecom region. LL licensees are the gatekeepers for local call termination — no call can be connected locally without involving an LL licensee.

LL licensees may also provide VoIP services, but only in collaboration with an LDI licensee ("Interconnect Partners"). An LL licensee cannot carry voice independently of an LDI for calls beyond its own service region.

As of April 2025, PTA maintains an updated list of FLL licensees with 312 licenses across Pakistan. The majority are regional operators.

**Current consultation (March 2025):** PTA has issued a Consultation Paper on LL Licensing Regime that proposes allowing some LL licensees to operate as ISP-only (pure broadband) entities without a mandatory voice service obligation. This is still in consultation and has no effect on current operations.

### 1.2.3 Class Value Added Services (CVAS) License

CVAS licenses cover telecom services other than those requiring LL or LDI licenses. There are two major sub-types:

- **Voice CVAS License** — permits voice-related value-added services but does NOT authorize providing basic telephony, interconnecting to the PSTN, or carrying voice traffic independently. A Voice CVAS licensee cannot provide SIP trunk services.
- **Data CVAS License** — permits data and internet services. Crucially, Data CVAS licensees (including ISPs holding EIS/DCNS/NVCNS licenses) are explicitly prohibited from providing VoIP services. A business connecting to the internet through a Data CVAS ISP cannot use that ISP connectivity for VoIP unless the ISP also holds LL or LDI authority and the IPs are whitelisted.

**CVAS Registration** (distinct from a CVAS License) is a lighter-weight PTA registration for value-added and content services. SMS aggregators and similar content providers typically fall here.

### 1.2.4 What This Means for a Voice Agent Operator

A company deploying a LiveKit-based Urdu voice agent in Pakistan does **not** need to obtain its own LDI, LL, or CVAS license, provided it:

1. Contracts with a licensed LDI or LL operator for SIP trunk services.
2. Ensures its server IP addresses carrying SIP/RTP traffic are whitelisted by PTA through that licensed operator (see section 1.4).
3. If operating as or within a call center / BPO context, registers with PSEB (see section 1.5).

Attempting to carry SIP traffic without these arrangements exposes the operator to IP blocking by PTA and potential legal action under the PTA Act.

---

## 1.3 VoIP Legality and the Switching Rule

VoIP itself is legal in Pakistan under the technology-neutral licensing framework. The PTA confirmed this in an official clarification on VoIP scope:

- Pure internal/intra-corporate IP voice communication (no PSTN gateway) does **not** require a license. This is treated as private transmission technology under Section 20(1)(a)/(b) of the PTA Act.
- Any VoIP that connects to or from the PSTN, ISDN, or mobile networks requires routing through licensed LL and LDI Interconnect Partners.

**The key constraint:** Switching within Pakistan is only permitted through LL or LDI licensees. An LDI licensee cannot provide VoIP services in collaboration with a Data CVAS licensee alone — an LL licensee must be in the chain for local call termination.

**Practical effect for a voice agent:** Your SIP trunk provider must hold an LDI or LL license. Connecting your SIP server to a regular internet ISP (Data CVAS) and sending SIP traffic over that connection to terminate calls on Pakistani numbers is illegal without the IP whitelisting mechanism being in place through an LDI/LL sponsor.

---

## 1.4 IP Whitelisting for VoIP

This is the single most operationally critical regulatory requirement for a SIP-based voice agent in Pakistan.

**Background:** PTA blocks VoIP ports at the network level (well-known SIP port 5060 and associated RTP ranges are blocked by default at LDI and LL systems and at PTA's own Web Management System). Any IP address carrying SIP/RTP voice traffic that is not on the PTA whitelist will be blocked without notice.

**How the whitelist works:**
- PTA's Vigilance Directorate maintains the whitelist of IP addresses authorized to carry VoIP traffic.
- Only IP addresses sponsored by a licensed LDI or LL operator are eligible for inclusion.
- A call center or BPO applies through its licensed LDI/LL operator using PTA's prescribed format.
- Applications are submitted via the online portal: **https://ipregistration.pta.gov.pk** (replacing the old email-only process).

**Updated regulations:** The PTA gazetted the "IP Whitelisting Regulations, 2024" in January 2025, replacing the 2019 regulations. The latest version should be obtained directly from the PTA gazette PDF at:
`https://www.pta.gov.pk/assets/media/2025-01-31-Gazzette-Notitfication---IP-Whitelisting-Regulations-2024.pdf`

**Documents required for call center IP whitelisting:**
- CNIC of applicant directors (both sides)
- Certificate of Incorporation / proof of active taxpayer status (NTN)
- PSEB Call Center Registration Certificate (mandatory — see 1.5)
- Fee applicable when five or more IP addresses are being whitelisted (including previously whitelisted IPs)
- Application submitted through and co-signed by the licensed LDI/LL operator

**Renewal:** IP whitelisting for call centers is tied to PSEB certificate renewal. Submit renewal to ipreport@pta.gov.pk 10 days before expiry. Non-renewal within 5 days of PSEB certificate expiry results in automatic removal from the whitelist.

**Processing time:** Historically 15+ days. The online portal was intended to reduce this, but plan for up to 2–3 weeks for new registrations.

**Implication for cloud deployments:** If the voice agent runs on cloud infrastructure (AWS, GCP, Azure), the specific Elastic IPs or public IPs of the instances handling SIP must be whitelisted. IP changes require re-whitelisting. Use static/reserved IPs and plan for this overhead in your infra design.

---

## 1.5 PSEB Registration (Mandatory for Call Centers / BPOs)

The **Pakistan Software Export Board (PSEB)**, under the Ministry of IT & Telecommunication, is the registration authority for call centers and BPOs operating in Pakistan.

**Registration is mandatory** for any inbound or outbound call center. Operating without PSEB registration exposes the business to legal action from PTA and the Federal Investigation Agency (FIA). PSEB registration is also a prerequisite for PTA IP whitelisting (see 1.4).

**Who must register:** Any entity operating an inbound or outbound call center in Pakistan, including AI-driven voice agent deployments that handle calls to/from Pakistani subscribers.

**Registration process:**
1. Create an account on the PSEB Member Portal (TechDestination platform).
2. Select the "Call Center / BPO" registration category.
3. Upload required documents and pay the applicable fee.
4. Receive provisional approval (used for initial IP whitelisting application).
5. Receive full PSEB Registration Certificate after verification.

**Documents required:**
- Company incorporation certificate (SECP)
- Active NTN (taxpayer registration)
- Directors' CNICs
- Business bank statement
- Articles of Association / Memorandum
- For directors/shareholders with foreign nationality: attested passport copy

**Certificate validity:** PSEB call center certificates are renewed every 4 years.

**Key benefit:** PSEB-registered entities are eligible for a reduced IT export income tax rate (as low as 0.25% under the Finance Act 2025 amendments), can open foreign currency accounts, and receive visa recommendation letters for business travel.

---

## 1.6 Pakistan National Numbering Plan

Pakistan's telephone numbers follow E.164 format. The country code is **+92**. All phone numbers are 10 digits in total (including the area code, excluding the country code).

### 1.6.1 Number Format Structure

```
+92 [NDC] [subscriber number]
  └── International format (drop leading 0)
  
0[NDC][subscriber number]
  └── National format (trunk prefix 0)
```

- Large cities: 2-digit NDC + 8-digit subscriber = 10 digits total
- Medium cities: 3-digit NDC + 7-digit subscriber = 10 digits total
- Small towns: 4–5 digit NDC + 5–6 digit subscriber = 10 digits total

### 1.6.2 Geographic Area Codes (NDCs) — Major Cities

| City | Area Code | Format |
|------|-----------|--------|
| Karachi | 021 | 021-XXXXXXXX (8-digit local) |
| Lahore | 042 | 042-XXXXXXXX (8-digit local) |
| Islamabad / Rawalpindi | 051 | 051-XXXXXXXX (8-digit local) |
| Faisalabad | 041 | 041-XXXXXXXX (8-digit local) |
| Peshawar | 091 | 091-XXXXXXX (7-digit local) |
| Quetta | 081 | 081-XXXXXXX (7-digit local) |
| Multan | 061 | 061-XXXXXXX (7-digit local) |
| Hyderabad | 022 | 022-XXXXXXX (7-digit local) |
| Gujranwala | 055 | 055-XXXXXXX (7-digit local) |
| Sialkot | 052 | 052-XXXXXXX (7-digit local) |
| Bahawalpur | 062 | 062-XXXXXXX (7-digit local) |
| Sukkur | 071 | 071-XXXXXXX (7-digit local) |
| Gwadar | 086 | 086-XXXXXXX (7-digit local) |

Note: Karachi and Lahore migrated to 8-digit local subscriber numbers in 2009. Most other cities retain 7-digit local numbers.

### 1.6.3 Mobile Number Codes

All Pakistani mobile numbers are 11 digits in national format: `03XZ-YYYYYYY`

| Operator | Codes |
|----------|-------|
| Jazz (PMCL) | 0300–0309, 0320–0329 |
| Zong (CMPak) | 0310–0319, 0370, 0371 |
| Ufone | 0330–0339 |
| Telenor Pakistan | 0340–0349 |

Mobile numbers are not geographically tied — a Jazz 0300 number can be used anywhere in Pakistan.

### 1.6.4 Non-Geographic and Special Number Ranges

| Type | Format | Notes |
|------|--------|-------|
| Toll-free (free for landline callers within Pakistan) | 0800-XXXXX | 0800 + 6-digit virtual number; mapped to a real PSTN number at the IN platform |
| Premium rate | 0900-XXXXX | 0900 + 6-digit virtual number |
| Universal access / corporate hunting | 111-XXX-XXX | 111 prefix; assigned for UAN (Universal Access Number) services; popular with large enterprises |

UAN (111) numbers are widely used by Pakistani businesses as their primary inbound contact number and are accessible from both landlines and mobiles nationwide.

### 1.6.5 E.164 Formatting for SIP

When configuring SIP trunks and DID routing, Pakistani numbers should be expressed in E.164 without the leading plus, or with it, depending on carrier convention:

```
Karachi landline:    +92 21 XXXXXXXX  → 922-1-XXXXXXXX
Islamabad landline:  +92 51 XXXXXXXX  → 9251-XXXXXXXX
Jazz mobile:         +92 300 XXXXXXX  → 92300XXXXXXX
Toll-free:           +92 800 XXXXXX   → 92800XXXXXX
```

Confirm E.164 formatting convention with your SIP trunk provider, as PTCL and LDI carriers may expect national format (with or without leading 0) at the SIP level.

---

## 1.7 DID Allocation and Provisioning

Direct Inward Dialing (DID) numbers in Pakistan are provisioned by licensed LL or LDI operators. The process depends on whether you are provisioning new numbers or porting existing ones.

### 1.7.1 Provisioning New DIDs

New DID numbers are allocated by LL licensees within their licensed geographic region. The practical steps:

1. Contract with a licensed LL or LDI operator who also provides SIP trunk services (covered in M2).
2. Select the city/area code for the numbers you need (e.g., 021 for Karachi, 051 for Islamabad).
3. The operator allocates a block of numbers from their assigned numbering range, as administered by PTA's National Numbering Plan.
4. Numbers are mapped to your SIP trunk and provisioned in the operator's routing system.

PSEB registration (1.5) and IP whitelisting (1.4) must be in place before traffic can flow.

### 1.7.2 Porting Existing Business Numbers

**Mobile number portability** is well-established in Pakistan. Pakistan was the first country in South Asia to implement MNP (Mobile Number Portability Regulations, 2005). Pakistan MNP Database (Guarantee) Limited (PMD) — owned jointly by the four cellular operators — maintains the Central Number Portability Clearing House.

**Fixed-line portability** is significantly more limited. Porting a PTCL landline number (e.g., an existing 021 or 051 number) to a different carrier or to a VoIP platform is not a standardized process in Pakistan, unlike mobile MNP. Options are:

- **PTCL SIP trunking:** PTCL itself offers SIP-based services that allow an IP-PBX to take ownership of existing PTCL landline numbers without a physical port. The number stays with PTCL; you connect to it via SIP.
- **Carrier agreement:** Some LL licensees can arrange routing of an existing number through a bilateral agreement with the number's current holder, keeping the number superficially the same while routing it through the new carrier's SIP infrastructure.
- **Virtual number / forwarding:** The simplest approach is to keep the legacy PTCL number active and forward it (at the PSTN level) to a new DID on the VoIP system. Introduces a hop and potential quality issues but avoids porting complexity.

**Recommendation:** For businesses with established 021/051 landline numbers, engage PTCL's enterprise/SIP desk directly to assess whether PTCL's own SIP trunk product can be used to bring the existing number into the VoIP system. This avoids a formal port and keeps PTA compliance straightforward.

---

## 1.8 CLI / Caller ID Presentation Rules

### 1.8.1 Inbound CLI

For inbound calls from the PSTN to your voice agent, the originating CLI is delivered in the SIP `From` or `P-Asserted-Identity` header by your LDI/LL carrier. Pakistani carriers pass mobile numbers and landline numbers as they are presented by the originating network. CLI stripping is not standard practice on inbound.

### 1.8.2 Outbound CLI

For outbound calls from your voice agent to Pakistani subscribers, the following rules apply:

- The CLI presented must be a genuine, PTA-allocated number that belongs to you or is authorized for your use by your LDI/LL carrier.
- **CLI spoofing is illegal.** Presenting a false or manipulated caller ID to Pakistani subscribers violates the PTA Act and the Spam/Unsolicited Calls Regulations, 2009.
- The outbound CLI is typically set in your SIP `From` header (or `P-Asserted-Identity` if your carrier supports it). Your carrier will validate that the presented number is within your allocated block or is specifically authorized.
- For a voice agent making outbound calls (e.g., appointment reminders, notifications), use one of your provisioned DID numbers as the CLI. Using a number you do not own or control is a serious regulatory violation.

### 1.8.3 Do Not Call / Anti-Spam

Pakistan's Spam Regulations (2009) require:
- Telecom operators to maintain a "Do Not Call Register."
- Telemarketers to be registered with operators.
- Prohibition on unsolicited calls to numbers on the register.

For an AI voice agent making outbound calls (telemarketing or customer service contexts), the operator is responsible for ensuring compliance. In practice, check with your LDI/LL carrier whether they maintain a DNC register relevant to your outbound calling use case.

---

## 1.9 Data and Call Recording Compliance

### 1.9.1 PECA and Subscriber Data

The Prevention of Electronic Crimes Act, 2016 (PECA) governs electronic communications offences in Pakistan. The Telecom Consumer Protection Regulations, 2009 grant subscribers rights against illegal use of their personal data, including call records.

Pakistan's Personal Data Protection legislation has been under development. The proposed framework includes a National Commission for Personal Data Protection. As of mid-2026, the Bill had not been enacted into law, but its provisions should be monitored.

### 1.9.2 Call Recording

If your voice agent records calls (for quality assurance, training, or transcription):
- Inform callers that the call is being recorded. This is standard practice and expected by regulators.
- Store recordings securely; do not share them with unauthorized parties.
- PTA's 2025 Infrastructure Obligations require licensed operators to implement data localization (store and process critical telecom data within Pakistan) and appoint a CISO. This obligation falls on licensed operators, not on their customers — but if your deployment is structured as a licensed service, this applies to you.

---

## 1.10 Key Open Questions for Legal / Compliance Review

Before proceeding with deployment, the following points should be confirmed with a Pakistani telecom lawyer or directly with PTA:

1. **Entity structure:** Does your operating entity need to be a Pakistan-registered company (Pvt. Ltd.) to enter into an LDI/LL contract and to hold PSEB registration? PTA prefers a local SPV but does not mandate one for customers of LDI/LL licensees. Confirm with your chosen carrier.

2. **IP Whitelisting Regulations, 2024:** Obtain and read the full gazette notification (January 2025). The 2019 regulations had specific prohibitions and categories — confirm what changed.

3. **AI voice agent classification:** Pakistan has no specific regulation classifying AI voice agents. However, PTA's Spam Regulations cover unsolicited automated calls. Confirm whether your outbound use case requires any additional operator-level registration as a telemarketer.

4. **111 UAN numbers:** If the business wants a national-access UAN (111-XXX-XXX) as the primary contact number for the agent, the allocation process goes through PTCL as the UAN platform operator. Confirm availability and lead time.

5. **Data residency:** For an AI pipeline that sends call audio to cloud STT/LLM services (potentially outside Pakistan), assess whether PTA's 2025 data localization obligations apply to your entity or your carrier, and what the scope is.

---

## 1.11 Summary: Regulatory Checklist for M1

| Requirement | Who handles it | Status to confirm |
|---|---|---|
| LDI/LL operator contract | Carrier (M2) | Required before any SIP traffic |
| PSEB Call Center Registration | Your entity | Mandatory; multi-week lead time |
| PTA IP Whitelisting | LDI/LL carrier sponsors your application | Required per server IP; static IPs essential |
| Pakistani Pvt. Ltd. entity | Legal counsel | Preferred by PTA; confirm with carrier |
| DID allocation (new numbers) | Carrier allocates from PTA-licensed pool | Depends on M2 carrier selection |
| Fixed-line number porting | PTCL or bilateral carrier agreement | Case-by-case; no standard process |
| CLI authorization for outbound | Carrier validates against your allocated block | Confirm authorized DID range with carrier |
| Do Not Call compliance | Your operations team + carrier register | Required for any outbound calling |
| Call recording disclosure | Your voice agent prompt design | Add disclosure to agent greeting |
| Data localization assessment | Legal counsel | Confirm scope under 2025 PTA obligations |

---

# M2 · Carrier & SIP Trunk Selection

## 2.1 The Pakistani Carrier Landscape

The Pakistani SIP trunk market splits into two tiers that must be understood separately before choosing a provider.

**Tier 1 — Licensed Pakistani LDI/LL operators** are the only entities legally authorized to carry and switch voice traffic in Pakistan (as established in M1). For a voice agent that will receive calls from or place calls to Pakistani phone numbers, traffic must ultimately traverse one of these operators. They provide the regulatory cover (IP whitelisting sponsorship, PSTN interconnect, number assignment) and the actual PSTN termination.

**Tier 2 — International CPaaS providers** (Twilio, Telnyx, SignalWire, etc.) offer developer-friendly SIP trunking APIs with global reach, but they do not hold Pakistani LDI/LL licenses. They can carry international traffic and provide SIP connectivity for calls *to* Pakistan (via their own international carrier agreements), but they are not a substitute for a Pakistani LDI/LL sponsor when it comes to IP whitelisting compliance or local DID provisioning. They may serve as the programmable SIP layer on top of a local carrier, or as the primary carrier for use cases that are purely international.

The correct architecture for a LiveKit-based Urdu voice agent serving Pakistani callers is typically one of:

- **Local carrier primary** — contract with a Pakistani LDI/LL operator for PSTN connectivity and IP whitelisting; integrate their SIP trunk directly into the bridge layer.
- **International CPaaS with local carrier termination** — use Twilio/Telnyx as the programmable SIP layer for its API convenience; those providers route Pakistani traffic through their own international carrier agreements with Pakistani LDI/LL operators in the background.
- **Hybrid** — international CPaaS for outbound (developer APIs, better programmatic control), local carrier for inbound DIDs and regulatory compliance.

---

## 2.2 Pakistani Licensed Carriers

### 2.2.1 PTCL (Pakistan Telecommunication Company Limited)

**License type:** Both LDI and LL (the original and dominant holder of both)  
**Ownership:** Government of Pakistan (62%), Etisalat / e& (26%)  
**Coverage:** Nationwide; operates ~2,000 telephone exchanges, largest fixed-line network in Pakistan  
**Revenue (2024):** Rs. 107.8 billion (~US$390 million)

PTCL is the default starting point for any SIP trunk in Pakistan. As the incumbent, it:

- Holds the largest number block and can provision DIDs in any city area code
- Operates the UAN (111-xxx-xxx) platform — businesses wanting a national UAN must contract with PTCL
- Offers SIP trunking via its enterprise business unit (PTCL Business Solutions), allowing a centralized IP-PBX to deliver VoIP across branch locations and to access landline and mobile numbers
- Is interconnected with all mobile operators (Jazz, Zong, Ufone, Telenor) and all international gateways
- Can serve as the LDI/LL sponsor for PTA IP whitelisting

**SIP profile:** PTCL's SIP implementation is standard but tends toward conservative configuration. Expect G.711 (A-law / µ-law) as the primary codec; G.729 supported. SIP/UDP is the default; SIP/TCP available on request. TLS/SRTP availability varies by enterprise account and should be confirmed at contract time.

**Pricing model:** PTCL Business Solutions operates on quote-based pricing for enterprise SIP trunks. There are no public per-minute rate cards; pricing is negotiated based on channel count, concurrent call volume, and DID quantity. Expect a formal enterprise sales engagement, not self-serve.

**Onboarding:** Requires a face-to-face or formal written engagement with PTCL Business Solutions. Process includes NDA, technical survey of your IP-PBX or SBC, SLA negotiation, and contract. Lead time is typically 4–8 weeks for enterprise SIP.

**Contact:** ptcl.com.pk/Home/PageDetailBusiness — enterprise sales desk in Islamabad.

**Strengths:** Largest number inventory, regulatory authority (LDI + LL), UAN platform, nationwide coverage.  
**Weaknesses:** Slow enterprise onboarding, conservative SIP stack, limited self-serve options, bureaucratic support.

---

### 2.2.2 Wateen Telecom

**License type:** LDI (renewed for 20 years in November 2025 by PTA)  
**Ownership:** Private; backed by Abu Dhabi Group  
**Infrastructure:** 48,000+ km metro and long-haul fiber network across Pakistan; 200+ co-location sites  
**Revenue:** Not publicly reported; significant enterprise and carrier-grade operator

Wateen is Pakistan's second major LDI operator and has emerged as a serious enterprise voice carrier. Its November 2025 LDI license renewal (20-year term) resolved a longstanding Access Promotion Contribution (APC) dispute with PTA, cementing its long-term operational status.

**Voice product portfolio** (from wateen.com/voice/):
- SIP trunking (PBX interfaces: SIP, PRI, POTS, VoIP-only)
- DID (Direct Inward Dialing) and DOD (Direct Outward Dialing)
- UAN (Universal Access Numbers — 111-xxx-xxx format)
- Toll-free services (0800 numbers)
- International gateway via undersea cables; interconnected with all major Pakistani mobile operators and international carriers
- LDI services: SIP-based international connectivity for enterprise and carrier customers

**SIP profile:** Wateen supports SIP, PRI, and POTS interfaces. G.711 and G.729 codecs. DTMF via RFC 2833 / RFC 4733. Specific TLS/SRTP support should be confirmed at contract time, as Wateen's focus has historically been on carrier-grade TDM + IP hybrid networks rather than consumer-grade encrypted SIP.

**Pricing model:** Quote-based for enterprise accounts. Wateen offers competitive carrier-grade pricing, particularly for high-volume enterprise contracts. Contact via wateen.com/contact-us or UAN: 042-111-365-111.

**Onboarding:** Similar enterprise sales process to PTCL. Wateen's enterprise team is generally more agile than PTCL for new-technology deployments. They have direct experience with call center and BPO voice infrastructure.

**Strengths:** LDI license secured, large fiber footprint, strong carrier interconnect, experience with enterprise BPO/call center clients, competitive for high-volume voice.  
**Weaknesses:** Less dominant in local loop numbers than PTCL; DID inventory may be narrower for some cities.

---

### 2.2.3 Nayatel

**License type:** Fixed Local Loop (FLL) — LL licensee  
**Ownership:** Private; founded 2006 by Wahaj-us-Siraj  
**Coverage:** Islamabad, Rawalpindi, Lahore, Faisalabad, Peshawar, Gujranwala, Multan, Sialkot, Sargodha, Taxila, Attock, Gujrat, and expanding — does not cover all of Pakistan  
**Employees:** 3,000+

Nayatel is the most technically advanced local operator in the markets it serves. It runs Pakistan's first and largest FTTH (fiber-to-the-home) network and provides enterprise-grade SIP trunking through its business division.

**SIP product** (from nayatel.com/business/sip-trunk):
- Flexible VoIP channel-based SIP trunks (choose number of channels and DIDs)
- Interactive cost calculator on the website (channels × DIDs → monthly cost, though exact rates are not publicly displayed and require a quote)
- Supports small/medium enterprises, hospitals, customer service centers, banks, large institutions
- Also offers ISDN PRI, Hosted PBX, and Cloud PBX as companion products

**Technical profile:** Nayatel's fiber-first infrastructure provides lower jitter and latency than copper-based carriers for sites within its coverage area. This is a meaningful advantage for voice AI applications where audio quality directly affects STT accuracy. G.711 and G.722 (HD voice) support is more likely here than with legacy-focused carriers.

**Coverage limitation:** Nayatel is not nationwide. It is an FLL licensee, meaning it operates only in its licensed regions. If your voice agent needs to serve inbound callers across all of Pakistan or needs geographic CLI diversity, Nayatel alone is insufficient — it must be combined with an LDI operator (PTCL or Wateen) for national coverage.

**Pricing model:** Web-based quote calculator; final pricing via sales engagement. Contact: nayatel.com/contact.

**Onboarding:** Faster than PTCL; Nayatel has a reputation for responsive enterprise sales, especially in Islamabad/Rawalpindi.

**Strengths:** Best-in-class fiber quality in covered cities, HD voice support, competitive pricing for business, technically modern SIP stack.  
**Weaknesses:** Geographic limitation (not nationwide), no LDI license (local termination only within its regions), requires an LDI partner for full national coverage.

---

### 2.2.4 Jazz Business (PMCL — Pakistan Mobile Communications Limited)

**License type:** Cellular Mobile; also holds LDI (via CMPak LDI Ltd., a Jazz/Zong joint entity)  
**Ownership:** VEON (100%)  
**Subscribers:** ~73 million (largest mobile operator in Pakistan, 37% market share as of August 2025)

Jazz Business offers enterprise telephony products including:
- UAN (Universal Access Number) service — city-based routing, single number across multiple locations
- Metro Fiber connectivity in Karachi, Lahore, Rawalpindi, and Islamabad
- Best on-net call rates given the largest subscriber base in Pakistan

Jazz does not prominently advertise a direct SIP trunk product in the way PTCL or Nayatel do. Their enterprise voice focus is UAN services and mobile-first enterprise bundles. However, for an Urdu voice agent that will place or receive many calls to/from Jazz mobile numbers (030x, 032x), ensuring your SIP carrier has a strong Jazz interconnect is critical — both PTCL and Wateen claim interconnects with all major mobile operators.

**Contact:** jazz.com.pk/business/enterprise-telephony

---

### 2.2.5 Other Licensed Operators Worth Noting

- **CMPak LDI Ltd.** (a Zong/Jazz entity, holds an LDI license) — primarily a wholesale carrier, not a retail enterprise SIP provider.
- **Cybernet** — FLL licensee; strong enterprise data presence, less prominent for voice SIP trunking.
- **WorldCall Telecom** — FLL licensee; regional operator.
- **SCO (Special Communications Organization)** — serves AJK and Gilgit-Baltistan; relevant only if coverage in those areas is needed.

---

## 2.3 International CPaaS Providers with Pakistani Reach

These providers are not Pakistani LDI/LL licensees but can be relevant to the architecture depending on the use case.

### 2.3.1 Twilio Elastic SIP Trunking

**Pakistani DID availability:** Twilio does not offer voice-enabled local Pakistani phone numbers directly. Their pricing page for Pakistan states: "Although we don't have voice-enabled numbers in this locale, you can use numbers from over 90 other locales to make and receive calls." International numbers are priced at $1.15/month.

**Termination rates to Pakistan (as of July 2026):**
- Pakistan landlines: **$0.1510/min** (outbound from Twilio to Pakistani PSTN)
- Pakistan mobile: **$0.1760/min**
- Inbound (origination): Twilio cannot receive inbound Pakistani numbers since no local Pakistani DIDs are available through Twilio

**Technical features:**
- Elastic SIP trunking: unlimited call concurrency included
- TLS/SRTP: included at no extra cost (SIP over TLS; SRTP for media using AES_CM_128_HMAC_SHA1_80 and AES_CM_128_HMAC_SHA1_32)
- Call recording: $0.0025/min; storage: $0.0005/min/month
- SIP Insights (advanced analytics): $0.0024/min
- Volume/committed-use discounts available at scale
- Edge locations for Pakistan traffic: sg1 (Singapore) is the nearest PoP; also us1, us2, ie, de1

**Fit for this project:** Twilio is suitable as the outbound-only SIP layer for calls placed by the voice agent to Pakistani numbers (appointment reminders, notifications, etc.) where you already have a local Pakistani inbound DID from PTCL/Wateen. Not suitable as the sole carrier for inbound Pakistani calls.

**Documentation:** twilio.com/docs/sip-trunking

---

### 2.3.2 Telnyx

**Pakistani presence:** Telnyx is a licensed carrier that owns its global IP network (not a reseller). It provides SIP trunking at competitive rates and operates its own private backbone.

**Rates:** Telnyx publishes a base rate of $0.005/min for US domestic SIP termination; international rates for Pakistan are higher (comparable to Twilio's range). Confirm current Pakistan rates at telnyx.com/pricing.

**Technical features:**
- SRTP/TLS included by default at no extra charge
- A-level STIR/SHAKEN attestation
- Private global IP backbone (not over the public internet between PoPs)
- Programmable via REST API; strong LiveKit compatibility
- Tiered channel pricing: approximately $12/channel for first 10 channels, dropping to ~$8/channel above 250 channels

**Fit for this project:** Telnyx is a strong alternative to Twilio for the international SIP layer, with better per-minute rates, native TLS/SRTP, and a developer-friendly API that works well with LiveKit. Same caveat as Twilio: no local Pakistani DIDs, so inbound Pakistani calls require a local carrier for the DID, with traffic relayed through Telnyx or directly.

---

### 2.3.3 SignalWire

**Pakistani presence:** SignalWire provides SIP trunking with TLS/SRTP included by default. Per-minute rates are approximately $0.003/min outbound, $0.003/min inbound for US traffic; Pakistani international rates are higher and should be confirmed.

**Fit for this project:** SignalWire is relevant primarily for teams building on the FreeSWITCH/Asterisk stack (SignalWire has deep FreeSWITCH roots, being founded by FreeSWITCH's original developers). If the bridge layer in M4 uses FreeSWITCH, SignalWire's SWML (SignalWire Markup Language) and native FreeSWITCH APIs reduce integration friction. No local Pakistani DIDs.

---

## 2.4 Recommended Provider Architecture

Given the regulatory constraints from M1 and the technical requirements of a LiveKit voice agent, the recommended approach is a **two-tier carrier model**:

```
Pakistani Callers / PSTN
        │
        ▼
[Tier 1: Pakistani LDI/LL Carrier]
  PTCL or Wateen (or both for redundancy)
  - Provides: DID numbers, PSTN termination, IP whitelisting sponsorship
  - SIP trunk → your server IPs
        │
        ▼
[Bridge Layer — M4]
  FreeSWITCH / Asterisk / SBC
  - Normalizes SIP dialect, handles codec transcoding
  - Terminates local carrier SIP; presents clean SIP to LiveKit
        │
        ▼
[LiveKit SIP — M5]
  Inbound dispatch / outbound origination
        │
        ▼
[Urdu Voice Agent — M6]
```

For outbound-only calling (agent-initiated calls), an international CPaaS provider (Twilio or Telnyx) can supplement or replace the local carrier on the outbound leg, with the local carrier remaining as the inbound and IP whitelisting anchor.

---

## 2.5 Codec and Technical SIP Profile Requirements

Pakistani carrier SIP trunks (PTCL, Wateen, Nayatel) typically present the following technical profile:

### Codecs

| Codec | Bit rate | Typical carrier support | Notes |
|-------|----------|------------------------|-------|
| G.711 A-law | 64 kbps | Universal (PTCL, Wateen, Nayatel) | Default for Pakistani PSTN interconnect; use this as your baseline |
| G.711 µ-law | 64 kbps | Supported (less common) | Used for international calls; µ-law is standard in North America |
| G.729 | 8 kbps | Supported by most | Useful for constrained links; requires attention to DTMF (must use RFC 4733) |
| G.722 | 64 kbps (wideband) | Nayatel likely; PTCL/Wateen — confirm | HD voice if available; better for STT |
| Opus | Variable | International CPaaS only | Not available on Pakistani PSTN-side trunks; available between LiveKit and bridge layer |

**For a voice AI agent:** G.711 A-law is the pragmatic baseline for the carrier-facing leg. On the LiveKit-facing leg (between the bridge and LiveKit), Opus can be used for its superior quality and built-in FEC. The bridge layer (FreeSWITCH/Asterisk) performs transcoding between the two.

**Bandwidth planning:** At G.711 A-law, each concurrent call requires approximately 87 kbps including UDP/IP overhead. For 50 concurrent calls: ~4.4 Mbps. Plan for 25–30% headroom on top of expected peak.

### DTMF

- **RFC 4733 (out-of-band DTMF):** Required, especially if G.729 is in path. Confirm support with carrier. G.711 in-band DTMF works but is less reliable across carrier networks.
- Pakistani IVR systems (e.g., bank systems, PTCL's own IVR) use DTMF heavily. The voice agent will need to generate and detect DTMF correctly for any menus it navigates or presents.

### SIP Transport

- **UDP:** Default for most Pakistani carriers. Port 5060.
- **TCP:** Available with most carriers on request.
- **TLS (SIP over TLS, port 5061):** Availability varies. PTCL enterprise accounts may support it; Wateen and Nayatel — confirm at contract time. International CPaaS (Twilio, Telnyx) include TLS by default. Strongly prefer TLS for the carrier-facing leg to protect signaling.

### SIP Headers and Interoperability

Pakistani carriers may exhibit the following non-standard behaviors that require SBC/bridge normalization:

- Incomplete or missing `P-Asserted-Identity` headers on inbound calls — CLI may arrive only in the `From` header
- Non-E.164 number formats in SIP headers (national format with leading 0 rather than +92 prefix)
- `User-Agent` strings that conflict with strict SIP parsers
- Early media (183 Session Progress with SDP) for ringback — the bridge must handle this correctly
- Re-INVITE for hold/resume — confirm with carrier whether supported; some Pakistani carriers do not support mid-call re-INVITEs cleanly

---

## 2.6 Rate Structures and Cost Planning

### Local Pakistani Carrier Pricing (PTCL, Wateen, Nayatel)

Public rate cards do not exist for enterprise SIP trunks. All pricing is negotiated. The typical components are:

| Component | Typical structure |
|-----------|------------------|
| SIP trunk setup fee | One-time; varies by carrier (PKR 10,000–50,000 equivalent range, negotiable) |
| Monthly channel fee | Per concurrent channel or per DID block |
| Inbound call termination | PKR per minute (often bundled or free within channel allocation) |
| Outbound to landlines | PKR per minute; varies by destination region |
| Outbound to mobile | PKR per minute; mobile termination rates are higher than landline |
| DID number rental | Per number per month |
| UAN (111) setup | Higher one-time fee; monthly rental |
| 0800 toll-free setup | Per number; caller is not charged; you pay per inbound minute |

**Negotiation levers:** committed monthly channel count, contract term length (1–3 years), bundled data connectivity (carriers often prefer bundled deals).

### International CPaaS Pricing (Pakistan-specific)

| Provider | Outbound to Pakistan landline | Outbound to Pakistan mobile | Inbound Pakistani DID |
|----------|------------------------------|-----------------------------|-----------------------|
| Twilio | $0.1510/min | $0.1760/min | Not available (no local Pakistani DIDs) |
| Telnyx | Confirm at telnyx.com/pricing | Higher than landline | Not available (no local Pakistani DIDs) |
| SignalWire | Confirm at signalwire.com/pricing | Higher than landline | Not available |

Note: International CPaaS Pakistan outbound rates are significantly higher than what a local Pakistani LDI/LL carrier charges for the same call. Local carriers are strongly preferred for high-volume inbound/outbound traffic to/from Pakistani numbers.

---

## 2.7 Redundancy and Failover Design

A voice agent supporting production Pakistani traffic should not rely on a single SIP trunk provider. Recommended redundancy approaches:

### Primary + Secondary Carrier

- **Primary:** PTCL or Wateen for inbound DIDs and main traffic
- **Secondary:** The other (Wateen or PTCL) as hot standby
- DNS SRV records in your SBC/bridge can point to both carriers with priority and weight values; automatic failover on 5xx SIP responses or TCP timeout

### Dual IP Registration

- Register your SBC/bridge to both carriers simultaneously
- For inbound: configure both carriers to terminate the same DID block (requires number-level routing coordination with both carriers — discuss at contract time)
- For outbound: route via least-cost routing (LCR) between carriers based on destination prefix

### International CPaaS as Outbound Fallback

- If both local carriers fail for outbound, fall back to Twilio/Telnyx at international rates
- Acceptable for low-volume fallback; cost-prohibitive at scale ($0.15+/min vs. negotiated local PKR rates)

### Internet Connectivity Redundancy

- The SBC/bridge server must have redundant internet paths — ISP A and ISP B
- For Pakistani deployments: PTCL fiber + Wateen fiber makes a natural dual-carrier connectivity pair (different physical infrastructure)
- Both ISP paths need separate IP whitelisting with PTA if each IP changes (static IPs mandatory)

---

## 2.8 Contract and Onboarding Process

### Pakistani Carrier Contract Process

The following applies to PTCL Business Solutions, Wateen Enterprise, and Nayatel Business — all follow similar enterprise sales processes:

1. **Initial inquiry:** Contact enterprise sales via website, UAN, or direct email. Provide brief scope (call volumes, channel count, city coverage, use case type).
2. **NDA:** Most carriers require an NDA before sharing pricing or technical documentation.
3. **Technical survey:** Carrier assesses your IP infrastructure — server locations, IP addresses to be whitelisted, SBC/PBX type, expected concurrent channels.
4. **SLA and pricing proposal:** Carrier provides a written proposal including SLA uptime commitment (typically 99.5–99.9% for enterprise accounts; 99.99% available for premium contracts), rate schedule, and contract terms.
5. **Contract execution:** Formal agreement with payment terms. Initial deposits or advance payment (1–3 months) are common.
6. **PTA IP whitelisting:** Carrier sponsors your server IPs through the PTA whitelisting process (requires your PSEB certificate — complete M1 prerequisites first).
7. **Technical provisioning:** Carrier provides SIP proxy address(es), credentials (if digest authentication used, versus IP-based authentication), DID block assignment, and technical spec sheet.
8. **UAT (User Acceptance Testing):** 1–2 week joint testing period. Test inbound call delivery, outbound call completion, DTMF, codec negotiation, hold/resume.
9. **Go-live.**

**Total lead time (end-to-end):** 6–12 weeks from first contact to go-live, assuming PSEB registration is already complete.

### Documents Required from You at Contract Time

- Company registration / incorporation certificate
- NTN (National Tax Number)
- PSEB call center registration certificate (if applicable)
- PTA IP whitelisting application (filed through the carrier)
- Technical sheet: server IP addresses, SBC/PBX type, expected channel count
- Authorized signatory's CNIC

---

## 2.9 Selection Decision Matrix

| Criterion | PTCL | Wateen | Nayatel | Twilio | Telnyx |
|-----------|------|--------|---------|--------|--------|
| Pakistani LDI/LL license | ✅ Both | ✅ LDI | ✅ FLL | ❌ | ❌ |
| PTA IP whitelist sponsor | ✅ | ✅ | ✅ (LL) | ❌ | ❌ |
| Pakistani DID provisioning | ✅ All cities | ✅ Nationwide | ✅ Covered cities only | ❌ | ❌ |
| UAN (111) platform | ✅ Native | ✅ Add-on | ❌ | ❌ | ❌ |
| 0800 toll-free | ✅ | ✅ | ❌ | ❌ | ❌ |
| TLS/SRTP | Confirm | Confirm | Confirm | ✅ Included | ✅ Included |
| Programmable API | ❌ | ❌ | ❌ | ✅ | ✅ |
| Onboarding speed | Slow (6–12 wk) | Medium (4–8 wk) | Medium (4–6 wk) | Fast (self-serve) | Fast (self-serve) |
| High-volume pricing | Negotiable | Competitive | Competitive | High ($0.15+/min) | Better than Twilio |
| Geographic redundancy | High | High | Limited cities | Global PoPs | Global PoPs |
| Support quality | Enterprise SLA | Enterprise SLA | Responsive | Self-serve/support tiers | Self-serve/support tiers |

**Recommended starting path:**
- Primary inbound + DID + PTA whitelist anchor: **Wateen** (modern enterprise team, LDI license recently renewed for 20 years) or **PTCL** (largest number inventory, most established)
- Regional coverage (Islamabad/Rawalpindi area with fiber quality): **Nayatel** as primary for those cities
- Outbound programmable SIP / developer integration layer: **Telnyx** (better pricing than Twilio for international termination, TLS/SRTP native)
- Second carrier for redundancy: whichever of PTCL/Wateen is not the primary

---

## 2.10 Open Questions for Carrier Engagement

When issuing an RFQ or entering carrier discussions, confirm the following:

1. **TLS/SRTP support:** Is SIP over TLS (port 5061) and SRTP media encryption available on your enterprise SIP trunk product? What cipher suites are supported?
2. **Codec list:** Which codecs does your SIP trunk offer? Is G.722 (wideband) available? Is Opus supported (unlikely but ask)?
3. **DTMF:** RFC 4733 out-of-band DTMF — confirmed supported? In-band detection capability for legacy callers?
4. **SIP transport:** UDP default; TCP available? TLS — see above.
5. **Inbound CLI format:** Is the `P-Asserted-Identity` header populated? Is caller number delivered in E.164 (+92...) or national format (0...)?
6. **Re-INVITE support:** Is mid-call re-INVITE supported for hold/resume and call transfer?
7. **Concurrent channel limit:** Hard limit or soft burst capacity?
8. **SLA uptime:** What is the committed uptime? What credits apply for downtime?
9. **Failover/secondary proxy:** Is a secondary SIP proxy IP available for failover? DNS SRV records?
10. **Number porting:** Can an existing PTCL landline number be ported or routed through your SIP trunk?
11. **DID availability:** What city codes can you provision DIDs for? How large a block is available?
12. **PTA whitelisting:** Will you sponsor our server IPs for PTA whitelisting as part of the contract? What is the process and timeline?


---

# M3 · SIP Bridge Layer

## 3.1 The Core Question: Is a Bridge Actually Required?

Before selecting any bridge technology, the right question to ask is whether a bridge is necessary at all. The answer is architectural, not ideological: LiveKit SIP is a standards-conformant SIP B2BUA (Back-to-Back User Agent) that accepts SIP calls directly from any SIP trunking provider whose implementation satisfies a specific, documented set of constraints. The bridge question reduces to whether a given Pakistani carrier can satisfy those constraints — not whether a bridge is generically required.

The conclusion of this research is:

**A bridge is conditionally required, not universally mandatory.** Whether one is needed depends on carrier SIP behavior, codec set, and authentication capability. For Pakistani LDI/LL carriers (PTCL, Wateen), a bridge is very likely necessary in practice. For an international CPaaS layer (Telnyx, Twilio, Sinch) placed in front of the carrier, no bridge is needed. The M2 selection decision drives whether M3 adds a layer.

---

## 3.2 What LiveKit SIP Requires From a Trunk Provider

LiveKit's SIP service imposes the following constraints on any directly connected SIP trunk provider. Each constraint is confirmed in current LiveKit documentation and must be verified against the carrier before deciding the architecture.

### 3.2.1 Early Offer (SDP in INVITE)

LiveKit SIP supports only **early offer** SIP INVITEs — that is, the SDP (codec and media parameters) must be present in the initial INVITE message. LiveKit does not support delayed offer, where the callee returns SDP in a provisional response before the SDP offer is sent.

**Why this matters for Pakistan:** All PSTN carriers send early offer on inbound calls, because the PSTN gateway always includes SDP in the INVITE it forwards. This means inbound calls from PTCL, Wateen, and Nayatel will arrive at LiveKit with early offer — this constraint is satisfied for inbound. The issue arises on the outbound leg: if the outbound SIP INVITE originated by LiveKit is sent as a delayed offer (which is the default behavior of some SIP applications), the carrier gateway may reject it. In practice, LiveKit's outbound trunk does send early offer, so this is not an observed problem. However, if a B2BUA sits in the middle, it must be configured not to convert to delayed offer on re-origination.

### 3.2.2 Supported Audio Codecs

LiveKit SIP natively supports three codecs without any transcoding: **PCMU (G.711 µ-law)**, **PCMA (G.711 A-law)**, and **G.722** (wideband). AMR-WB is also available but disabled by default and must be explicitly enabled.

**Opus is not supported on the SIP-facing leg.** Opus is used internally within LiveKit's WebRTC media plane for communication between participants, but it cannot be negotiated at the SIP trunk interface. If a carrier's SIP trunk offers only Opus (highly unlikely for any Pakistani carrier), the call will fail.

**G.729 is not supported.** LiveKit SIP will not transcode G.729. If a carrier sends G.729 as its only codec offer, the SDP negotiation will fail — LiveKit will either refuse to answer or the call will connect with no audio. Pakistani carriers can include G.729 in their codec list, but as long as G.711 A-law is also offered (which it always is for any PSTN interconnect), LiveKit will negotiate to G.711 A-law and G.729 will be ignored.

**Practical implication:** For Pakistani carriers (PTCL, Wateen, Nayatel), G.711 A-law is always the primary codec and will always be in the SDP offer. LiveKit will select it. There is no transcoding issue as long as G.711 A-law remains offered. A bridge would only be required for G.729 if the carrier were configured to offer G.729 exclusively — an unusual and avoidable configuration.

### 3.2.3 Authentication: IP-Based ACL or Digest

LiveKit SIP inbound trunks support two authentication methods for identifying the sending carrier:

- **IP-based ACL (`allowedAddresses`):** LiveKit accepts calls from specific carrier IP addresses. This is the standard method for Pakistani carriers, who authenticate by source IP (not by SIP digest credentials). The `allowedAddresses` parameter on the LiveKit inbound trunk must be enabled by contacting LiveKit support before it can be used.
- **SIP digest authentication (username/password):** LiveKit supports inbound digest authentication, but not all SIP trunking providers support it. PTCL and Wateen do not advertise digest authentication on their SIP trunks; their inbound delivery is IP-authenticated.

For outbound trunks (LiveKit originating a call to the carrier), both IP authentication and digest authentication are supported. LiveKit's outbound trunk configuration accepts `authUsername` and `authPassword` for digest auth, or can rely on carrier-side IP whitelisting for IP auth.

**Critical note on `allowedAddresses`:** This field must be explicitly enabled for a LiveKit Cloud project by contacting LiveKit support. It is not available by default. If the project does not have this field enabled and the carrier sends calls without a shared secret or digest credentials, the trunk configuration requires leaving `allowedAddresses` unset and instead using the `numbers` array to restrict which phone numbers the trunk accepts calls for. This is a weaker security model and underscores the importance of requesting `allowedAddresses` enablement from LiveKit support before the carrier integration begins.

### 3.2.4 TLS Transport (Optional but Recommended)

LiveKit SIP supports SIP over TLS (port 5061) for signaling and SRTP for media encryption. These are configured on a per-trunk basis. TLS and SRTP must be enabled on both the carrier side and the LiveKit trunk configuration for the encrypted path to work end to end. Pakistani carriers vary in their TLS/SRTP support (PTCL and Wateen — confirm at contract time; Nayatel — confirm; international CPaaS — always available). If the carrier cannot support TLS/SRTP, the LiveKit trunk can be configured for plaintext SIP/RTP, with encryption applied at the network perimeter (VPN, private interconnect) instead.

### 3.2.5 SIP Header Requirements

LiveKit SIP uses the `To` header (destination number) and `From` header (caller number) to match inbound calls to the correct trunk and dispatch rule. It also supports passing custom SIP headers through to LiveKit participant attributes via `headers_to_attributes`.

Pakistani carriers are documented in M2 to exhibit SIP header non-conformances: missing or incomplete `P-Asserted-Identity`, non-E.164 number formats in `From` (e.g., national format with leading 0 rather than +92 prefix), and non-standard `User-Agent` strings. LiveKit's inbound trunk requires that the `To` number match the number registered on the inbound trunk. If the carrier delivers the DID number in national format (e.g., `0519234567`) rather than E.164 (e.g., `+925192345678`), the LiveKit trunk's `numbers` array must be configured to match whichever format the carrier uses in the `To` header — there is no automatic normalization of this in LiveKit. Number format mismatch is the most common cause of calls connecting to the SIP service but not being dispatched to an agent room.

---

## 3.3 Direct Carrier-to-LiveKit Architecture (No Bridge)

In the direct architecture, the Pakistani carrier SIP trunk sends calls directly to LiveKit's SIP URI:

```
Pakistani PSTN
    │
    ▼
[PTCL / Wateen / Nayatel SIP Trunk]
    │  UDP/TCP/TLS — SIP + RTP/SRTP
    ▼
[LiveKit SIP endpoint]
    e.g. vjnxecm0tjk.sip.livekit.cloud
    │
    ▼
[LiveKit Room + Dispatch Rule]
    │
    ▼
[Urdu Voice Agent (Deepgram + LLM + ElevenLabs)]
```

For **international CPaaS providers** (Telnyx, Twilio, Sinch, Plivo, DIDlogic), this architecture is both technically feasible and production-proven. Telnyx publishes a step-by-step LiveKit integration guide. Sinch Elastic SIP Trunking publishes a full LiveKit integration guide. DIDlogic explicitly markets itself as a LiveKit SIP trunk provider. These providers conform to LiveKit's SIP requirements (early offer, G.711, digest or IP auth, TLS/SRTP) and have been tested against LiveKit Cloud in production environments.

For **Pakistani LDI/LL carriers** (PTCL, Wateen, Nayatel), the direct architecture is theoretically possible but has two practical friction points that make it unlikely to work cleanly without a bridge:

**Friction point 1 — Number format normalization.** Pakistani carriers deliver inbound DID numbers in national format (e.g., `05192345678`) in the SIP `To` header rather than E.164. LiveKit trunk matching requires an exact string match. This is a configuration-level workaround (registering the national-format number on the LiveKit trunk rather than E.164) but must be tested and confirmed per carrier.

**Friction point 2 — `allowedAddresses` field enablement.** IP-based ACL authentication via `allowedAddresses` requires LiveKit support to enable it per project. Until it is enabled, inbound calls from a Pakistani carrier that does not support digest authentication will only be matched by destination number. This creates a security gap: any SIP client that knows the DID can send calls to the LiveKit SIP URI and match the trunk. In production, `allowedAddresses` must be enabled and the carrier's SIP proxy IPs must be listed.

A third consideration is **carrier variability:** PTCL and Wateen are enterprise-grade carriers that do not publish SIP conformance documentation. Their SIP behavior is verified only during UAT. The `early media (183 with SDP)` behavior noted in M2 — which LiveKit handles correctly — and re-INVITE support (which LiveKit also handles) are manageable. However, undocumented SIP deviations only surface during active testing, and troubleshooting them directly against LiveKit without a B2BUA intermediary is significantly harder because LiveKit SIP does not expose SIP-level debugging in the same way that FreeSWITCH or Asterisk do.

---

## 3.4 The Case for a Bridge Layer

A bridge layer — a B2BUA (Back-to-Back User Agent) that terminates the carrier SIP leg on one side and presents a normalized SIP leg to LiveKit on the other — is justified when one or more of the following conditions apply:

| Condition | Without bridge | With bridge |
|---|---|---|
| Carrier delivers numbers in national format (0XXX) | Must register national format on LiveKit trunk; breaks if carrier is inconsistent | Bridge normalizes to E.164 before presenting to LiveKit |
| Carrier does not support digest auth; `allowedAddresses` not yet enabled | Security gap: any caller can hit LiveKit SIP URI | Bridge terminates carrier leg; only bridge IP exposed to LiveKit |
| Carrier offers G.729 in SDP and negotiates to it on some calls | Audio fails (LiveKit rejects G.729) | Bridge performs G.711 A-law passthrough or G.729-to-G.711 transcoding |
| Need to inspect and rewrite SIP headers (PAI, CLI, custom headers) | Not available in LiveKit trunk configuration | Standard B2BUA capability |
| Need SIP-level debugging and call event logging during UAT | Limited visibility in LiveKit Cloud logs | Full SIP trace (register, invite, ACK, BYE, media stats) in bridge |
| Multiple carrier trunks with different normalization requirements | Requires separate LiveKit trunk per carrier; complex dispatch logic | Single LiveKit trunk; bridge handles per-carrier normalization upstream |

For the Pakistan deployment specifically, the bridge layer is recommended during the initial integration and UAT phase regardless of long-term architecture, because it provides SIP-level visibility (SIP packet capture, CDR logging, codec negotiation trace) that is invaluable when debugging Pakistani carrier behavior for the first time. The bridge can be removed once the carrier integration is stable, if the conditions above do not apply.

---

## 3.5 Bridge Technology Options

### 3.5.1 FreeSWITCH

FreeSWITCH is a full-featured open source media application server that operates as a B2BUA. It terminates SIP dialogs, processes RTP media, and can re-originate independent SIP dialogs on the other side — making it ideal for codec transcoding, header normalization, and SIP dialect reconciliation.

**Capabilities relevant to this deployment:**
- Terminates the Pakistani carrier SIP trunk (SIP/UDP or SIP/TCP) and re-originates as SIP toward LiveKit
- Per-leg codec negotiation: accepts G.711 A-law from the carrier, re-offers G.711 A-law (or optionally G.722 if the carrier sends it) toward LiveKit
- G.729 transcoding: FreeSWITCH supports G.729 decoding and re-encoding (pass-through requires license-free open source codecs; transcoding to G.711 uses software DSP). G.729 license is not required for pass-through, but is for decoding. For this deployment, the recommended configuration is to force G.711 A-law in the SDP answer to the carrier, avoiding G.729 entirely.
- SIP header manipulation via dialplan: `P-Asserted-Identity`, `From`, `To`, and all SIP headers accessible as channel variables (`sip_h_*`) and can be rewritten or injected on the outbound leg
- E.164 number normalization: dialplan regex can normalize national format (`^0([0-9]+)$` → `+92\1`) before the call is forwarded to LiveKit
- Full SIP trace logging via `sofia tport` and `ngrep` for UAT debugging
- DTMF: RFC 4733 out-of-band DTMF fully supported; in-band detection via mod_spandsp if needed
- TLS/SRTP: available via OpenSSL; can terminate TLS from carrier and re-originate TLS toward LiveKit, or terminate TLS from carrier and forward plain RTP (if carrier doesn't support SRTP)
- Deployment: runs on Linux (Ubuntu 22.04/24.04); Dockerized deployment available; resource requirements are modest for low concurrent call counts (4 vCPUs, 4 GB RAM suitable for up to ~200 concurrent G.711 calls without transcoding)

**Weaknesses:** FreeSWITCH configuration is XML-based and verbose. The learning curve is steep for engineers without prior telephony experience. The project's governance is split between FreeSWITCH (community-maintained) and SignalWire/FusionPBX (commercial), and the main source repository has seen slower upstream updates since the SignalWire fork. For a team without existing FreeSWITCH experience, the time-to-first-call can be 2–4 weeks.

**Best fit for this deployment:** FreeSWITCH is the recommended bridge if the team needs full codec and header control and is prepared to invest in the configuration work. It is the most production-deployed open source B2BUA for carrier-grade voice.

### 3.5.2 Asterisk

Asterisk is the other major open source B2BUA media server, with a longer history and a larger community documentation base than FreeSWITCH for simple deployments.

**Capabilities relevant to this deployment:**
- Terminates SIP trunks via `chan_pjsip` (the modern SIP driver; the legacy `chan_sip` should not be used in new deployments)
- Codec transcoding: G.711 A-law ↔ G.722 supported natively; G.729 requires commercial codec license (Digium/Sangoma) or open source g729 module
- Header manipulation via `PJSIP_HEADER()` function in dialplan
- E.164 normalization via dialplan pattern matching
- DTMF: RFC 4733 supported
- TLS/SRTP: via chan_pjsip with OpenSSL

**Weaknesses:** Asterisk's threading model reaches concurrency limits earlier than FreeSWITCH. At the scale expected for this deployment (tens of concurrent calls, not hundreds), this is not a practical concern. The more significant issue is that Asterisk's SIP tracing and debugging tools are less ergonomic than FreeSWITCH for diagnosing carrier interop issues. The PJSIP configuration model is also less well-documented for B2BUA use cases than FreeSWITCH's profile-based configuration.

**Best fit for this deployment:** Asterisk is a reasonable alternative to FreeSWITCH for teams with existing Asterisk knowledge. For greenfield deployments without a preference, FreeSWITCH's stronger B2BUA model and more granular header control make it the default recommendation.

### 3.5.3 Kamailio / OpenSIPS (Signaling Proxy Only)

Kamailio and OpenSIPS are high-performance SIP signaling proxies, not media servers. They operate at the SIP signaling level and route SIP messages between endpoints; they do not anchor or transcode media.

**What they can do for this deployment:**
- Number format normalization in SIP headers before forwarding to LiveKit (Kamailio `t_relay` with `textops` module; OpenSIPS with scripting)
- SIP-level load balancing across multiple LiveKit SIP endpoints
- IP-based caller filtering at the SIP layer before calls reach LiveKit
- Rate limiting and SIP DoS protection at the network edge

**What they cannot do:**
- Codec transcoding (they pass RTP media through without touching it)
- SIP dialplan logic that requires knowing the media state
- Direct manipulation of RTP codec negotiation in SDP (they can rewrite SDP text but this is fragile for complex codec negotiations)

**For this deployment:** A Kamailio or OpenSIPS front-end is not a bridge substitute; it is a signaling router. It can address the number normalization and security concerns noted in section 3.3 without adding media processing overhead. However, it cannot solve the G.729 problem or provide the codec forcing that makes the LiveKit integration reliable. If the carrier SIP behavior is well-understood and the only concerns are header normalization and IP filtering, a lightweight Kamailio deployment is a valid alternative to full FreeSWITCH. If media control is needed at any point, FreeSWITCH must be added anyway.

### 3.5.4 International CPaaS as the Bridge Substitute

The architecturally cleanest alternative to a self-managed bridge is to use an international CPaaS provider — Telnyx, Twilio, or Sinch — as the SIP intermediary:

```
Pakistani PSTN
    │
    ▼
[PTCL / Wateen SIP Trunk]
    │  SIP/UDP — carrier protocol
    ▼
[Telnyx / Twilio Elastic SIP Trunking]
    │  SIP/TLS + SRTP — normalized, E.164, standards-compliant
    ▼
[LiveKit SIP endpoint]
    │
    ▼
[Urdu Voice Agent]
```

In this architecture, the Pakistani carrier delivers the call to the CPaaS provider using their existing carrier agreement with that CPaaS (Telnyx and Twilio have their own carrier interconnects with Pakistani LDI operators). The CPaaS normalizes the SIP to its own clean, standards-compliant profile and forwards it to LiveKit. From LiveKit's perspective, it is receiving a call from a known, well-documented provider with predictable SIP behavior.

The CPaaS provider in this path charges for Pakistani inbound termination at international rates (see M2 section 2.6 for Twilio/Telnyx rates). For high-volume production traffic this is cost-prohibitive ($0.15+/min vs. negotiated local PKR rates). However, for the development, testing, and initial production phases — before local carrier SIP behavior is fully characterized — this approach eliminates the bridge engineering work entirely.

**This is the recommended path for the initial phase (MVP/POC).** Once call volume justifies local carrier direct integration, the carrier-to-LiveKit path (with or without FreeSWITCH) can be implemented in parallel and traffic migrated.

---

## 3.6 Architecture Decision Matrix

| Scenario | Recommended architecture |
|---|---|
| MVP / initial development (low volume, short timeline) | Telnyx or Twilio → LiveKit SIP direct. No self-managed bridge. Add Pakistani local carrier later. |
| Production with local carrier (PTCL/Wateen), team has SIP experience | FreeSWITCH B2BUA → LiveKit SIP. Bridge handles normalization, debugging, failover logic. |
| Production with local carrier, team has no SIP experience | Telnyx/Twilio intermediate layer → LiveKit SIP. Telnyx fronts the Pakistani carrier. |
| High volume, cost optimization required, SIP team available | PTCL or Wateen → FreeSWITCH → LiveKit SIP. Eliminates CPaaS per-minute premium. |
| Need SIP edge security / multi-carrier load balancing | Kamailio in front of FreeSWITCH, or Kamailio in front of LiveKit SIP if only signaling normalization is needed. |
| G.729 required (e.g., constrained link to carrier) | FreeSWITCH with G.729 module; re-offer G.711 A-law toward LiveKit. |

---

## 3.7 FreeSWITCH Configuration Sketch for Pakistani Carrier Bridge

This section provides the key configuration decisions (not a complete configuration file) that define how FreeSWITCH operates as a B2BUA between a Pakistani SIP trunk and LiveKit SIP.

### SIP Profile Design

Two SIP profiles are required:

- **`external` profile (carrier-facing):** Listens on a public IP, port 5060 (UDP/TCP). Registered against the Pakistani carrier or accepts calls from the carrier's SIP proxy IPs. Does not register with the carrier if the carrier uses IP authentication. Configures G.711 A-law as the forced codec (strips all other codecs from SDP offers/answers to the carrier).
- **`internal` profile (LiveKit-facing):** Originates calls to LiveKit's SIP URI (`sip:{project_id}.sip.livekit.cloud`). Uses SIP over TLS (port 5061) and SRTP if LiveKit secure trunking is enabled. Presents E.164-formatted numbers in `From` and `To` headers.

### Dialplan Logic (Inbound from Carrier)

```
Inbound INVITE received on external profile
    │
    ├─ Extract calling number from From header or P-Asserted-Identity
    ├─ Normalize to E.164: strip leading 0, prepend +92
    ├─ Extract called number from To/Request-URI
    ├─ Normalize to E.164 if national format
    │
    └─ Bridge call to LiveKit:
         sofia/internal/sip:+92XXXXXXXXXX@{project_id}.sip.livekit.cloud
         With:
           - effective_caller_id_number = normalized E.164 calling number
           - absolute_codec_string = PCMA (force G.711 A-law on outbound leg)
```

### Codec Forcing

FreeSWITCH's `absolute_codec_string` channel variable forces the specific codec on the outbound SIP leg to LiveKit, preventing SDP mismatch. Setting this to `PCMA` (G.711 A-law) on the LiveKit-facing leg ensures that the SDP offer presented to LiveKit contains only G.711 A-law. LiveKit will accept this and the call will proceed without any transcoding (the carrier also speaks G.711 A-law, so FreeSWITCH operates in passthrough mode with no transcoding CPU load).

### DTMF Handling

Configure `dtmf-type=rfc2833` on the external profile. FreeSWITCH will pass RFC 4733 DTMF events through to LiveKit transparently. If the carrier delivers in-band DTMF (unlikely but possible), FreeSWITCH can detect and convert it to RFC 4733 using `mod_spandsp`.

### Number Normalization Example

```xml
<!-- Dialplan: normalize incoming Pakistani DID from national to E.164 -->
<condition field="destination_number" expression="^0([0-9]{9,10})$">
    <action application="set" data="destination_number_e164=+92$1"/>
    <action application="bridge" data="sofia/internal/sip:+92$1@{project_id}.sip.livekit.cloud"/>
</condition>
```

---

## 3.8 Deployment Considerations

### Hosting Location

The bridge server must be hosted in a data center with:
- A static public IP (required for PTA IP whitelisting — see M1 section 1.4)
- Low latency to the Pakistani carrier's SIP proxy (Islamabad/Rawalpindi: PTCL's SIP proxy is in Islamabad; Wateen's in Lahore with Islamabad PoP)
- Adequate internet bandwidth for concurrent RTP streams (87 kbps per call at G.711 A-law)

**Recommended hosting:** A Pakistani cloud provider (PTCL Cloud, NayaPay infrastructure, or a Pakistani IXP-connected VM) or an international provider with a Karachi/Islamabad PoP (AWS Bahrain ap-south-1 is the nearest AWS region at ~10ms RTT to Islamabad; GCP Mumbai is similar). Hosting the bridge outside Pakistan adds approximately 30–80ms of one-way delay depending on routing, which is tolerable but adds to the total voice agent latency budget (covered in M4).

### Server Sizing

For a deployment with up to 50 concurrent calls at G.711 A-law without transcoding:
- 2 vCPUs, 4 GB RAM is sufficient for FreeSWITCH in passthrough mode
- Upgrade to 4 vCPUs if transcoding or mod_spandsp DTMF detection is active
- Storage: 20 GB minimum for OS and FreeSWITCH; logs and CDRs grow over time, add 100 GB for 90-day CDR retention

### Security Hardening

- Expose only UDP/5060 and optionally TCP/5061 to the carrier's SIP proxy IPs; block all other SIP traffic at the host firewall
- Expose RTP ports (FreeSWITCH default: UDP 16384–32768) only to the LiveKit media server IPs and the carrier's media relay IPs
- Disable SIP registration for the external profile (use IP-authenticated trunk, not registering gateway)
- Enable Fail2Ban with FreeSWITCH's iptables integration to block SIP scanning attempts
- Run FreeSWITCH as a non-root user with a dedicated service account

### Monitoring

- CDR logging: FreeSWITCH's `mod_cdr_csv` or `mod_odbc_cdr` to a PostgreSQL database; track call completion rate, call duration, codec negotiated
- SIP-level alerting: Homer SIP Capture (HEP protocol) for centralized SIP trace storage and search; essential for post-incident diagnosis of carrier interop issues
- RTP quality: FreeSWITCH exposes MOS score estimates and packet loss/jitter per call via ESL events; hook these into a monitoring dashboard

---

## 3.9 Open Questions for Bridge Configuration

The following must be resolved before bridge configuration can be finalized:

1. **Number format from carrier:** Does PTCL/Wateen deliver the called DID in the `To` header as national format (e.g., `0512345678`) or E.164 (e.g., `+920512345678`)? Confirm during UAT — this drives the normalization dialplan.
2. **Codec SDP from carrier:** Run `ngrep -q -W byline port 5060` during a test call from the carrier to capture the exact SDP offer. Verify G.711 A-law is present. Confirm whether G.729 is also offered and whether the carrier respects a G.711-only SDP answer.
3. **Early media (183 Session Progress):** Does the carrier send 183 with SDP before 200 OK? FreeSWITCH handles this correctly, but LiveKit should also be tested to confirm it handles early media correctly on the inbound leg.
4. **Re-INVITE behavior:** Does the carrier send mid-call re-INVITEs (e.g., for hold)? Does LiveKit correctly handle a re-INVITE forwarded from FreeSWITCH? Test explicitly — hold/resume across the bridge is a known integration point.
5. **`allowedAddresses` enablement:** Contact LiveKit support to enable `allowedAddresses` for the project before beginning carrier integration. This is a prerequisite for IP-based inbound trunk security.
6. **LiveKit SIP IPs:** LiveKit Cloud's SIP service does not publish a static IP list for external firewall whitelisting (confirmed via GitHub issue #3620). For self-hosted LiveKit, the SIP service IP is the deployment's public IP. For LiveKit Cloud: the bridge's firewall should allow outbound RTP to all IP ranges rather than trying to allowlist LiveKit Cloud IPs, as they are not fixed.
7. **TLS feasibility on carrier leg:** If the carrier does not support TLS, the carrier-to-bridge segment operates as unencrypted SIP/RTP. The bridge-to-LiveKit segment can still use TLS/SRTP. Confirm TLS capability with PTCL/Wateen at contract time (see M2 section 2.10, question 1).

---

## 3.10 Summary: M3 Decision and Recommended Path

| Phase | Architecture | Rationale |
|---|---|---|
| MVP / Testing | Telnyx SIP trunk → LiveKit SIP direct | No bridge engineering; documented LiveKit integration; absorbs any Pakistani carrier quirks; acceptable cost at low volume |
| Production (initial) | Telnyx (or Twilio) fronting PTCL/Wateen → LiveKit SIP direct | CPaaS handles carrier normalization; local carrier provides DID and IP whitelisting; no self-managed bridge |
| Production (cost-optimized) | PTCL or Wateen → FreeSWITCH B2BUA → LiveKit SIP | Eliminates CPaaS per-minute cost; bridge provides E.164 normalization, SIP debugging, codec forcing, and long-term extensibility |
| Production (high scale + multi-carrier) | Kamailio edge → FreeSWITCH B2BUA → LiveKit SIP | Kamailio handles SIP load balancing and IP filtering; FreeSWITCH handles media and normalization |

The bridge technology recommendation, when a self-managed bridge is warranted, is **FreeSWITCH** operated as a B2BUA. It is the most production-proven open source B2BUA for carrier-to-platform integration, provides full SIP-level observability, supports all required codec and header manipulation capabilities for Pakistani carrier interop, and has the largest community knowledge base for the specific integration patterns this deployment requires.

---

# M4 · End-to-End Inbound and Outbound Call Flows

## 4.1 Scope

This module combines the complete inbound and outbound call flows for a LiveKit-based Urdu voice agent connected to Pakistani telephony.

Reference architecture:

```text
Pakistani PSTN / Mobile Network
        ↓
PTA-Licensed Carrier
        ↓
SIP Trunk
        ↓
FreeSWITCH / SBC Bridge
        ↓
LiveKit SIP
        ↓
LiveKit Room + Agent
        ↓
Deepgram STT → Groq LLM → Urdu TTS
```

If a carrier is proven compatible with LiveKit SIP, the bridge may be removed.

Track two latency types separately:

- **Call setup latency:** Dial request until ringing or answer.
- **Conversational latency:** Caller stops speaking until agent audio begins.

---

## 4.2 Prerequisites

Before either flow is tested, the following must exist:

### Carrier

- Active Pakistani DID, UAN, toll-free number, or approved outbound CLI.
- SIP trunk from a PTA-licensed carrier.
- Confirmed SIP proxy, source IPs, authentication, codecs, DTMF mode, number format, and channel limit.
- Static bridge IP and required PTA/PSEB approvals.

### Bridge

- Carrier-facing and LiveKit-facing SIP profiles.
- Inbound and outbound dialplans.
- Number normalization.
- CLI validation.
- RTP, NAT, firewall, and ACL configuration.
- SIP traces and call-detail logging.

### LiveKit and agent

- Inbound and outbound SIP trunks.
- Inbound dispatch rule.
- Unique room per call.
- Explicit agent dispatch.
- Deployed agent worker.
- Deepgram Urdu STT.
- Groq LLM.
- Streaming Urdu-capable TTS.
- Interruption, endpointing, timeout, recording, and hang-up behavior.

Every call should store an internal call ID, direction, tenant, source, destination, approved CLI, carrier, bridge Call-ID, LiveKit room, LiveKit SIP call ID, participant ID, status, timestamps, SIP result, and final disposition.

---

## 4.3 Inbound Call Flow

```text
Caller dials Pakistani number
→ PSTN routes to carrier
→ carrier sends SIP INVITE to FreeSWITCH
→ FreeSWITCH validates and normalizes
→ call is forwarded to LiveKit SIP
→ inbound trunk and dispatch rule match
→ unique room is created
→ Urdu agent joins
→ caller speech is transcribed
→ Groq generates the response
→ TTS audio returns to the caller
→ call ends and resources are cleaned up
```

### Stage 1 — PSTN to carrier

The originating mobile or landline network routes the call to the carrier that owns or hosts the number. The carrier maps the number to the configured SIP trunk.

Planning ranges:

| Measurement | Range |
|---|---:|
| Dial request to network progress | 300 ms–2 s |
| Dial request to ringing | 1–4 s |

Common failures:

- Number is not provisioned.
- UAN or toll-free mapping is wrong.
- One mobile network has an interconnect issue.
- Carrier still routes to an old PBX.
- Caller identity is withheld or malformed.

Test inbound calls from all major Pakistani mobile networks, PTCL landline, another city, and an international number if international inbound is required.

### Stage 2 — Carrier to FreeSWITCH

The carrier sends a SIP `INVITE` containing SDP, caller identity, and destination information.

FreeSWITCH must:

1. Accept traffic only from carrier IPs.
2. Validate the destination number.
3. Extract caller identity from trusted headers.
4. Normalize numbers to E.164.
5. Capture the carrier Call-ID.
6. Identify the tenant and agent.
7. Force an approved codec.
8. Forward the call to LiveKit.

Trusted identity order should normally be:

```text
P-Asserted-Identity
→ Remote-Party-ID, if used
→ From
→ anonymous
```

Example normalization:

```text
051XXXXXXX  → +9251XXXXXXX
0300XXXXXXX → +92300XXXXXXX
```

Recommended codec path:

```text
Carrier PCMA → FreeSWITCH PCMA → LiveKit PCMA
```

Avoid transcoding unless the carrier requires it.

Common failures:

- Carrier IP missing from ACL.
- Bridge IP not whitelisted.
- Wrong NAT address in SDP.
- RTP ports blocked.
- Unsupported codec.
- Number-format mismatch.
- TLS or transport mismatch.
- Bridge channel limit reached.

### Stage 3 — FreeSWITCH to LiveKit

FreeSWITCH forwards the normalized call to the LiveKit SIP endpoint.

LiveKit matches the call using the inbound trunk, destination number, authentication or source address, and dispatch rule.

Useful metadata headers:

```text
X-Internal-Call-ID
X-Tenant-ID
X-Agent-ID
X-Carrier
X-Carrier-Call-ID
X-Original-Caller
X-Original-Called
```

Map them to LiveKit participant attributes.

Store LiveKit values such as:

```text
sip.callID
sip.callIDFull
sip.callStatus
sip.phoneNumber
sip.trunkPhoneNumber
sip.trunkID
sip.ruleID
room name
participant identity
```

Common failures:

- No trunk match.
- No dispatch-rule match.
- Incorrect number format.
- Incorrect source IP or authentication.
- Wrong tenant or agent selected.

### Stage 4 — Room and agent startup

Use an individual dispatch rule so every caller receives a unique room.

Recommended naming:

```text
room: in-{tenant}-{internal_call_id}
participant: sip-in-{internal_call_id}
```

Startup sequence:

1. SIP participant joins.
2. Agent job is dispatched.
3. Worker accepts the job.
4. AgentSession starts.
5. Audio attaches.
6. Agent enters listening state.
7. Greeting is played.

Planning ranges:

| Condition | Range |
|---|---:|
| Warm worker | 100–800 ms |
| New provider connections | 300 ms–1.5 s |
| Cold start | 1–5+ s |

Production workers should remain warm.

### Stage 5 — Urdu conversation pipeline

Caller audio flows through:

```text
Caller
→ carrier RTP
→ FreeSWITCH
→ LiveKit
→ Deepgram streaming STT
```

Deepgram must be tested on:

- Urdu
- Roman Urdu
- Urdu-English code-switching
- 8 kHz PSTN audio
- Noisy mobile calls

Initial endpointing ranges:

| Setting | Starting range |
|---|---:|
| Minimum intentional speech | 100–250 ms |
| Early silence threshold | 300–500 ms |
| Typical final turn delay | 500–900 ms |
| Maximum endpoint delay | 1.2–2.0 s |

Once the turn is final:

```text
Deepgram final transcript
→ Groq streaming request
→ first useful phrase
→ streaming Urdu TTS
→ audio returned through LiveKit, bridge, and carrier
```

Planning targets:

| Stage | Range |
|---|---:|
| Groq first token | 80–350 ms |
| Short response generation | 150–700 ms |
| TTS first audio | 100–500 ms |

When the caller interrupts, the agent must stop speech, cancel pending TTS, remove unheard text from effective context, and begin the new caller turn.

### Inbound latency target

Measure:

```text
caller stops speaking
→ first audible agent response
```

| Segment | Range |
|---|---:|
| Caller audio to agent | 60–200 ms |
| End-of-turn detection | 350–900 ms |
| STT finalization | 30–200 ms |
| Groq first useful token | 80–350 ms |
| TTS first audio | 100–500 ms |
| Agent audio to caller | 60–200 ms |
| **Expected total** | **700 ms–2.0 s** |

Recommended targets:

```text
P50 below 1.2 seconds
P95 below 2.0 seconds
```

### Inbound cleanup

When the caller hangs up:

1. Carrier sends BYE.
2. FreeSWITCH ends both SIP legs.
3. LiveKit disconnects the SIP participant.
4. AgentSession closes.
5. Pending provider work is cancelled.
6. Transcript and recording are finalized.
7. Final disposition is stored.
8. Room is deleted or expires.

When the agent ends the call, it must finish the closing audio and then disconnect the SIP participant or delete the room. Ending only the agent session may leave the caller connected to silence.

---

## 4.4 Outbound Call Flow

```text
Backend or scheduler validates call
→ creates call record and room
→ dispatches and prepares agent
→ LiveKit creates SIP participant
→ LiveKit sends INVITE to FreeSWITCH
→ FreeSWITCH validates CLI and destination
→ carrier routes call
→ ringing, answer, busy, no-answer, or failure
→ AMD detects human, voicemail, IVR, or unavailable
→ agent performs the correct action
→ cleanup and final disposition
```

### Stage 1 — Authorization

Before dialing, validate:

- Tenant and agent are active.
- Destination number is valid.
- Calling window is allowed.
- Consent and Do-Not-Call policy are satisfied.
- Approved CLI exists.
- Balance, quota, and concurrency are available.
- Retry policy allows the attempt.

Use an idempotency key:

```text
tenant_id + campaign_id + contact_id + attempt_number
```

This prevents duplicate calls when an API request is retried.

### Stage 2 — Room and agent preparation

Recommended order:

1. Create unique room.
2. Dispatch agent.
3. Wait for readiness.
4. Initialize answering-machine detection.
5. Create SIP participant.

The agent must remain silent while the phone is dialing.

### Stage 3 — LiveKit creates the SIP participant

Conceptual request:

```json
{
  "sip_trunk_id": "ST_xxx",
  "sip_call_to": "+923001234567",
  "room_name": "out-tenant-callid",
  "participant_identity": "sip-out-callid",
  "sip_number": "+9251XXXXXXX",
  "wait_until_answered": true
}
```

The CLI phone number and optional display name are different. A display name does not authorize a phone number.

Use `wait_until_answered=true` when the workflow needs structured busy, rejection, unavailable, and trunk-failure outcomes.

### Stage 4 — FreeSWITCH and CLI enforcement

FreeSWITCH must:

1. Accept INVITEs only from LiveKit.
2. Validate the tenant and call.
3. Normalize the destination.
4. Look up the tenant's approved CLI.
5. Replace unapproved identity headers.
6. Select the correct carrier.
7. Apply rate and destination restrictions.
8. Originate the carrier-facing leg.

Example mapping:

```text
Tenant A → +9251AAAAAAA
Tenant B → +9221BBBBBBBB
```

Reject unknown tenants, unauthorized CLI values, invalid destinations, restricted prefixes, and calls above the channel limit.

The carrier may require the approved number in `From`, `P-Asserted-Identity`, or both. Confirm this during UAT.

### Stage 5 — Call progress

Typical signaling:

```text
100 Trying
180 Ringing or 183 Session Progress
200 OK
```

Outcome mapping:

| Outcome | Typical SIP result | Application result |
|---|---|---|
| Answered | `200 OK` | Active |
| Busy | `486` | Busy |
| Rejected | `603` | Rejected |
| No answer | `408` or `480` | No answer |
| Carrier failure | `5xx` | Trunk failure |
| Invalid number | `404`, `484`, or carrier-specific | Invalid |
| Canceled | `487` after CANCEL | Canceled |
| Voicemail | `200 OK` | Answered; AMD required |

Store the original SIP result in addition to the normalized disposition.

A reasonable starting ringing timeout is 25–35 seconds.

### Stage 6 — Answering machine detection

Voicemail and IVRs also return `200 OK`, so AMD is required after answer.

Possible LiveKit AMD results:

```text
human
machine-ivr
machine-vm
machine-unavailable
uncertain
```

Recommended behavior:

| Result | Action |
|---|---|
| Human | Begin conversation |
| Uncertain | Treat as human with a short confirmation |
| Voicemail | Leave approved message and hang up |
| Mailbox unavailable | Hang up and record outcome |
| IVR | Navigate only when explicitly supported |

Test AMD with Urdu and English voicemail, mixed-language greetings, operator announcements, switched-off messages, mailbox-full messages, and humans answering with “Hello?”, “Jee?”, or “Assalam-o-Alaikum?”

### Stage 7 — Outbound conversation

After a human answer, use the same Deepgram → Groq → TTS pipeline as inbound.

Outbound-specific requirements:

- Identify the business and purpose.
- Verify the intended recipient before revealing sensitive information.
- Handle wrong number.
- Handle call-later requests.
- Apply opt-out immediately.
- Store the campaign outcome.

### Retry policy

| Outcome | Retry? |
|---|---|
| Busy | Yes, limited |
| No answer | Yes, later |
| Explicit decline | Usually not immediately |
| Invalid number | No |
| Trunk failure | Yes, through failover |
| Voicemail left | Usually no immediate retry |
| Mailbox unavailable | Limited |
| Opt-out | Never |
| Wrong number | Never until corrected |

Retries must use capped attempts and spacing.

### Outbound cleanup

When the callee hangs up, BYE propagates through the carrier, bridge, and LiveKit. The agent session closes, pending work is cancelled, and the disposition is stored.

For a pre-answer failure:

- Close the room and agent session.
- Save the SIP result.
- Release concurrency.
- Schedule a retry only if permitted.

A reconciliation worker should detect calls stuck in dialing, active calls without participants, orphaned rooms, and calls that ended at the carrier but were never finalized.

---

## 4.5 Unified State Model

```text
created
→ preparing
→ signaling
→ ringing
→ answered
→ active
→ ending
→ ended
```

Terminal outcomes:

```text
completed
failed
rejected
no_answer
busy
canceled
voicemail_left
voicemail_unavailable
wrong_number
opted_out
transferred
agent_error
trunk_error
network_error
```

LiveKit SIP status is not the same as business success. A connected call may still be voicemail, IVR, wrong number, or unsuccessful.

---

## 4.6 Monitoring

Required timestamps:

```text
call_created_at
agent_ready_at
sip_invite_at
ringing_at
answered_at
stt_final_at
llm_first_token_at
tts_first_audio_at
agent_playout_started_at
hangup_at
cleanup_completed_at
```

Track:

- Call setup time.
- End-of-turn delay.
- STT finalization.
- Groq first-token latency.
- TTS first-audio latency.
- End-of-speech to agent audio.
- Packet loss and jitter.
- One-way audio.
- SIP result codes.
- Codec selected.
- Carrier route.
- Concurrent channels.
- AMD result.
- Final disposition.
- Cost per successful conversation.

---

## 4.7 Acceptance Tests

### Inbound

- Call from all major Pakistani mobile operators.
- Confirm correct tenant and agent.
- Confirm CLI normalization.
- Test withheld CLI.
- Confirm PCMA and two-way audio.
- Test Urdu, Roman Urdu, and code-switching.
- Test interruption.
- Test caller and agent hang-up.
- Test blocked RTP.
- Stop the agent worker.
- Trigger STT, LLM, and TTS failures.
- Confirm correlation IDs in every system.

### Outbound

- Call major mobile networks and multiple landline area codes.
- Confirm approved CLI.
- Reject unauthorized CLI.
- Test busy, decline, no answer, invalid number, and trunk failure.
- Test Urdu/English voicemail and operator announcements.
- Test human, voicemail, IVR, and uncertain AMD results.
- Confirm opt-out suppression.
- Confirm duplicate requests do not create duplicate calls.
- Test carrier failover.
- Confirm ringing and maximum-call timeouts.
- Confirm cleanup for every outcome.

---

## 4.8 Decisions Required Before Implementation

1. Direct carrier-to-LiveKit or FreeSWITCH bridge.
2. Primary and backup carrier.
3. Approved CLI per tenant.
4. Room and participant naming.
5. Agent dispatch model.
6. Deepgram Urdu configuration.
7. Urdu TTS provider.
8. AMD and voicemail policy.
9. IVR behavior.
10. Timeouts.
11. Human-transfer and fallback policy.
12. Recording and disclosure policy.
13. Retry limits.
14. LiveKit and bridge hosting regions.
15. Data retention.

---

## 4.9 Summary

### Inbound

```text
Caller
→ carrier
→ FreeSWITCH
→ LiveKit inbound trunk
→ unique room and agent
→ Deepgram
→ Groq
→ Urdu TTS
→ caller
→ cleanup
```

### Outbound

```text
Backend validation
→ room and agent preparation
→ LiveKit SIP participant
→ FreeSWITCH CLI enforcement
→ carrier
→ AMD
→ conversation or voicemail action
→ cleanup and retry decision
```

A production-ready flow must select the correct tenant and agent, enforce authorized caller identity, maintain two-way audio, measure latency, handle failures, produce a clear disposition, and close every resource after hang-up.

---

# M5 · Security & Compliance

## 5.1 Scope and Responsibility Boundary

Security and compliance apply across the carrier, SIP bridge, LiveKit, AI providers, application backend, and customer dashboard.

The main responsibility split is:

| Party | Primary responsibility |
|---|---|
| Pakistani carrier | Licensed PSTN operation, number authorization, carrier interconnect, PTA obligations, and carrier-side security |
| Voice-agent platform | Secure bridge and LiveKit configuration, authorized calling, data protection, access control, logging, and incident response |
| Business customer | Lawful purpose, customer consent, contact-list quality, recording policy, and authorized staff access |
| Cloud and AI providers | Security of their hosted services under contract |
| Legal/compliance counsel | Final interpretation of Pakistani telecom, privacy, recording, and sector-specific requirements |

The **Critical Telecom Data and Infrastructure Security Regulations 2025 (CTDISR-2025)** apply directly to PTA licensees. A voice-agent company that is not itself a PTA licensee is not automatically treated as the licensee, but the carrier may pass relevant obligations to it through the SIP-trunk and vendor contracts. This must be confirmed before production.

---

## 5.2 Signaling and Media Encryption

A SIP call has two separate security channels:

```text
SIP signaling → protected with TLS
RTP audio     → protected with SRTP
```

TLS without SRTP protects call setup but leaves audio unencrypted. SRTP without TLS protects audio but may expose or permit manipulation of signaling metadata. Both should be enabled wherever both endpoints support them.

### LiveKit secure trunking

LiveKit supports:

- SIP over TLS for signaling.
- SRTP for audio media.
- Media encryption set to `ALLOW` or `REQUIRE`.
- TLS transport on stored or inline outbound trunks.

For production, prefer:

```text
transport: SIP_TRANSPORT_TLS
mediaEncryption: SIP_MEDIA_ENCRYPT_REQUIRE
```

Use `ALLOW` only during compatibility testing or when a carrier cannot guarantee SRTP on every route.

### Bridge security

Each SIP leg must be secured independently:

```text
Carrier ↔ FreeSWITCH
FreeSWITCH ↔ LiveKit
```

A secure LiveKit-facing leg does not automatically secure a plaintext carrier-facing leg.

Recommended order:

1. **Best:** TLS + SRTP on both legs.
2. **Acceptable where carrier SRTP is unavailable:** private carrier circuit or controlled VPN for carrier-to-bridge, then TLS + SRTP from bridge to LiveKit.
3. **Temporary UAT only:** SIP/UDP + RTP restricted by static-IP ACLs.
4. **Not acceptable:** publicly exposed SIP/RTP with no ACL, authentication, or encryption.

For FreeSWITCH:

- Use trusted CA-signed certificates for SIP TLS.
- Enable TLS only on the profiles that require it.
- Set SRTP to mandatory on the LiveKit-facing leg when secure trunking is required.
- Rotate certificates before expiry.
- Disable obsolete protocol versions and weak cipher suites where configurable.
- Test certificate validation from both directions.

### Encryption at rest

Encrypt:

- Call recordings.
- Transcripts.
- Call-detail records containing personal data.
- Backups.
- Provider credentials.
- SIP trunk passwords.
- API keys and webhook secrets.

Keys must be stored in a managed secrets system or KMS, not in source code, logs, frontend variables, or shared documents.

---

## 5.3 Network-Level Access Control

Use a **deny-all, permit-by-exception** network policy.

### Carrier-facing bridge rules

Allow only:

- Carrier SIP signaling IPs on the agreed SIP ports.
- Carrier RTP IP ranges on the configured RTP range.
- Administrative access from approved management IPs or VPN.
- Monitoring traffic from approved internal systems.

Reject all other traffic.

### LiveKit-facing bridge rules

Allow only:

- LiveKit Cloud SIP IP ranges or the configured LiveKit endpoint.
- TLS port used by the LiveKit trunk.
- The minimum RTP/SRTP range required.

LiveKit inbound trunks should also restrict calls using:

- `allowed_addresses`.
- Authentication credentials where supported.
- Specific destination numbers.
- Narrow dispatch rules.

### FreeSWITCH controls

Use separate SIP profiles for the carrier and LiveKit legs. Each profile should have its own:

- Bind address and port.
- ACL.
- Authentication policy.
- Codec list.
- Dialplan context.
- Request-rate limit.

The FreeSWITCH Event Socket must not be exposed publicly. Bind it to localhost or a private management network, protect it with a strong secret, and apply an ACL.

### Firewall and NAT rules

- Use static public IP addresses.
- Open only the required SIP and RTP ports.
- Do not expose database, Redis, admin dashboard, SSH, or metrics ports publicly.
- Restrict SSH to VPN or approved administrative IPs.
- Confirm that advertised SIP and RTP addresses match the actual public IP.
- Log firewall rejects without flooding the logging system.

---

## 5.4 Toll-Fraud Controls

Toll fraud occurs when an attacker uses the SIP system to place unauthorized calls, often to expensive international or premium destinations.

The bridge must never act as an open relay.

### Mandatory controls

#### Destination restrictions

- Allow Pakistani destinations only unless international calling is explicitly approved.
- Block premium-rate and special-service prefixes by default.
- Maintain per-tenant destination policies.
- Reject malformed and unusually long numbers.
- Normalize before applying routing rules.

#### Caller-ID restrictions

- Maintain an allowlist of approved outbound CLI numbers per tenant.
- Replace or reject any caller ID supplied outside that allowlist.
- Never permit customer-controlled arbitrary `From` or `P-Asserted-Identity` values.
- Record which authorized CLI was used for every outbound call.

#### Rate and concurrency limits

Apply limits at both application and bridge levels:

- Maximum simultaneous calls per tenant.
- Maximum new calls per second.
- Maximum calls per destination in a time window.
- Maximum call duration.
- Daily and monthly spend limits.
- Campaign attempt limits.
- Automatic suspension on abnormal spikes.

FreeSWITCH supports global session limits, sessions-per-second limits, SIP-profile request limits, and dialplan-level concurrent or rate limits.

#### Credential controls

- Use different credentials for development and production.
- Use separate trunks or credentials per environment.
- Rotate secrets after employee departure or suspected exposure.
- Never place trunk credentials in browser code.
- Alert on authentication failures and calls from unknown IPs.

#### Fraud detection alerts

Alert on:

- Sudden increase in outbound attempts.
- Calls outside expected business hours.
- New destination countries or prefixes.
- Repeated short-duration calls.
- High failure rates.
- One tenant consuming unusual channel capacity.
- Unauthorized CLI attempts.
- Repeated `401`, `403`, `404`, or `5xx` SIP responses.
- Calls continuing beyond configured maximum duration.

---

## 5.5 Pakistan Data Protection and Localization

### Current legal position

Pakistan's official MoITT legislation page still lists the **Personal Data Protection Bill, May 2023** as a draft rather than an enacted comprehensive federal personal-data law.

This does not mean caller data is unprotected. Relevant obligations can arise from:

- PECA 2016.
- PTA telecom regulations.
- CTDISR-2025 for PTA licensees.
- Carrier contracts.
- Customer contracts.
- Sector-specific rules.
- Constitutional privacy principles.

### CTDISR-2025 localization

CTDISR-2025 requires PTA licensees to keep Critical Information Infrastructure data stored and processed in Pakistan unless PTA gives prior written approval. It also requires protection of personal information, minimum necessary collection, informed consent, encryption, vendor controls, and safeguards when using LLM or AI systems.

For this voice-agent architecture, the unresolved issue is whether sending audio, transcripts, metadata, or CDR-related information to foreign-hosted services such as LiveKit, Deepgram, Groq, or the TTS provider falls within the carrier's regulated CII or approved outsourcing scope.

Before production, obtain written confirmation from:

1. The selected carrier.
2. Pakistani telecom/privacy counsel.
3. PTA, if the carrier or counsel requires formal approval.

### Data-minimization rules

- Send only the audio and context required for the active call.
- Do not send full customer profiles to STT, LLM, or TTS providers.
- Redact CNIC, payment, health, and other sensitive information where possible.
- Do not use production transcripts for model training by default.
- Disable provider data retention or training where contractual controls exist.
- Use tenant-specific retention and deletion policies.
- Separate recordings from security logs.

### Provider contracts

Contracts with LiveKit, STT, LLM, TTS, storage, and monitoring providers should define:

- Processing purpose.
- Data location.
- Retention period.
- Training or secondary-use restrictions.
- Encryption.
- Sub-processors.
- Breach notification.
- Data deletion.
- Audit rights.
- Export and termination procedures.

---

## 5.6 Call Recording and Consent

PECA criminalizes dishonest unauthorized interception of non-public transmissions. However, the primary sources reviewed do not provide a simple general rule stating that every ordinary business call follows either a universal “one-party” or “two-party” consent model.

Therefore, the production system should follow the conservative rule:

> Inform the caller clearly before recording and obtain explicit or clearly documented consent before storing the recording.

Recommended inbound disclosure:

```text
This call may be recorded and processed by an AI assistant for service and quality purposes.
```

Recommended outbound disclosure:

```text
This is an AI-assisted call from [Business]. This call may be recorded for service and quality purposes.
```

### Recording controls

- Make the disclosure before collecting sensitive information.
- Where legally or contractually required, begin persistent recording only after consent.
- Store the disclosure and consent event with timestamp and prompt version.
- Provide a non-recorded or human alternative where required by the business policy.
- Stop recording when payment-card or other highly sensitive information is collected.
- Restrict playback and downloads by role.
- Watermark or log exported recordings.
- Apply a documented deletion schedule.

Healthcare, banking, insurance, debt collection, employment, and other regulated sectors require separate legal review.

---

## 5.7 Outbound Consent, Spam, and Opt-Out

The platform must support the PTA framework concerning spam, unsolicited, fraudulent, and obnoxious communications.

For outbound calling:

- Store the lawful contact basis.
- Apply calling-hour policies.
- Check tenant and campaign suppression lists.
- Limit call frequency.
- Identify the business truthfully.
- Do not spoof caller ID.
- Process “stop calling,” “remove me,” and equivalent Urdu requests immediately.
- Suppress the number across all relevant campaigns.
- Store opt-out evidence and timestamp.
- Do not automatically retry explicit declines or opt-outs.

The business customer remains responsible for providing lawful contact lists, but the platform must technically enforce suppression and attempt limits.

---

## 5.8 Access Control and Administrative Security

Use role-based access control and least privilege.

Suggested roles:

| Role | Access |
|---|---|
| Owner | Organization policy, billing, numbers, and member management |
| Administrator | Agent and telephony configuration |
| Supervisor | Calls, transcripts, recordings, and escalation review |
| Agent/Operator | Assigned calls and limited customer details |
| Auditor | Read-only logs and compliance records |
| Developer/Support | Technical metadata only unless temporary access is approved |

Require:

- MFA for privileged accounts.
- Short-lived sessions.
- Immediate access revocation after role change or departure.
- Approval for temporary support access.
- Separate production and development access.
- Audit logging for all privileged actions.
- Periodic access review.
- Masked phone numbers and personal data in general dashboards.

Support staff should not automatically receive access to recording content merely because software has, once again, confused “can debug” with “should hear everything.”

---

## 5.9 Audit Logging

Security logs must be complete, tamper-resistant, time-synchronized, and access-controlled.

Log at minimum:

### Authentication and access

- Login success and failure.
- MFA events.
- Role and permission changes.
- Privileged access.
- Recording, transcript, and customer-record access.
- Export and deletion actions.

### Telephony configuration

- SIP trunk creation and modification.
- Phone-number assignment.
- CLI allowlist changes.
- ACL and firewall changes.
- Dispatch-rule changes.
- Carrier routing changes.
- TLS certificate changes.
- Secret rotation, without logging secret values.

### Call activity

- Internal call ID.
- Direction.
- Tenant and agent.
- Source and destination numbers in masked form.
- Authorized CLI.
- Carrier and trunk.
- SIP result code.
- Room and participant identifiers.
- Start, answer, transfer, and end timestamps.
- Final disposition.
- Recording and consent status.
- Hang-up party.
- Failover route.

### AI and application activity

- Agent version and prompt version.
- STT, LLM, and TTS providers/models.
- Tool calls and outcomes.
- Human transfers.
- Provider errors.
- Safety or compliance escalations.
- Opt-out actions.

Do not log:

- SIP passwords.
- API keys.
- Full authorization headers.
- Raw payment data.
- Complete sensitive prompts where metadata is sufficient.

### Retention

CTDISR-2025 requires PTA licensees to retain several categories of access and network-security logs for at least one year. The platform should separate:

- Security and audit logs.
- CDRs.
- Transcripts.
- Recordings.
- Debug/SIP packet captures.

Do not automatically apply a one-year retention period to every recording. Define each retention period through legal review, carrier obligations, customer contract, and business need.

---

## 5.10 Incident Response

Maintain a written incident-response plan covering:

- Trunk credential compromise.
- Unauthorized outbound calling.
- Recording or transcript exposure.
- One tenant accessing another tenant's data.
- Provider breach.
- SIP denial-of-service.
- Malicious prompt or tool use.
- Lost administrative credentials.
- Incorrect mass outbound campaign.

The plan must define:

1. Detection.
2. Severity.
3. Containment.
4. Credential rotation.
5. Evidence preservation.
6. Customer/carrier notification.
7. Regulatory escalation.
8. Recovery.
9. Post-incident review.

Under CTDISR-2025, PTA licensees must report Critical and High incidents to PTA within 24 hours and provide a comprehensive report within five working days. If the platform is a carrier vendor rather than the licensee, its contract should require immediate notification to the carrier so the carrier can meet those deadlines.

---

## 5.11 Security Acceptance Tests

Before production:

### Signaling and media

- Confirm TLS on the LiveKit-facing SIP leg.
- Confirm SRTP negotiation.
- Verify calls fail when encryption is set to required but unavailable.
- Confirm expired or invalid certificates are rejected.
- Confirm RTP is not accepted from unknown addresses.

### Network controls

- Send SIP traffic from an unauthorized IP and confirm rejection.
- Confirm Event Socket and admin ports are not publicly reachable.
- Test blocked RTP and one-way-audio alerts.
- Verify firewall and ACL changes are logged.

### Toll fraud

- Attempt an unauthorized international destination.
- Attempt a premium-rate number.
- Attempt an unauthorized CLI.
- Exceed per-tenant concurrency.
- Exceed calls-per-second limits.
- Exceed maximum call duration.
- Confirm automatic suspension and alerting.

### Privacy and audit

- Confirm recording disclosure and consent logging.
- Confirm opt-out suppresses future calls.
- Confirm role restrictions for recordings and transcripts.
- Export and delete a record and verify audit entries.
- Confirm secrets and full sensitive data do not appear in logs.
- Confirm cross-tenant access is impossible.

---

## 5.12 Open Compliance Questions

Obtain written answers before launch:

1. Does the carrier classify any LiveKit, STT, LLM, TTS, transcript, recording, or CDR processing as regulated CII processing?
2. Is PTA approval required for cross-border processing by any selected provider?
3. Which SIP legs support TLS and SRTP?
4. What exact outbound CLI formats are authorized?
5. What recording disclosure and consent model should be used for the target business sector?
6. Which logs must be retained for one year under the carrier agreement?
7. How quickly must the platform notify the carrier of a breach?
8. Are outbound AI calls subject to additional telemarketer registration or campaign approval?
9. What restrictions apply to UAN, toll-free, or shared numbers?
10. Which customer data must remain in Pakistan?

---

## 5.13 Summary

The minimum production security model is:

```text
TLS for SIP signaling
+ SRTP for audio where supported
+ strict IP ACLs
+ authorized CLI enforcement
+ destination, rate, spend, and duration limits
+ encrypted storage
+ minimum-data processing
+ recording disclosure and consent
+ immediate opt-out enforcement
+ role-based access
+ tamper-resistant audit logs
+ tested incident response
```

The largest unresolved compliance question is cross-border processing. Because the voice pipeline may send audio and text through foreign-hosted services, the final provider architecture must be approved against the carrier contract, CTDISR obligations, and Pakistani legal advice before production use.

---

# M6 · Deployment, Testing, and Ongoing Operations

## 6.1 Scope

This module defines where the SIP bridge and agent should run, whether LiveKit Cloud or self-hosted LiveKit is more suitable for Pakistan, how development and production environments should remain aligned, and how the full system should be tested and operated.

Reference production stack:

```text
Pakistani Carrier
        ↓
FreeSWITCH / SBC Bridge
        ↓
LiveKit SIP + LiveKit Room
        ↓
Urdu Voice Agent
        ↓
Deepgram STT + Groq LLM + Urdu TTS
```

The deployment must balance:

- Carrier-to-bridge latency.
- Bridge-to-LiveKit latency.
- Regulatory and carrier requirements.
- Reliability and operational complexity.

The closest server on a map is not always the fastest route. Every candidate location must be tested using real SIP and RTP traffic.

---

## 6.2 Bridge Hosting Options

### Pakistani data center or VPS

```text
Carrier → Pakistani Bridge → LiveKit Cloud
```

**Advantages**

- Lowest expected latency to local carriers.
- Easier carrier IP whitelisting and troubleshooting.
- Can support private carrier links.
- Keeps the carrier-facing SIP leg in Pakistan.

**Risks**

- Local providers vary in uptime, automation, DDoS protection, and support.
- One local facility creates a regional failure point.
- The route from Pakistan to LiveKit still needs testing.

**Best when**

- The carrier requires a Pakistani static IP.
- Local telecom routing or compliance is important.
- The provider offers enterprise uptime, redundant networking, and static IPs.

### Nearby international cloud region

Candidate regions include the UAE, Saudi Arabia, Bahrain, and Mumbai, subject to carrier approval.

**Advantages**

- Mature cloud automation, monitoring, backups, and multi-zone support.
- Fast replacement of failed VMs.
- Better infrastructure-as-code and secret-management options.

**Risks**

- Carrier SIP/RTP may cross international routes.
- Latency and jitter can change by ISP.
- The carrier may reject an overseas termination IP.
- Cross-border processing may require compliance review.

**Best when**

- The carrier accepts the foreign static IP.
- Measured network quality is stable.
- Local hosting cannot meet reliability requirements.

### Customer premises

The bridge runs beside an existing PBX or carrier circuit.

**Advantages**

- Can reuse existing trunks, extensions, and human-transfer workflows.
- May provide the shortest route to an enterprise carrier circuit.

**Risks**

- Depends on office power, internet, and physical access.
- Difficult to scale across many customers.
- Disaster recovery is more complicated.

### Managed SBC or PBX

A telecom or managed-services provider operates the bridge.

**Advantages**

- Less internal SIP expertise required.
- Provider manages patches and basic telephony operations.

**Risks**

- Less control over routing and SIP traces.
- Recurring cost and vendor lock-in.
- Data routing may be unclear.
- Changes may depend on provider support.

Use only when the provider offers an SLA, full call logs, security documentation, and API or configuration access.

---

## 6.3 Recommended Initial Architecture

For the first production release:

```text
PTA-Licensed Carrier
        ↓
Primary FreeSWITCH VM in Pakistan
        ↓
LiveKit Cloud
        ↓
Agent deployment in the closest tested region
```

After the first carrier integration is stable, add a secondary bridge in a different facility and network.

The two bridges should not share:

- One host.
- One power source.
- One ISP.
- One public IP.
- One configuration store that can fail simultaneously.

One bridge is acceptable for a POC. It is a documented single point of failure for paid production.

---

## 6.4 LiveKit Cloud vs Self-Hosted LiveKit

### LiveKit Cloud

LiveKit Cloud provides managed media infrastructure, SIP telephony, scaling, agent deployment, logs, and observability.

**Advantages**

- No need to operate the LiveKit SFU or SIP service.
- Managed agent builds and rolling deployments.
- Built-in session insights.
- External SIP trunks are supported.
- Region pinning is available.
- Recording/egress is managed.

**Limitations**

- Media and metadata may leave Pakistan.
- Region pinning may require an eligible plan and support enablement.
- Less low-level control.
- Ongoing usage cost.

### Self-hosted LiveKit

Self-hosting requires operating:

- LiveKit server.
- LiveKit SIP server.
- Redis.
- Domains and TLS certificates.
- Public SIP and RTP ports.
- TURN where required.
- Agent workers.
- Egress for recording.
- Monitoring, scaling, and upgrades.

**Advantages**

- Full control over region, data path, and configuration.
- Can run inside Pakistan.
- Useful if local processing becomes mandatory.

**Risks**

- Considerably more operational work.
- WebRTC, TURN, UDP, NAT, and multi-node scaling are specialized.
- SIP, egress, and observability become separate services.
- The team owns the availability target.

### Recommendation

Use **LiveKit Cloud with a self-managed Pakistani bridge** initially.

Self-host LiveKit only when:

- Written regulation or a customer requires local media processing.
- LiveKit Cloud fails the measured latency target.
- Scale justifies the cost.
- The team has dedicated realtime-infrastructure expertise.

Self-hosting should solve a confirmed requirement, not serve as an elaborate declaration of independence.

---

## 6.5 Region and Latency Selection

LiveKit Cloud currently supports telephony region groups including India and the Middle East. LiveKit-managed agent deployments currently include an `ap-south` region in Mumbai.

Test:

- Global LiveKit SIP endpoint.
- India telephony region.
- Middle East telephony region.
- Mumbai agent deployment.
- Any self-hosted agent region under consideration.

Measure:

```text
Carrier ↔ bridge
Bridge ↔ LiveKit SIP
LiveKit room ↔ agent worker
Agent worker ↔ Deepgram
Agent worker ↔ Groq
Agent worker ↔ TTS
```

Track:

- Median and P95 RTT.
- Packet loss.
- Jitter.
- Call setup time.
- End-of-speech to first-agent-audio.
- One-way-audio rate.

Region pinning can help with routing and compliance, but it reduces automatic cross-region failover. Enable it only after comparing the compliance benefit with the resilience cost.

Select the topology with the best **complete conversation latency**, not the lowest single ping.

---

## 6.6 Bridge Infrastructure

### Initial sizing

For G.711 passthrough and moderate traffic:

```text
2–4 vCPU
4–8 GB RAM
40+ GB SSD
Static public IP
Reliable UDP networking
```

Actual capacity depends on concurrent calls, transcoding, TLS/SRTP, recording, and SIP tracing. Benchmark before setting a commercial channel limit.

### Required production controls

- Static public IP.
- Separate carrier-facing and LiveKit-facing profiles.
- Restricted SIP and RTP ports.
- NTP time synchronization.
- Central log forwarding.
- Automated configuration backups.
- CPU, memory, disk, network, and gateway monitoring.
- Reproducible provisioning.

### VM vs container

A dedicated VM is simpler for the first FreeSWITCH deployment because RTP requires predictable ports, networking, and NAT behavior.

If containerized:

- Use fixed RTP ranges.
- Use host networking where appropriate.
- Mount versioned configuration.
- Add health checks.
- Pin image versions.
- Avoid infrastructure that regularly changes public IPs.

---

## 6.7 Agent Deployment

Package the agent as an immutable container containing:

- Agent code.
- Locked dependencies.
- Required model plugins.
- Health-check entrypoint.
- Production startup command.
- No embedded secrets.

Inject configuration and secrets at runtime.

### LiveKit Cloud agents

LiveKit Cloud builds from the Dockerfile and supports rolling deployments. New instances serve new sessions while older instances finish active calls.

Use:

- Separate agent deployment per environment.
- Explicit dispatch names.
- Managed secrets.
- Versioned prompt and agent metadata.
- Health checks and rollback.

### Self-hosted agents

LiveKit Agents can run on Kubernetes or another container platform.

Production requirements:

- At least two replicas.
- Warm capacity.
- Graceful termination.
- Active-call draining.
- CPU and memory limits.
- No scale-to-zero.
- Scaling based on active and queued sessions, not CPU alone.

---

## 6.8 Environment Parity

Maintain:

```text
Development
Staging
Production
```

### Keep consistent

- Container structure.
- Configuration schema.
- Codec policy.
- Number normalization.
- Call-state model.
- Dispatch-rule structure.
- Logging fields.
- Database migrations.
- Monitoring definitions.

### Keep separate

- LiveKit projects.
- SIP credentials.
- Carrier trunks.
- Phone numbers.
- API keys.
- Databases.
- Recordings.
- Webhook secrets.
- Production IPs.

### Development

Use local FreeSWITCH, Agent Console, browser audio, internal SIP extensions, test data, and mocked providers where useful.

### Staging

Use a separate public bridge, separate LiveKit project, separate agent deployment, and a test trunk or limited test DID. Staging should match production architecture but have lower limits.

### Production

Require review, automated tests, staging validation, rollback instructions, and a post-deployment call test.

Environment parity means the same architecture and configuration shape, not reusing production secrets because someone has a demo in ten minutes.

---

## 6.9 Testing Without PSTN Minutes

### Agent behavior tests

LiveKit provides testing helpers for Python and Node.js.

Test:

- Urdu greetings.
- Tool selection.
- Booking workflows.
- Escalations.
- Wrong-number handling.
- Opt-out behavior.
- Sensitive-data restrictions.
- Final dispositions.

These tests need no SIP or PSTN call.

### Agent Console

Use LiveKit Agent Console to:

- Speak to the agent from a browser.
- Inspect events and tool calls.
- Review STT, LLM, TTS, and timing metrics.
- Observe active sessions.

This validates the agent and LiveKit room without telecom charges.

### SIP softphones

Register RFC-compliant softphones such as Linphone or MicroSIP to the development bridge.

```text
Softphone → FreeSWITCH → LiveKit → Agent
Agent → LiveKit → FreeSWITCH → Softphone
```

This tests:

- SIP signaling.
- Number normalization.
- Codec negotiation.
- DTMF.
- Ringing and answer.
- Inbound/outbound routing.
- Hang-up propagation.

Because the calls remain inside the test environment, no PSTN minutes are consumed.

### SIPp

SIPp can act as a SIP caller or receiver and supports custom XML scenarios, multiple transports, RTP echo/streaming, PCAP playback, timing statistics, and load generation.

Create scenarios for:

- Successful inbound and outbound calls.
- Busy.
- No answer.
- Rejection.
- Delayed answer.
- Early media.
- DTMF.
- BYE from either side.
- Unsupported codecs.
- Malformed headers.
- High concurrency and call rate.

Run load tests only against staging or an authorized endpoint. Do not load-test a carrier without written permission, unless the goal is to convert the engineering project into a legal department project.

### LiveKit load testing

For self-hosted LiveKit, `lk load-test` simulates publishers and subscribers. It validates media-server capacity, bandwidth, and file-descriptor limits. It does not replace SIPp or carrier UAT.

### Limited PSTN UAT

Real minutes are required only for final checks:

- All major Pakistani mobile operators.
- Landlines in required cities.
- CLI presentation.
- UAN/toll-free behavior.
- Voicemail and operator announcements.
- Human transfer.
- International routes if supported.

Use a controlled number list and budget cap.

---

## 6.10 Monitoring Call Quality

### SIP metrics

- INVITEs per second.
- Active calls.
- Channel utilization.
- Answer rate.
- SIP response-code distribution.
- Call setup time.
- Gateway availability.
- Carrier failover count.

### RTP metrics

- Packet loss.
- Jitter.
- One-way latency.
- RTT.
- RTP timeout.
- Codec.
- One-way-audio incidents.
- DTMF failures.

LiveKit's troubleshooting guidance gives useful boundaries:

| Metric | Healthy | Degraded |
|---|---:|---:|
| Packet loss | Under 1% | Over 3% may cause breakup |
| Mean jitter | Under 5 ms | Over 20 ms may sound choppy |
| One-way latency | Under 150 ms | Over 300 ms encourages talk-over |

### AI metrics

- STT failures and finalization delay.
- End-of-turn delay.
- LLM time to first token.
- Tool-call latency.
- TTS time to first audio.
- End-of-speech to first-agent-audio.
- Interruption rate.
- Provider rate limits and errors.

### MOS

Estimated MOS can be calculated using an E-model based on delay, packet loss, codecs, and related impairments. ITU-T G.107 defines the E-model as a transmission-planning method.

Use MOS to compare carriers and detect trends. Do not use it as the only quality measure. A technically acceptable call can still have poor Urdu recognition, aggressive interruption, or incorrect agent behavior.

---

## 6.11 Alerts and Health Checks

### Critical alerts

- Both carrier routes unavailable.
- Bridge unreachable.
- LiveKit SIP failure.
- No agent workers available.
- One-way audio above threshold.
- Unauthorized outbound calling.
- Sudden cost spike.
- Calls stuck beyond maximum duration.
- Cross-tenant routing error.

### Warning alerts

- Primary carrier failed but backup works.
- Packet loss over 3%.
- Jitter over 20 ms.
- One-way latency over 300 ms.
- Channel use over 80%.
- Increased STT, LLM, or TTS failures.
- Certificate or credential nearing expiry.

Every alert should include environment, carrier, bridge, time window, threshold, current value, example call IDs, and a runbook link.

### Health checks

**Carrier**

- SIP OPTIONS.
- Gateway/registration status.
- Controlled test INVITE.
- RTP media validation.

**LiveKit**

- DNS and TLS.
- SIP response.
- Room creation.
- Participant creation.
- Agent dispatch.

**AI providers**

- Authentication.
- Rate-limit state.
- Connection time.
- First-response latency.
- Error rate.

A connected SIP call with no STT or TTS is not a healthy service.

---

## 6.12 Failover

### Bridge failover

- Carrier routes inbound calls to primary and secondary bridge IPs.
- Outbound application selects a healthy route.
- Call state remains outside the bridge.
- New calls continue if one bridge fails.

Active calls usually do not survive bridge failure. The goal is fast recovery for new calls and correct failure records.

### Carrier failover

Outbound:

```text
Primary failure
→ secondary carrier
→ same authorized CLI where supported
→ idempotent retry
```

Inbound failover requires the carrier to route the DID to another trunk. This must be included in the carrier agreement.

### AI-provider failover

Fallback providers must be preconfigured, tested, contractually approved, and visible in telemetry. Do not improvise a new provider during an outage.

---

## 6.13 Zero-Downtime Deployment and Rotation

### Agent versions

LiveKit Cloud performs rolling deployments:

1. Deploy new version.
2. Verify health.
3. Send new sessions to it.
4. Let old sessions drain.
5. Roll back if errors rise.

### API keys and secrets

Safe rotation:

1. Create new key.
2. Test in staging.
3. Add to production.
4. Roll workers.
5. Confirm new calls use it.
6. Revoke old key after overlap.

LiveKit secret updates trigger a rolling restart for new sessions.

### SIP credentials

Where the carrier supports overlap:

1. Add new credential or trunk.
2. Configure a second FreeSWITCH gateway.
3. Test SIP, RTP, CLI, and DTMF.
4. Move a small share of calls.
5. Shift normal traffic.
6. Drain old calls.
7. Revoke old credentials.

### Carrier migration

```text
Old carrier remains active
→ new carrier added
→ outbound canary calls
→ inbound test DID
→ controlled traffic shift
→ rollback window
→ old carrier retired
```

---

## 6.14 Operational Runbooks

Maintain runbooks for:

- Carrier down.
- Bridge down.
- LiveKit outage.
- STT, LLM, or TTS failure.
- One-way audio.
- High packet loss.
- Calls stuck active.
- Unauthorized calling.
- Recording failure.
- Certificate expiry.
- Credential compromise.
- Failed deployment.

Each runbook should include confirmation steps, immediate containment, failover action, customer impact, logs to collect, escalation contacts, and recovery checks.

---

## 6.15 Release Process

```text
Code review
→ automated agent tests
→ immutable container build
→ staging deployment
→ browser and softphone tests
→ SIPp tests
→ limited PSTN smoke test
→ production rolling deployment
→ post-deployment synthetic call
→ monitor dashboards
```

Changes to codecs, SIP headers, normalization, CLI, firewall rules, or carrier routing require telephony-specific review.

---

## 6.16 Acceptance Criteria

Deployment and operations are ready when:

- Hosting and redundancy decisions are documented.
- Bridge IPs are static.
- Infrastructure is reproducible.
- Region selection is based on measured calls.
- Environments are separated.
- Agent and bridge deployments can roll back.
- Softphone and SIPp scenarios cover major SIP outcomes.
- PSTN UAT succeeds across major Pakistani networks.
- Packet loss, jitter, latency, SIP errors, and AI latency are monitored.
- Critical alerts and runbooks exist.
- Failover is tested.
- Secrets and carrier credentials can rotate without dropping active calls.
- Orphaned calls and rooms are reconciled automatically.

---

## 6.17 Summary

Recommended starting point:

```text
Pakistani carrier
→ Pakistani FreeSWITCH bridge
→ LiveKit Cloud
→ containerized Urdu agent
→ external STT, LLM, and TTS providers
```

Recommended test order:

```text
Automated behavior tests
→ Agent Console
→ internal softphones
→ SIPp scenarios
→ LiveKit load test
→ limited PSTN UAT
```

Use LiveKit Cloud initially unless regulation or measured latency proves that LiveKit must be self-hosted. Operate the bridge with static IPs, monitoring, failover, rolling changes, and written runbooks.

---


*Sources: LiveKit SIP Documentation — SIP Trunk Setup, Inbound Trunk, Codec Negotiation & Support, Secure Trunking (docs.livekit.io/telephony, July 2026); LiveKit SIP GitHub repository README (github.com/livekit/sip); LiveKit GitHub Issue #3620 — SIP and RTP IP ranges for firewall whitelisting; Telnyx LiveKit Integration Guide (developers.telnyx.com/docs/livekit/telephony); Sinch Elastic SIP Trunking LiveKit Integration Guide (developers.sinch.com/docs/est/integration-guides/livekit); DIDlogic LiveKit SIP Trunk product page (didlogic.com/ai-voice/livekit); Telxi LiveKit Integration Guide (telxi.com/livekit-integration); TelcoBridges — Kamailio vs OpenSIPS vs FreeSWITCH (telcobridges.com/learning/sip-trunking/kamailio-vs-opensips-vs-freeswitch); TelcoBridges — SIP Trunking Guide (telcobridges.com/learning/sip-trunking); TelcoBridges — Open Source SBC Options (telcobridges.com/sbc/compare/open-source-sbc-options); TelcoBridges — SBC TLS and SRTP Configuration Guide (telcobridges.com/learning/voip-security/sbc-tls-srtp-configuration-guide); FreeSWITCH Documentation — sip_cid_type, P-Asserted-Identity channel variable (developer.signalwire.com/freeswitch); Open Source SIP Servers Compared 2026 (ictinnovations.com); Building Reliable SIP Bridge Connections for AI Agents (rtcleague.com/blogs/sip-bridge); 46Labs — Early Offer versus Delayed Offer SIP INVITEs (support.46labs.com); LiveKit FlyNumber SIP Forwarding Guide (flynumber.com/docs).*

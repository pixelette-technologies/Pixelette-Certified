import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  author: string;
  authorRole: string;
  content: string[];
  relatedSlugs: string[];
}

const blogPostsData: Record<string, BlogPostData> = {
  "iso-27001-security-questionnaire": {
    slug: "iso-27001-security-questionnaire",
    title: "We Just Got Asked for ISO 27001 in a Security Questionnaire. What Now?",
    description:
      "Your buyer just sent a security questionnaire asking for ISO 27001. You don't have it. This guide shows exactly what to do next and how to stay in the deal.",
    date: "2026-04-07",
    category: "ISO 27001",
    readingTime: "7 min read",
    author: "Muhammad Waleed",
    authorRole: "Lead Consultant, Pixelette Certified",
    content: [
      "If you are reading this, the email has already arrived. A buyer, whether a bank, an insurer, an NHS trust, or a global SaaS company, has sent you a vendor security questionnaire. Within the first few questions, there is one line that matters: \"Do you hold ISO/IEC 27001 certification?\" You do not. The deal is real, the procurement team is waiting, and every consultant you have spoken to today has told you it takes six to nine months. This is where most companies lose the deal. This guide shows you exactly what to do next, and how to stay in the deal without ISO 27001 today.",
      "First, do not lie on the questionnaire. This is the most common and most damaging mistake. Founders write phrases like \"ISO 27001 in progress\" or \"aligned with ISO 27001 principles.\" Procurement teams see this every day and it raises immediate red flags. It triggers follow-up questions you cannot answer, it becomes a contractual risk if inaccurate, and it can be verified externally through the IAF CertSearch database. The correct response is precise and credible: \"We have appointed an ISO 27001 implementation partner and our certification project has commenced. Stage 2 audit is scheduled within the next 10 weeks. Supporting documentation (risk register and Statement of Applicability) can be provided under NDA.\" This keeps you in the deal.",
      "Contrary to popular belief, buyers do not need the certificate immediately. They need confidence that it is coming. What procurement teams actually want is a named implementation partner, a defined project timeline, and a realistic audit date. If your timeline is within 90 days, most buyers will proceed. Beyond that, risk increases and the deal starts to slip.",
      "The 72-hour action plan is where deals are won or lost. On Day 1, acknowledge and control the timeline by replying within 24 hours confirming you are initiating ISO 27001 certification and that a partner will be appointed immediately. On Day 2, get a real gap analysis: book a call that produces a written gap report, a fixed cost, and a target audit date. Avoid generic consultancy conversations. On Day 3, commit and start: sign the engagement, lock the project start date, and secure the audit window. Until this is done, you do not have a credible answer for the buyer.",
      "The \"six to nine months\" timeline that most consultancies quote reflects slow consultancy models with weekly check-ins and delayed audit booking. It is not a requirement of ISO 27001. A structured model delivers certification in 8 to 10 weeks for most technology companies. The difference is execution: pre-built frameworks, parallel workflows, and early audit booking rather than sequential waterfall delivery.",
      "Let us be direct about what this decision is really about. You are not deciding whether to spend ten to twenty thousand pounds. You are deciding whether to lose one hundred thousand to one million pounds or more in contracts. ISO 27001 is not compliance. It is a revenue unlock mechanism. If you have a live deal, a questionnaire on your desk, and procurement pressure, there is only one decision: start now or lose the deal.",
    ],
    relatedSlugs: [
      "iso-27001-10-weeks-vs-6-months",
      "real-cost-not-being-iso-27001-certified",
      "enterprise-security-questionnaire-without-iso-27001",
    ],
  },
  "iso-27001-10-weeks-vs-6-months": {
    slug: "iso-27001-10-weeks-vs-6-months",
    title: "ISO 27001 in 10 Weeks vs 6 Months: What Actually Changes?",
    description:
      "The 10-week timeline is not a marketing gimmick. This guide explains what a structured fast-track compresses, what it does not, and how to tell a real fast-track from corner-cutting.",
    date: "2026-04-06",
    category: "ISO 27001",
    readingTime: "7 min read",
    author: "Muhammad Waleed",
    authorRole: "Lead Consultant, Pixelette Certified",
    content: [
      "\"Anyone who tells you ISO 27001 takes ten weeks is cutting corners.\" We have heard this from competitors, from auditors at other firms, and occasionally from prospects who have already been told it by someone else. It is a useful objection to address head-on, because the answer reveals the difference between two genuinely different delivery models. And the difference is not what most founders assume. This guide explains exactly what the 10-week model compresses, what it does not compress, and how to tell the difference between a fast-track that works and a fast-track that gets you a certificate the buyer rejects.",
      "The standard does not specify a timeline. ISO/IEC 27001:2022 specifies that an organisation must have a documented Information Security Management System covering the 93 Annex A controls (where applicable, justified through a Statement of Applicability), a risk assessment and treatment plan, an internal audit, a management review, and demonstrable evidence that controls are operating. None of those requirements has a calendar attached. The six-month timeline is a delivery convention, not a standards requirement. It exists because traditional consultancies run fortnightly workshops, write documentation from scratch for each client, and book audits late in the project.",
      "Three things are compressed in a properly structured fast-track engagement. First, documentation cycle time: a traditional engagement writes 32-plus ISMS policies from a blank page over 8 to 12 weeks of fortnightly drafts, while a fast-track engagement starts with a pre-built, audit-tested policy suite covering all 93 Annex A controls, then tailors each document to your environment, scope, and risk profile in concentrated 1 to 2 week blocks. The output is the same: fully customised, audit-ready documentation. The cycle time is 70% shorter. Second, workshop scheduling: traditional projects schedule one or two hours of consultant time per week, while a fast-track engagement runs concentrated working sessions, typically half-day blocks, that move three or four workstreams forward in parallel. Third, audit body lead time: UKAS-accredited certification bodies are routinely booked 8 to 12 weeks ahead, and a fast-track engagement books the audit slots at project kickoff so the audit calendar runs in parallel with the implementation.",
      "What the 10-week model does not compress is the part that matters for buyers asking the awkward questions. The audit itself, conducted by an independent UKAS-accredited certification body, takes the same number of auditor-days regardless of how the project was run. There is no shortcut. The control evidence period also remains: auditors expect to see controls operating, not just documented. A 10-week project provides 4 to 6 weeks of operating evidence by the time of Stage 2, which is sufficient for first certification under ISO/IEC 27006 guidance. The risk assessment on a 10-week project contains the same 150-plus entries, the same control mapping, and the same treatment decisions as a six-month project.",
      "There are five questions to ask any consultant promising a fast timeline to tell a real fast-track from a corner-cutting one. Which UKAS-accredited certification body will conduct the Stage 1 and Stage 2 audit, and have you booked the slots? Will the team write a tailored Statement of Applicability against all 93 Annex A controls, or will you receive a generic SoA? How many clients passed Stage 2 on first attempt in the last twelve months? Who is the named lead auditor on the engagement and what are their credentials? What happens if you fail Stage 2? If a fast-track provider can answer all five clearly, the timeline is real. If they hedge on any of them, you are not buying speed. You are buying risk.",
      "Two reasons explain why six-month projects are still common, neither of which serves the client. First, hourly billing: a consultancy that bills 150 to 200 pounds per hour against an open-ended scope earns more from a 30-week project than a 10-week project. Fixed-fee structures align the consultant's incentive with the client's. Second, internal capacity constraints: traditional consultancies allocate consultants across many concurrent projects at a few hours per week each, and a 10-week project requires concentrated capacity that stretches their calendar.",
      "ISO 27001 in ten weeks is not a marketing gimmick. It is what happens when documentation is pre-built rather than written from scratch, workshops run in concentrated blocks rather than fortnightly drips, and audits are booked at kickoff rather than at the end. The standard is the same. The certificate is the same. The buyer's procurement team cannot tell the difference, and that is the point. What changes is the date the deal closes.",
    ],
    relatedSlugs: [
      "iso-27001-security-questionnaire",
      "real-cost-not-being-iso-27001-certified",
      "enterprise-security-questionnaire-without-iso-27001",
    ],
  },
  "real-cost-not-being-iso-27001-certified": {
    slug: "real-cost-not-being-iso-27001-certified",
    title: "The Real Cost of NOT Being ISO 27001 Certified",
    description:
      "Every founder asks how much ISO 27001 costs. The right question is how much it costs not to have it. This guide puts a number on the second question.",
    date: "2026-04-05",
    category: "ISO 27001",
    readingTime: "7 min read",
    author: "Muhammad Waleed",
    authorRole: "Lead Consultant, Pixelette Certified",
    content: [
      "Every founder asks the same question on the first call: \"How much does ISO 27001 cost?\" It is the wrong question. The right question is the one buyers force you to answer six months later, after the certified competitor has won the contract: \"How much did it cost not to have it?\" This guide puts a number on the second question. The numbers are uncomfortable.",
      "Let us put the visible cost on the table first, because hesitation usually starts here. For a UK technology business between 10 and 150 employees, the all-in cost of ISO 27001:2022 certification typically falls in this range: implementation at 8,500 to 22,000 pounds (sub-50 employees through to regulated 150-plus environments), UKAS-accredited audit body fees at 3,000 to 8,000 pounds for Stage 1 and Stage 2 combined, internal time of approximately 40 to 80 hours of founder, CTO, or DPO time across a 10-week engagement, and ongoing maintenance with surveillance audits in years 1 and 2 at 2,000 to 4,000 pounds each. Total first-year outlay: 14,000 to 35,000 pounds depending on scope and company size. Annualised across the three-year certification cycle, the figure drops to roughly 8,000 to 15,000 pounds per year.",
      "The invisible cost is what you pay for not having the certificate, and it has four components. The first is lost deals. Enterprise procurement teams at banks, insurers, healthcare networks, government departments, and global SaaS companies routinely require ISO 27001 as a gating criterion. \"Required\" does not mean \"preferred.\" It means the questionnaire is rejected automatically if the box is not ticked. If your average enterprise contract is 150,000 pounds in year-one ARR and you lose three of them in twelve months because you cannot tick the box, the cost of not being certified is 450,000 pounds. The 15,000 pounds you saved on consultancy is now a 30x negative return on the wrong decision.",
      "The second invisible cost is extended sales cycles on the deals you do win. Even for buyers who do not require ISO 27001 outright, the absence of certification triggers an extended security review. Instead of a 14-day procurement cycle, you face a 90-day evidence gathering exercise covering vendor questionnaires, follow-up calls, security architecture documents, penetration test reports, data flow diagrams, business continuity plans, and sub-processor lists. The deal still closes. It just closes three months later. For a Series A or B company burning 150,000 to 400,000 pounds per month, every 30 days of delayed revenue is a meaningful balance sheet event.",
      "The third component is investor due diligence friction. Series B and later rounds increasingly include data governance and security as a diligence workstream. The absence of ISO 27001 creates a finding in the diligence report that founders must then explain in the investment committee. \"Not certified\" becomes a conditions-precedent line in the term sheet: \"The company shall achieve ISO 27001 certification within nine months of completion.\" Founders who certify ahead of the round close on cleaner terms. The fourth component is cyber insurance premiums: certified companies typically secure premiums 15% to 30% lower than uncertified peers, and avoid the carve-outs on ransomware, business interruption, and regulatory defence cover.",
      "Take a UK technology business with 4 million pounds in ARR, 60 employees, and an enterprise sales motion. The conservative twelve-month cost of not being certified: two enterprise deals lost outright at 300,000 pounds ARR forgone, four deals delayed by 60 days each at 100,000 pounds in deferred revenue plus runway impact, cyber insurance premium uplift at 6,000 pounds per year, and diligence friction on the next funding round commonly at 30,000 to 100,000 pounds in legal and remediation cost. Conservative total: 436,000 pounds or more. Twelve-month cost of being certified: 14,000 to 22,000 pounds. The decision is not financial. It is psychological.",
      "To be even-handed: ISO 27001 is not the right call for every business. If you sell exclusively to consumers or small businesses with no procurement gates, if your runway is under three months and you need to focus capital on revenue not compliance, or if you are pre-product-market-fit and your priority is finding ten customers rather than passing audits, defer the certification and revisit it when enterprise revenue becomes the growth lever. The honest answer is sometimes \"not yet.\" It is almost never \"not at all.\" If a single enterprise deal in your current pipeline is worth more than the implementation fee, the calculation is finished.",
    ],
    relatedSlugs: [
      "iso-27001-security-questionnaire",
      "iso-27001-10-weeks-vs-6-months",
      "iso-27001-uk-fintech-fca-dora",
    ],
  },
  "customer-asked-ai-governance": {
    slug: "customer-asked-ai-governance",
    title: "Our Customer Just Asked About Our AI Governance. We Don't Have Any.",
    description:
      "Enterprise buyers and investors are asking about AI governance with increasing regularity. If you build or deploy AI, ISO 42001 is the answer. Here is what to do this week.",
    date: "2026-04-04",
    category: "AI Governance",
    readingTime: "8 min read",
    author: "Muhammad Waleed",
    authorRole: "Lead Consultant, Pixelette Certified",
    content: [
      "Twelve months ago, no one was asking. Today, three questions are appearing in enterprise security questionnaires and investor due diligence packs with increasing regularity: How do you govern the AI models embedded in your product? What framework do you use to assess AI risk, bias, and model drift? Are you aligned with ISO 42001 or preparing for EU AI Act obligations? If you are building or deploying AI in an enterprise-facing product, you will get these questions. The only question is whether you get them from a buyer you are trying to close, an investor conducting diligence, or a regulator issuing a notice. In all three cases, \"we haven't thought about it yet\" is the wrong answer.",
      "ISO/IEC 42001:2023 is the first international management system standard for Artificial Intelligence. Published in December 2023, it specifies requirements for establishing, implementing, maintaining and continually improving an AI Management System (AIMS). In structure it is closely modelled on ISO 27001 (the same management system backbone, the same clause architecture, the same Stage 1 and Stage 2 audit pathway), but the controls address AI-specific risks: model governance, data quality, transparency, human oversight, bias and fairness, lifecycle management, and impact assessment. If you already hold ISO 27001, ISO 42001 is an extension, not a second certification from scratch.",
      "Three converging pressures explain why buyers are asking now. First, the EU AI Act entered into force in August 2024, with staged application dates through 2025 to 2027. Enterprise buyers with any EU operations are starting to screen their AI suppliers for EU AI Act alignment, and ISO 42001 is the most efficient evidence of alignment. Second, the UK government's AI Regulation White Paper and subsequent AI Bill consultation have pushed AI governance up the risk register at every regulated UK business. Third, boards and audit committees at larger enterprises now require AI risk to be tracked alongside cyber risk, and the only way for a procurement function to evidence AI risk management across a supplier base is to ask for certification.",
      "Based on engagements we have seen in the last six months, the buyers driving these questions are concentrated in four segments: financial services buyers under FCA, EBA, or DORA supervision who now treat AI as a critical third-party risk; healthcare and life sciences buyers who face MHRA and MDR scrutiny on AI-enabled clinical decision support; large enterprise legal, HR, and recruitment functions deploying AI into decision workflows with discrimination exposure; and Series B and later investors whose LPs are requiring AI governance evidence as a portfolio-level diligence item.",
      "Buyers asking about AI governance are not expecting a five-year certification programme. They are looking for evidence of four things, in decreasing order of importance. First, an accountable owner for AI risk: someone named, with a defined remit. Second, a documented AI inventory: which models you run, what data trains them, where they are deployed, what decisions they influence, and who is the human in the loop. The absence of an inventory is the single most common failure point we see on diligence calls. Third, a framework the buyer recognises, with ISO 42001 being the most defensible answer because it is the international standard. Fourth, impact assessments for high-risk AI use cases, especially if any models touch decisions about access to credit, employment, housing, insurance, healthcare, or legal outcomes.",
      "For a company already holding ISO 27001, ISO 42001 is a 10 to 14 week extension. The AIMS inherits the management system backbone from the existing ISMS (document control, management review, internal audit, corrective action), and you add the AI-specific controls on top. For a company without ISO 27001, doing both in parallel is often cleaner and cheaper than sequencing them, with a combined 14 to 18 week programme being realistic. Two things you cannot shortcut: the AI impact assessment methodology needs to be genuinely applied to your real use cases, not a template with your logo on it, and the AI inventory has to be complete because auditors will ask to trace a specific model end-to-end.",
      "If an enterprise buyer or investor has asked you about AI governance in the last fourteen days, you have three priorities this week. One: buy yourself calendar by confirming to the buyer that you are commencing an ISO 42001 readiness assessment with a named implementation partner. Do not claim certification; claim the project. Two: book a gap analysis to get an AI inventory, an initial risk register, and a certification timeline you can share under NDA. Three: decide on scope, whether ISO 42001 alone is sufficient or whether a combined ISO 27001 plus ISO 42001 programme is the right answer for your commercial position. The companies that act on this question in the next six months will own the category. The companies that wait will be answering procurement questionnaires against competitors who already hold the certificate.",
    ],
    relatedSlugs: [
      "iso-27001-security-questionnaire",
      "iso-27001-10-weeks-vs-6-months",
      "real-cost-not-being-iso-27001-certified",
    ],
  },
  "iso-27001-or-soc-2-uk-saas": {
    slug: "iso-27001-or-soc-2-uk-saas",
    title: "ISO 27001 or SOC 2? A Straight Answer for UK SaaS Selling into US Enterprise",
    description:
      "A UK SaaS company closes its first US deal and discovers SOC 2 is the default. This guide explains whether to hold one or both, and in what order.",
    date: "2026-04-03",
    category: "SOC 2",
    readingTime: "8 min read",
    author: "Muhammad Waleed",
    authorRole: "Lead Consultant, Pixelette Certified",
    content: [
      "A UK SaaS company closes its first US enterprise deal. Procurement sends over the vendor security package. The first page asks for the SOC 2 Type II report. The founder has ISO 27001, which took four months and 18,000 pounds to obtain. Now they discover that in the US, SOC 2 is treated as the default answer and ISO 27001 as something American procurement teams have to Google. The question arrives immediately: do we abandon ISO 27001, hold both, or try to convince the US buyer that ISO 27001 is \"equivalent\"? This guide answers that question directly, because the wrong decision costs you either a deal, 30,000-plus pounds in duplicate certification, or both.",
      "For a UK SaaS company selling into US enterprise in 2026, the correct answer is almost always to hold both, but sequenced, not simultaneously. Lead with whichever certification your immediate next three deals require, and add the second one within 9 to 12 months. The cost of holding both is significantly lower than most founders expect because approximately 60% to 70% of the control work overlaps. The wrong answers are: trying to argue ISO 27001 equivalence to a US buyer, holding one certification and losing deals in the other market, and attempting both simultaneously as a first-time certification, which stretches project cost, timeline and internal capacity beyond what most scale-ups can absorb.",
      "ISO/IEC 27001:2022 is a management system standard that certifies your organisation operates an Information Security Management System meeting an international specification, assessed by an independent UKAS-accredited certification body. The output is a certificate with a three-year cycle and annual surveillance audits. SOC 2, by contrast, is an attestation report, not a certification. It is issued by a licensed US CPA firm under AICPA standards, against the Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy). The output is a report that is renewed annually. SOC 2 Type I covers the design of controls at a point in time; SOC 2 Type II covers the operating effectiveness of controls over a period, typically 6 to 12 months. When US enterprise buyers ask for \"SOC 2,\" they almost always mean Type II.",
      "Three structural differences matter in practice. Scope: ISO 27001 is scoped by the organisation, while SOC 2 is scoped by the service or product offered to customers. Control framework: ISO 27001 uses a fixed control set (93 Annex A controls), while SOC 2 is framework-flexible with the organisation defining controls against each Trust Services Criterion. Evidence period: ISO 27001 first certification can be achieved with 4 to 6 weeks of operating evidence, while SOC 2 Type II typically requires 6 months minimum of operating evidence, which is the part founders underestimate.",
      "Which one buyers actually expect depends on market. US Fortune 500 and mid-market technology companies default to SOC 2 Type II and will often accept nothing else without escalation. US financial services and healthcare buyers frequently accept ISO 27001 because they already recognise the standard from international regulatory exposure. UK and EU buyers expect ISO 27001 almost without exception. For a UK SaaS company, ISO 27001 is the first certification to obtain because it protects your home market and EU/MEA expansion, and SOC 2 is the second certification because it unlocks US enterprise.",
      "Approximately 60% to 70% of the control work is common across ISO 27001 and SOC 2: access controls, change management, logging and monitoring, vendor management, incident response, physical security, encryption, and personnel security all satisfy both frameworks when documented correctly. A properly sequenced dual programme runs ISO 27001 first in 10 to 12 weeks to certification, followed immediately by a SOC 2 readiness assessment that extends the existing control set, followed by a 6-month SOC 2 Type II observation window, followed by the SOC 2 Type II audit. Total elapsed time from zero to both credentials: 9 to 12 months. Total cost: typically 40% to 50% lower than obtaining them independently.",
      "Three common mistakes to avoid. First, trying to explain ISO 27001 equivalence to a US procurement team: this fails 80% of the time because procurement teams are running a checklist, not a judgement call. Second, going to SOC 2 first and abandoning the UK/EU cushion: if the US deal stalls and your UK renewal pipeline starts asking for ISO 27001 you do not yet hold, you have built on one leg of the stool. Third, doing both simultaneously as a first-time programme: a 20-person scale-up cannot absorb the consultant workshops, documentation reviews, control implementation and audit preparation for two frameworks at once. Sequencing is faster and cheaper.",
      "The decision in one paragraph: look at your next three signed-or-signing deals. If two or more are US tech-company buyers, start with SOC 2 Type II and plan ISO 27001 to follow at month 9. If two or more are UK, EU, or regulated-industry buyers, start with ISO 27001 and plan SOC 2 Type II to follow at month 6. If the split is mixed or unclear, ISO 27001 first, because it protects your home market and creates the control base that makes SOC 2 significantly cheaper to add later.",
    ],
    relatedSlugs: [
      "iso-27001-security-questionnaire",
      "enterprise-security-questionnaire-without-iso-27001",
      "real-cost-not-being-iso-27001-certified",
    ],
  },
  "enterprise-security-questionnaire-without-iso-27001": {
    slug: "enterprise-security-questionnaire-without-iso-27001",
    title: "How to Answer an Enterprise Security Questionnaire Without ISO 27001",
    description:
      "A tactical guide for handling enterprise security questionnaires when you do not yet hold ISO 27001, with a free response framework template.",
    date: "2026-04-02",
    category: "Advisory",
    readingTime: "8 min read",
    author: "Muhammad Waleed",
    authorRole: "Lead Consultant, Pixelette Certified",
    content: [
      "There is a defensible way to answer a security questionnaire without holding ISO 27001. It will not win you every deal, but it will keep you in the conversation on the majority of deals where the buyer has some flexibility. The key is knowing which questions need careful handling and which ones you can answer confidently without the certificate at all.",
      "Enterprise security questionnaires look like they are testing your security controls. They are not. They are testing four things, in order: whether your answers are consistent and non-evasive, whether a real human with security knowledge has read the questions, whether you have documented what you claim to do, and whether the specific controls the buyer cares about are in place. Most founders focus on the fourth point. Buyers weight the first three higher because they reveal maturity. A vendor with no ISO 27001 certificate but thoughtful, consistent, documented answers will frequently pass where a vendor with ISO 27001 but a lazy response will not.",
      "Roughly 60% of a standard enterprise vendor questionnaire covers territory that does not depend on ISO 27001 status. If you handle these confidently, you buy credibility for the remaining 40%. These include company information, ownership, legal entity, and data protection registration; data handling including what personal data you process, where it is stored, how long, and who has access; access controls such as MFA, role-based access, joiner/leaver processes, and privileged access management; encryption at rest and in transit with named services and algorithms; incident response with a written plan, last test date, and named incident commander; business continuity including RTO, RPO, backup strategy, and disaster recovery testing cadence; and your sub-processor list with country, purpose, and data categories shared.",
      "The other 40% of questions are where the absence of ISO 27001 hurts. \"Do you hold ISO 27001 (or equivalent)?\" has no honest answer that is not \"No,\" but you can modify the answer with forward-looking commitment. \"Please provide your Statement of Applicability\" requires offering a risk register and control matrix instead. \"Please provide your last internal audit report\" can be addressed by offering your last penetration test report and your last DPIA. The correct framing on all of these is: \"We do not currently hold ISO 27001. We are implementing it with [named partner] with Stage 2 audit scheduled for [date]. The underlying controls referenced in your question are documented and operating today.\"",
      "Five phrases will kill a questionnaire response instantly. \"We follow industry best practice\" is meaningless: name the framework or delete the sentence. \"N/A\" on questions about encryption, MFA, logging, or incident response is never acceptable: either you do it or you do not. \"This is handled by our cloud provider\" misses the point: the buyer is asking about your controls, not AWS's, and shared responsibility does not transfer your obligations. \"Confidential\" used too liberally signals you have nothing to disclose. \"In progress\" without specifics is only acceptable if followed by a specific date and a named partner.",
      "Most enterprise buyers expect questionnaire responses in one of three formats: an Excel spreadsheet filled in, a PDF filled in, or a written response document referencing the original questions. For the written response document, which is increasingly common with Standardized Information Gathering (SIG) questionnaires, buyers expect a one-page cover summary of your security posture, the question-by-question response, a short appendix of supporting evidence including architecture diagram, data flow diagram, sub-processor list, penetration test summary, and incident response plan, plus contact details for your security lead.",
      "If you are on your third or fourth enterprise questionnaire in six months and each one is a 30-hour internal fire drill, the tactical approach will buy you time but not solve the problem. The problem is that every future deal will repeat the same pattern until you hold the certificate. The cost of answering questionnaires manually, typically 30 to 60 hours of senior time per response, crosses the cost of certification somewhere around the fourth or fifth questionnaire. After that, you are losing money by deferring. The template is a tactical bridge. The strategic answer is to certify.",
    ],
    relatedSlugs: [
      "iso-27001-security-questionnaire",
      "iso-27001-or-soc-2-uk-saas",
      "iso-27001-10-weeks-vs-6-months",
    ],
  },
  "iso-27001-uk-fintech-fca-dora": {
    slug: "iso-27001-uk-fintech-fca-dora",
    title: "ISO 27001 for UK Fintech: What the FCA and DORA Actually Require",
    description:
      "FCA operational resilience, DORA compliance, and ISO 27001 for fintech. This guide maps the real regulatory requirements to the certification framework.",
    date: "2026-04-01",
    category: "FinTech",
    readingTime: "8 min read",
    author: "Muhammad Waleed",
    authorRole: "Lead Consultant, Pixelette Certified",
    content: [
      "UK fintechs face a problem that SaaS and general technology businesses do not. Their regulators, primarily the FCA, the PRA for dual-regulated firms, and the European Banking Authority via DORA for firms with EU customers, do not merely suggest information security controls. They require specific operational resilience and ICT risk management outcomes, and they supervise whether those outcomes are being achieved. ISO 27001 is not a legal requirement in either regime. But in practice, it is the most efficient and defensible way to demonstrate the controls the regulators expect you to have.",
      "Three FCA instruments matter. SYSC 13 (Operational Risk) and SYSC 15A (Operational Resilience) in the FCA Handbook; PS21/3 and the operational resilience rules that came into full effect in March 2025, requiring firms to identify Important Business Services, set Impact Tolerances, map dependencies, and test their ability to remain within tolerance during disruption; and the FCA's ongoing supervisory expectations on third-party risk, cyber resilience and cloud outsourcing. In practical terms, the FCA expects a supervised fintech to demonstrate a documented ICT risk management framework with board-level ownership, identified Important Business Services with tested Impact Tolerances, evidence of third-party risk management including exit plans for critical cloud providers, incident detection, response and reporting capability aligned with FCA notification obligations, regular testing including scenario-based exercises and penetration testing, and staff training with an articulated security culture.",
      "The EU Digital Operational Resilience Act (DORA, Regulation 2022/2554) became directly applicable on 17 January 2025. If your fintech offers services to EU customers, or processes data for EU financial entities as a third-party provider, DORA affects you even post-Brexit, either directly as a financial entity or indirectly through the DORA pass-through obligations your EU customers will flow down to you as a critical ICT third-party provider. DORA's requirements cluster into five areas that all map heavily onto ISO 27001: ICT risk management framework (Articles 5 to 15), ICT-related incident management and reporting (Articles 17 to 23), digital operational resilience testing (Articles 24 to 27), ICT third-party risk management (Articles 28 to 44), and information and intelligence sharing (Article 45).",
      "ISO 27001 alone does not make you DORA-compliant. But an ISO 27001-certified ISMS is the fastest foundation on which to build the additional DORA-specific controls, because roughly 75% of the control work is already done. Four areas always require fintech-specific extension beyond vanilla ISO 27001: operational resilience scoping (ISO 27001 is scoped by information security while FCA operational resilience is scoped by Important Business Services), third-party risk register and exit planning (the FCA and DORA expect more detail than ISO 27001's Annex A requires in isolation), incident notification workflows (the FCA SUP 15 notification regime and DORA Article 19 have specific timelines and templates), and regulator-ready evidence packs (supervision is increasingly conducted through evidence requests including Section 166 skilled persons reviews).",
      "The question your board should be asking is not \"do we need ISO 27001?\" It is: \"What is the defensible minimum evidence base we need to pass an FCA supervisory review and a DORA oversight request without remediation findings?\" The answer is a certified ISMS, an operational resilience framework integrated into it, a third-party risk register with tested exits, and an incident notification runbook mapped to FCA and DORA timelines. ISO 27001 is the entry point to that answer. It is not the whole answer.",
      "For a UK fintech under FCA supervision with any EU exposure, a defensible 12-month programme looks like this: Weeks 1 to 12 for ISO 27001 implementation and Stage 2 audit; Weeks 8 to 20 (overlapping) for operational resilience framework build-out aligned with PS21/3 Important Business Services and Impact Tolerances; Weeks 13 to 24 for DORA gap assessment against ISO 27001 baseline, with incremental control build-out for the 25% of DORA requirements not already satisfied; Weeks 20 to 36 for ISO 22301 certification for business continuity if DORA testing requirements or FCA operational resilience tolerances warrant independent attestation; and a parallel workstream throughout for third-party risk register build-out and exit plan testing.",
      "Total engagement cost for a sub-150-person fintech: typically 45,000 to 75,000 pounds across all workstreams. Compared to the cost of a Section 166 remediation exercise following a supervisory finding, routinely 250,000 to 1 million pounds in skilled persons fees alone, the proactive path is significantly cheaper. The alternative of building equivalent evidence internally without certification is perfectly legal but usually more expensive and always harder to defend to a regulator who prefers independently audited assurance over internal documentation.",
    ],
    relatedSlugs: [
      "real-cost-not-being-iso-27001-certified",
      "iso-27001-security-questionnaire",
      "iso-27001-10-weeks-vs-6-months",
    ],
  },
};

function getPost(slug: string): BlogPostData | undefined {
  return blogPostsData[slug];
}

function getRelatedPosts(slugs: string[]): BlogPostData[] {
  return slugs
    .map((s) => blogPostsData[s])
    .filter(Boolean);
}

export async function generateStaticParams() {
  return Object.keys(blogPostsData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://pixelettecertified.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.relatedSlugs);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title }]} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}

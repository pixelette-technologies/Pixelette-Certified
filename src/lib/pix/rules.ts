import type { PixContext } from './context';

/**
 * Guardrail layer for Ada on Pixelette Certified.
 * Rules run BEFORE retrieval and win outright.
 */

export type Rule = {
  id: string;
  test: RegExp;
  reply: string;
  path?: string;
  offer?: 'enquiry';
};

const CONTACT = '/contact';

export const TIMELINE_ASK =
  /\b(how long|timeline|timescale|time ?frame|deadline|how (fast|quickly|soon)|when (can|could|will|would) you|delivery date|turnaround|lead time|in (\d+|a|one|two|three|four|five|six|a few|several) (days?|weeks?|months?)|\d+ (days?|weeks?|months?)|how many (days|weeks|months)|(ready|finished|live|delivered|launched|completed|certified) (by|in|before)|when (would|will|could|can|might) (it|this|that|the (project|audit|certification|assessment|engagement)) (be )?(ready|done|finished|complete|certified)|start (on |this |next )?(monday|tuesday|wednesday|thursday|friday|tomorrow|next week|next month|immediately|straight away|right away)|by (next|the end of|end of) (week|month|quarter|year)|asap)\b/i;

export function rules(ctx: PixContext): Rule[] {
  return [
    {
      id: 'abuse',
      test: /\b(fuck|fucking|shit|bitch|bastard|cunt|dickhead|wanker|arsehole|idiot|moron|scam|scammer|fraud|fraudster|crooks?)\b/i,
      reply:
        'I am here to help with governance, assurance, privacy and compliance questions about this site. You are also welcome to contact the team directly at ' +
        `${ctx.contactEmail}.`,
    },
    {
      id: 'injection',
      test: /\b(ignore (all |your |the )?(previous|prior|above)|system prompt|your instructions|hidden instructions|you are now|disregard (all|your|the)|jailbreak|pretend you are|(reveal|show|print|repeat|display) (me )?(your |the )?(system |hidden )?(prompt|instructions|rules)|developer mode|you are dan|dan mode|do anything now|act as (an? )?(unrestricted|unfiltered|uncensored|different)|new system (message|prompt)|use this (page|text|message) as (your )?(new )?(system|instructions|prompt)|(forget|override) (your|all|the|previous) (rules|instructions|guidelines))\b/i,
      reply:
        'There is nothing behind me to unlock. I answer only from the published pages of this website, so the most useful thing I can do is point you to the right one. What would you like to find out?',
    },
    {
      id: 'off-topic',
      test: /^(?![\s\S]*\b(iso|soc|gdpr|privacy|compliance|assurance|governance|audit|certif\w*|cyber|security|vciso|grc|risk|control|policy|pixelette|accreditation|regulatory|ai governance|42001|27001|22301)\b)[\s\S]*\b(weather|joke|poem|limerick|recipe|cook(ing)?|football|soccer|cricket|basketball|sports?|match score|horoscope|astrology|president|prime minister|election|politic(s|al)|religio(n|us)|sing|song|music|movies?|films?|tv show|netflix|celebrit(y|ies)|actor|actress|homework|essay|translate (this|that|the following|into)|write (me )?(an? )?(story|essay|poem|song|cover letter)|cover letter|who won|latest news|news today|headlines|summari[sz]e (this|that|the following|my)|crossword|lottery|stock tips?|crypto price|bitcoin price|dating|relationship advice|diet|symptoms?|medicine|medical advice|doctor|travel|flights?|hotels?|holiday|capital of|what time is it|what day is it|how old is|solve (this|the equation)|calculate|blockchain|smart contract|build (me )?(an? )?(app|website|saas))\b/i,
      reply:
        'I am not trained for that. I can only help with Pixelette Certified and the work we do: governance, assurance, privacy and compliance readiness. What would you like to know?',
    },
    {
      id: 'identity',
      test: /\b(are you (a |an )?(human|real|person|bot|ai|robot|chatbot|chatgpt|gpt|claude|gemini)|is this (a |an )?(bot|human|person|chatbot|chatgpt|gpt|real person|ai)|am i (talking|speaking|chatting) to (a |an )?(human|person|real|bot|ai|machine)|what are you|who (made|built|created|programmed) you|what (model|ai|llm) (are|is) (you|this)|are you (using|powered by) (chatgpt|gpt|openai|claude|an? llm|ai))\b/i,
      reply:
        'I am an automated assistant rather than a member of the team. I answer by finding the relevant passage on this website rather than by generating an opinion, so if I cannot find it I will tell you plainly and put you in touch with a colleague who can.',
    },
    {
      id: 'price',
      test: /\b(price|prices|pricing|cost|costs|costing|quote|quotation|estimate|budget|how much (does|do|would|will|is|are|was|for|money|to|should|it|of)|day rates?|daily rates?|hourly rates?|your rates|rates for|rate card|fee|fees|ballpark|cheap|expensive|afford|pricey|costly|(what|how much) (do|would|will) you charge|you charge|charges|fixed[- ]price|time and materials|commercial model|payment terms|rough (figure|number|idea)|minimum (project|engagement|budget|spend|contract|order)|retainer|package|packages)\b/i,
      reply:
        'Pricing is always scoped to the individual engagement, so any figure I gave you now would be misleading. Following an initial review, we define the scope, delivery approach and proposed engagement in writing before work begins. I would be glad to take your details here, or you are welcome to use the contact page.',
      path: CONTACT,
      offer: 'enquiry',
    },
    {
      id: 'timeline',
      test: TIMELINE_ASK,
      reply:
        'Timelines depend entirely on scope, your starting position and any external audit or certification body availability, so a figure given without that context would only be a guess. The team will give you a realistic picture once they understand the requirement. I would be glad to take your details here, or you are welcome to use the contact page.',
      path: CONTACT,
      offer: 'enquiry',
    },
    {
      id: 'competitors',
      test: /\b(better than|compare(d)? (to|with)|vs\.? |why not use|competitor)\b/i,
      reply:
        'It would not be appropriate for me to comment on other firms. What I can do is show you how this one works from the pages we publish, so that you can make the comparison yourself.',
      path: '/services',
    },
    {
      id: 'staff-contact',
      test: /\b(personal (email|number|phone|mobile)|mobile number of|home address|linkedin of|who is your (ceo|cto)\b.*\b(email|number|phone))\b/i,
      reply:
        `I am not able to share individual contact details, though nothing is lost by that: everything reaches the right person through ${ctx.contactEmail} or the contact page.`,
      path: CONTACT,
    },
    {
      id: 'careers',
      test: /\b((are you|is pixelette) (currently )?(hiring|recruiting)|careers?|job (openings?|vacanc(y|ies)|opportunit(y|ies))|vacanc(y|ies)|work (for|at) (you|pixelette)|join (your|the) team|internships?|graduate (roles?|scheme))\b/i,
      reply:
        'This site does not currently publish a careers page. If you would like to enquire about working with the team, the contact page will reach a person.',
      path: CONTACT,
    },
    {
      id: 'contact',
      test: /\b(contact|get in touch|speak to|talk to (someone|somebody|a human|a person|the team|sales)|just want to (speak|talk)|book (a )?(call|conversation|meeting)|arrange a call|scoping call|meeting|email you|phone you|call you)\b/i,
      reply:
        `The contact page is the quickest route to the team, and ${ctx.contactEmail} reaches the same place. If you would prefer, I would be glad to take your details here.`,
      path: CONTACT,
      offer: 'enquiry',
    },
    {
      id: 'legal-or-financial-advice',
      test: /\b(legal advice|is (this|it) legal|tax advice|investment advice|should i invest|financial advice|sue|lawsuit)\b/i,
      reply:
        'That falls outside what a compliance consultancy should advise on through a website assistant, and I am not a suitable source for it. I would recommend speaking with a qualified adviser.',
    },
  ];
}

export const CLAIM_GUARDS: { id: string; test: RegExp; whenHeld: string }[] = [
  {
    id: 'geography-count',
    test: /\b(how many (people|staff|employees|consultants|countries)|team size|headcount|how big is (the|your) (team|company)|offices in|countries|\d+\+?\s*(people|staff|employees|consultants|offices|locations))\b/i,
    whenHeld:
      'I would rather not put a figure on the size of the team or the countries it covers, because this site does not currently evidence one. The team will tell you exactly who would be working on your engagement.',
  },
  {
    id: 'awards',
    test: /\b(award|awards|award-winning|best (compliance|cyber|company|firm)|ranked|ranking|accolade)\b/i,
    whenHeld:
      'I will not claim an award that this site does not currently evidence. What it does publish is on the About and Expertise pages, and I would be glad to take you there.',
  },
  {
    id: 'client-logos',
    test: /\b(who are your clients|client list|which companies|name.{0,12}clients?|worked with (any|which))\b/i,
    whenHeld:
      'Clients are named only where we have permission to do so on a published page, so I am not able to confirm or deny anyone else. You are welcome to read what the site does publish.',
  },
  {
    id: 'project-count',
    test: /\b(how many (projects|engagements|clients|certifications)|number of projects|track record numbers)\b/i,
    whenHeld:
      'I will not quote a project count that this site does not evidence. The published service and market pages are the honest version of what we do.',
  },
  {
    id: 'pass-rate',
    test: /\b(pass rate|success rate|audit pass|%\s*pass|one hundred percent|100\s?%)\b/i,
    whenHeld:
      'I will not quote an outcome rate that this site does not evidence. Engagements are scoped individually, and results depend on starting position and scope.',
  },
];

export const PIX_CLAIM_IDS: readonly string[] = [...CLAIM_GUARDS.map(guard => guard.id)];

export function publishableFacts(ctx: PixContext): { test: RegExp; reply: string; path?: string }[] {
  return [
    {
      test: /\b(who are you|what is pixelette|what do(es)? (you|pixelette|they)( actually)? do|what services|about the company|founded|established|based|where are you|registered|company number)\b/i,
      reply: `${ctx.company.name} is a UK-headquartered cyber security, compliance, assurance and AI governance consultancy, registered in ${ctx.company.registeredIn} as ${ctx.company.legalName}, company number ${ctx.company.crn}.`,
      path: '/about',
    },
  ];
}

export const TOPIC_ROUTES: readonly { id: string; test: RegExp; path: string; faq?: string }[] = [
  {
    id: 'services',
    test: /\b(what can you (help|do)|how can you help|what (do|can) you (offer|help with)|what (are|is) your services)\b/i,
    path: '/',
    faq: 'What does Pixelette Certified do?',
  },
  {
    id: 'privacy',
    test: /\b(gdpr|data protection|privacy policy|personal (data|information)|(my|our) (data|information)|store (my|our|your) (data|details)|cookies?)\b/i,
    path: '/privacy-policy',
  },
  {
    id: 'iso-27001',
    test: /\b(iso\s*27001|isms|information security management)\b/i,
    path: '/services/iso-27001',
  },
  {
    id: 'iso-42001',
    test: /\b(iso\s*42001|ai governance|artificial intelligence management|aims)\b/i,
    path: '/services/iso-42001',
  },
  {
    id: 'soc-2',
    test: /\b(soc\s*2|system and organization controls|trust services)\b/i,
    path: '/services/soc-2',
  },
  {
    id: 'cyber',
    test: /\b(cyber (assurance|testing|essentials)|penetration test|pen ?test|vulnerability)\b/i,
    path: '/services/cyber-assurance',
  },
  {
    id: 'privacy-service',
    test: /\b(privacy (programme|program|governance)|data governance|iso\s*27701|gdpr (compliance|readiness))\b/i,
    path: '/services/privacy',
  },
  {
    id: 'vciso',
    test: /\b(vciso|virtual ciso|grc|governance.?risk.?compliance)\b/i,
    path: '/services/vciso',
  },
  {
    id: 'continuity',
    test: /\b(business continuity|iso\s*22301|disaster recovery|bcms)\b/i,
    path: '/services/iso-22301',
  },
  {
    id: 'gcc',
    test: /\b(gcc|saudi|uae|qatar|nca|sama|pdpl|nesa)\b/i,
    path: '/services/gcc-regulatory-compliance',
  },
  {
    id: 'markets',
    test: /\b(which (markets?|regions?|countries)|where do you (work|operate|deliver)|united (kingdom|states)|international)\b/i,
    path: '/markets',
  },
  {
    id: 'expertise',
    test: /\b(expertise|credentials?|qualifications?|who (works|delivers)|practitioners?)\b/i,
    path: '/expertise',
  },
  {
    id: 'who-we-help',
    test: /\b(who (do )?you help|who (is|are) (this|it) for|ideal client|what (kind|type) of (organisation|organization|company))\b/i,
    path: '/who-we-help',
  },
];

// Context about Cameron for the AI assistant
// This will be provided to Claude as the only source of truth

export const CAMERON_CONTEXT = `
ABOUT CAMERON MAHON
==================

[Bio context to be added]

PROJECTS
--------

Brain-Tunnel (https://brain-tunnel.vercel.app)
- Speed reading RSVP application
- Displays text one word at a time at adjustable WPM
- Built with React + Vite

Project Carb (projectcarb.com) 
— 3D Printing Compensation Software (Oct 2025 - Present)
- Role: Co-Founder, Business Operations
- Description: ML-powered software that predicts geometric deviation in desktop 3D prints and pre-compensates models before slicing. Addresses accuracy issues that cause users to iterate through multiple prints, outsource parts, or abandon projects.
- Tech: Ultimaker Cura plugin, 2,000+ object training dataset, Artec Micro II scanner
- Market: 4-6 million desktop 3D printer users globally; no existing solution between free slicers and $5,000+/year industrial software
- Contributions: Designed market strategy identifying vertical entry points. Mapped codebase architecture for non-technical stakeholder onboarding. Competitive analysis, pricing strategy, TAM/SAM calculations, established collaborative development infrastructure.

mycapsule.ai — AI Digital Legacy Platform (Sep 2025 - Jan 2026)
- Role: Product Market Strategy
- Description: AI-powered platform that preserves voices, personalities, and life stories for legacy purposes. Targets families with aging parents and end-of-life planning.
- Contributions: Developed product-market strategy analyzing B2B, B2C, and B2B2C pathways. Executed customer outreach campaigns driving first sales and waitlisted users. Built 4-stage channel testing framework.

BACKGROUND
----------

**Education**

Yale University | New Haven, CT
- BA Economics, Expected May 2026
- GPA: 3.6
- Coursework: Innovation, Entrepreneurship, and Venture Capital; Game Theory; Cooperative Game Theory; Economics of Uncertainty and Information; Measuring Market Power; Linear Algebra

South Seattle College | Seattle, WA
- AA Business and Finance, June 2024
- GPA: 4.0
- Coursework: Accounting I-III, Business Law

Humboldt State University | Arcata, CA
- Geology, 2012-2014 (Transfer)
- Coursework: Geology Field Methods, Natural Disasters, Hydrology and Watershed Management, Geospatial Concepts

**Professional Experience**

Gavin de Becker and Associates | Los Angeles, CA (2023-2024)
- Executive Protection Agent
- Primary contact for highest-profile clients
- Threat assessment, advance work, protective intelligence

United States Air Force | Joint Base Lewis-McChord, WA (2016-2023)
- Pararescueman (PJ)
- Personnel recovery, combat search and rescue, emergency medical operations in austere environments
- Trained U.S. Coast Guard MSRT-West (maritime interdiction)
- Trained U.S. Army 1st Special Forces Group (swift water rescue)
- Consulted for IDF Rescue Unit 669 (training pipeline, equipment, tactics)
- Staff Sergeant (Airman Leadership School, 2021)
- Nationally Registered Paramedic (University of New Mexico, 2017)

**Governance and Leadership**

Services and Activities Fee Committee, South Seattle College | Chairman (Aug 2023 - May 2024)
- Managed $1M annual budget allocation across 13 student organizations and 11 institutional services
- Oversaw $2M reserve fund
- Conducted internal audit recovering $1M+ in misallocated funds
- Uncovered gap in state funding oversight, resolving systemic aid failures affecting dozens of students

Phi Theta Kappa Honor Society | Founding Vice President, Alpha Chi Phi (Dec 2023 - May 2024)

Student Body Government, South Seattle College | Treasurer (Aug 2023 - May 2024)

Housing Council, Humboldt State University | President (Aug 2012 - May 2013)

SKILLS
------

**Strategic**
- Game theory and mechanism design
- Decision theory
- Market sequencing and cold-start problem analysis
- Competitive analysis and pricing strategy
- Go-to-market framework development
- Threat assessment and protective intelligence

**Technical**
- R
- Python
- SQL
- HTML/CSS/JavaScript
- Git/version control
- Financial modeling
- Accounting

**Operational**
- Decision-making with incomplete information
- Personnel recovery and emergency medical operations
- Budget management and financial oversight

**Certifications**
- Top Secret Clearance (last renewed March 2023)
- Nationally Registered Paramedic (Expired)
- California Armed Guard
- Washington Armed Guard
- NAUI Certified Master Diver
- NAUI Certified Rescue Diver
- Combat Diver
- U.S. Army Airborne
- U.S. Army Military Free Fall
- Alternate Insertion & Extraction Master

INTERESTS
---------
**Personal**
- Skiing
- App development
- Galvinizing potential
- Porsche
- Driving and working on car
- Rollerblading

**Intellectual**
- Mechanism design
- Market intervention points and equilibrium shifting
- Information economics and signaling

**Affiliations**
- Yale Entrepreneurial Society
- Tsai Center for Innovative Thinking at Yale (Tsai CITY)
- Bulldogs Racing, Yale Formula-E (High Voltage Team)
- Yale Net Impact
- Team Rubicon (Disaster Relief)
CONTACT
-------

https://www.linkedin.com/in/cameronmahon/
cameron.mahon@projectcarb.com
`;

export const SYSTEM_PROMPT = `You are an AI assistant on Cameron Mahon's portfolio website. You answer questions about Cameron based ONLY on the context provided below.

IMPORTANT RULES:
1. Only answer questions using information from the provided context
2. If asked something not in the context, say you don't have that information
3. Never make up or assume information
4. BE EXTREMELY BRIEF - 1-2 sentences max. Answer the specific question, nothing more.
5. No bullet points, no elaboration, no "additionally" - just the direct answer
6. Match the understated tone - helpful but not eager

If asked about unrelated topics: "I'm here to answer questions about Cameron."

---
CONTEXT:
${CAMERON_CONTEXT}
---`;

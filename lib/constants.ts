export const SITE_CONFIG = {
  name: "Clayton Cuteri",
  title: "Clayton Cuteri | VP of Engineering & AI | CTO | SaaS Leader",
  description:
    "Engineering and AI executive with 8+ years building AI-powered platforms. Experienced in leading cross-functional teams, scaling cloud infrastructure, and shipping AI products.",
  url: "https://claytoncuteri.com",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "AI Expertise", href: "#ai-expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  { value: "25", suffix: "+", label: "Team Members Led" },
  { value: "8", suffix: "+", label: "Years in Engineering & AI" },
  { value: "500", prefix: "$", suffix: "K+", label: "Venture Capital Raised" },
  { value: "1", suffix: "", label: "Successful Exit" },
];

export const ABOUT_TEXT = [
  "I build AI-driven products and the teams behind them. As VP of Engineering & AI at Amara Social, I lead 25 professionals across 5 cross-functional squads, shipping AI-powered content moderation, recommendation systems, and personalization engines on AWS.",
  "Before that, I co-founded Dolo Distribution, built the tech from scratch, and led it to a successful exit. I started my career at General Atomics building mission-critical drone software, and at The MITRE Corporation supporting government R&D.",
  "I hold a B.S. in Computer Engineering from the University of Central Florida, an active SECRET security clearance, and a Global Leader of the Year award from the 2024 Asia Icon Awards. When I am not building products, you can find me on the jiu jitsu mats (purple belt), on the golf course, or hosting my podcast.",
  "I am based in Mount Pleasant, SC and open to remote leadership opportunities.",
];

export const EXPERIENCE = [
  {
    company: "Amara Social",
    title: "VP of Engineering & AI",
    dates: "Sep 2021 - Present",
    bullets: [
      "Built AI content moderation pipeline (Bedrock, Rekognition): 35% reduction in manual review, 85% accuracy",
      "Designed RAG-based recommendation engine: 18% CTR increase, 12% session duration uplift",
      "Architected event-driven AWS microservices: 37% cost reduction, 36% performance boost",
      "Led fundraising strategy contributing to $500K+ raised and 22% profit growth",
    ],
    tech: [
      "Python",
      "Node.js",
      "TypeScript",
      "React Native",
      "AWS",
      "Bedrock",
      "RAG",
      "Terraform",
    ],
  },
  {
    company: "Dolo Distribution",
    title: "Co-Founder & CTO",
    dates: "Oct 2020 - Aug 2021",
    bullets: [
      "Built AI recommendation system increasing order value by 18%",
      "Developed inventory optimization models reducing stockouts by 25%",
      "Led full technical strategy from MVP to successful exit",
    ],
    tech: ["Python", "React", "AWS"],
  },
  {
    company: "General Atomics",
    title: "Software Engineer",
    dates: "Sep 2017 - Jun 2021",
    bullets: [
      "Developed pilot control application for military UAS operations",
      "Delivered high-reliability software under DoD quality standards",
    ],
    tech: [".NET", "C#", "WPF", "C++"],
  },
  {
    company: "The MITRE Corporation",
    title: "Simulation Systems Intern",
    dates: "Jun 2015 - May 2017",
    bullets: [
      "Supported simulation and modeling for government research programs",
    ],
    tech: ["Linux", "MongoDB", "Ruby", "HTML/JS"],
  },
];

export const AI_EXPERTISE = [
  {
    title: "Recommendation & Matching Systems",
    description:
      "Designed and deployed RAG-based recommendation engines using embedding similarity and weighted scoring. A/B tested across thousands of users with measurable engagement lifts.",
    icon: "Brain",
  },
  {
    title: "NLP & Content Moderation",
    description:
      "Built production NLP pipelines for content moderation, sentiment analysis, and automated tagging using AWS Bedrock and Rekognition.",
    icon: "Shield",
  },
  {
    title: "Predictive Analytics",
    description:
      "Developed churn prediction models and user behavior analytics driving targeted retention campaigns and measurable business outcomes.",
    icon: "TrendingUp",
  },
  {
    title: "LLM Integration & Generative AI",
    description:
      "Led R&D integrating large language models via Bedrock for personalized content creation, AI-assisted guidance, and intelligent automation.",
    icon: "Sparkles",
  },
  {
    title: "AI Ethics & Compliance",
    description:
      "Established bias audit frameworks and transparency reporting systems, ensuring compliance with GDPR, CCPA, and emerging AI regulations.",
    icon: "Scale",
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "Architected event-driven AWS microservices (Lambda, ECS, SQS, SNS) with Terraform IaC, achieving 37% cost reduction and 99.99% uptime.",
    icon: "Cloud",
  },
];

export const PROJECTS = [
  {
    title: "rag-core",
    subtitle: "Lightweight RAG Pipeline Library for Python",
    github: "https://github.com/claytoncuteri/rag-core",
    caseStudyUrl: "/projects/rag-core",
    features: [
      "Recursive, semantic, and fixed-size chunking strategies",
      "Local and API-based embedding support with caching",
      "Cosine similarity search with re-ranking",
      "Configurable pipeline with smart defaults",
    ],
    codeSnippet: `from rag_core import RAGPipeline
pipeline = RAGPipeline(chunk_strategy="recursive")
pipeline.ingest(documents)
response = pipeline.query("How does event-driven architecture work?")`,
  },
  {
    title: "modguard",
    subtitle: "Multi-Layered AI Content Moderation Pipeline",
    github: "https://github.com/claytoncuteri/modguard",
    caseStudyUrl: "/projects/modguard",
    features: [
      "Rule-based + ML toxicity + sentiment analysis layers",
      "Weighted ensemble decision engine",
      "FastAPI server with real-time WebSocket dashboard",
      "Configurable thresholds and custom classifier support",
    ],
    codeSnippet: `from modguard import ModerationPipeline
result = pipeline.moderate("Your text here")
print(result.decision)     # APPROVE | FLAG_FOR_REVIEW | REJECT
print(result.confidence)   # 0.94`,
  },
];

export const CONTACT = {
  linkedin: "https://www.linkedin.com/in/clayton-cuteri/",
  github: "https://github.com/claytoncuteri/",
  heading: "Let's Build Something Together",
  subheading:
    "Open to CTO and VP of Engineering roles, advisory positions, and interesting AI challenges.",
};

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/clayton-cuteri/",
    icon: "Linkedin",
  },
  {
    label: "GitHub",
    url: "https://github.com/claytoncuteri/",
    icon: "Github",
  },
];

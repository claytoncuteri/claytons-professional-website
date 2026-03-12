// RAG Demo Data
export const RAG_SAMPLE_DOCUMENTS = [
  {
    title: "Event-Driven Architecture",
    preview:
      "Event-driven architecture enables loosely coupled systems where services communicate through events rather than direct calls. This pattern improves scalability and fault isolation.",
    chunks: [
      "Event-driven architecture enables loosely coupled systems where services communicate through events rather than direct calls.",
      "This pattern improves scalability and fault isolation by decoupling producers from consumers.",
      "Common implementations include message queues (SQS, RabbitMQ) and event streaming platforms (Kafka, Kinesis).",
    ],
  },
  {
    title: "Microservices Patterns",
    preview:
      "Microservices break monolithic applications into independently deployable services. Each service owns its data and communicates via APIs or events.",
    chunks: [
      "Microservices break monolithic applications into independently deployable services, each owning its domain logic and data.",
      "Service discovery, circuit breakers, and API gateways are essential patterns for production microservice deployments.",
      "The trade-off is increased operational complexity in exchange for team autonomy and independent scaling.",
    ],
  },
  {
    title: "Serverless Computing",
    preview:
      "Serverless platforms like AWS Lambda abstract infrastructure management. Functions execute on demand, scaling automatically from zero to thousands of concurrent invocations.",
    chunks: [
      "Serverless platforms like AWS Lambda abstract infrastructure management entirely from the development team.",
      "Functions execute on demand with automatic scaling from zero to thousands of concurrent invocations.",
      "Cold starts, vendor lock-in, and debugging complexity are key challenges to consider when adopting serverless.",
    ],
  },
  {
    title: "API Design Best Practices",
    preview:
      "Well-designed APIs serve as contracts between systems. RESTful principles, versioning strategies, and consistent error handling improve developer experience.",
    chunks: [
      "Well-designed APIs serve as contracts between systems, enabling teams to build independently against stable interfaces.",
      "RESTful principles, versioning strategies, and consistent error handling are foundational to good API design.",
      "GraphQL offers an alternative for complex data requirements, reducing over-fetching and enabling client-driven queries.",
    ],
  },
];

export const RAG_SAMPLE_QUERY = "How does event-driven architecture work?";

export const RAG_SIMILARITY_SCORES = [
  { chunkIndex: 0, docIndex: 0, score: 0.94 },
  { chunkIndex: 1, docIndex: 0, score: 0.89 },
  { chunkIndex: 2, docIndex: 0, score: 0.82 },
  { chunkIndex: 0, docIndex: 1, score: 0.71 },
  { chunkIndex: 1, docIndex: 3, score: 0.45 },
];

export const RAG_SAMPLE_RESPONSE = {
  answer:
    "Event-driven architecture is a design pattern where services communicate through events rather than direct API calls. This approach creates loosely coupled systems that improve both scalability and fault isolation. Producers emit events without knowing which consumers will process them, allowing services to evolve independently. Common implementations use message queues like SQS or RabbitMQ for point-to-point messaging, or event streaming platforms like Kafka and Kinesis for ordered, replayable event logs [1][2][3].",
  sources: [
    "Event-Driven Architecture, chunk 1",
    "Event-Driven Architecture, chunk 2",
    "Event-Driven Architecture, chunk 3",
  ],
};

// Moderation Demo Data
export interface ModerationDemoResult {
  label: string;
  input: string;
  rules: {
    checks: { name: string; passed: boolean }[];
    flagged: boolean;
    flagReason?: string;
  };
  toxicity: {
    toxic: number;
    severe_toxic: number;
    obscene: number;
    threat: number;
    insult: number;
    identity_hate: number;
  };
  sentiment: {
    score: number;
    label: string;
  };
  decision: "APPROVE" | "FLAG_FOR_REVIEW" | "REJECT";
  confidence: number;
}

export const MODERATION_EXAMPLES: Record<string, ModerationDemoResult> = {
  clean: {
    label: "Clean",
    input:
      "I really enjoyed the new update, the interface feels much smoother now!",
    rules: {
      checks: [
        { name: "Spam pattern check", passed: true },
        { name: "Blocklist filter", passed: true },
        { name: "Intensity check", passed: true },
        { name: "URL pattern check", passed: true },
      ],
      flagged: false,
    },
    toxicity: {
      toxic: 0.02,
      severe_toxic: 0.0,
      obscene: 0.01,
      threat: 0.0,
      insult: 0.03,
      identity_hate: 0.0,
    },
    sentiment: {
      score: 0.85,
      label: "Positive",
    },
    decision: "APPROVE",
    confidence: 0.97,
  },
  borderline: {
    label: "Borderline",
    input:
      "This feature is honestly terrible, I cannot believe anyone approved this garbage.",
    rules: {
      checks: [
        { name: "Spam pattern check", passed: true },
        { name: "Blocklist filter", passed: true },
        { name: "Intensity check", passed: true },
        { name: "URL pattern check", passed: true },
      ],
      flagged: false,
    },
    toxicity: {
      toxic: 0.35,
      severe_toxic: 0.05,
      obscene: 0.08,
      threat: 0.01,
      insult: 0.42,
      identity_hate: 0.02,
    },
    sentiment: {
      score: 0.15,
      label: "Negative",
    },
    decision: "FLAG_FOR_REVIEW",
    confidence: 0.68,
  },
  toxic: {
    label: "Toxic",
    input:
      "You people are absolutely worthless, this is the worst thing I have ever seen.",
    rules: {
      checks: [
        { name: "Spam pattern check", passed: true },
        { name: "Blocklist filter", passed: true },
        { name: "Intensity check", passed: false },
        { name: "URL pattern check", passed: true },
      ],
      flagged: true,
      flagReason: "Intensity pattern detected",
    },
    toxicity: {
      toxic: 0.89,
      severe_toxic: 0.32,
      obscene: 0.45,
      threat: 0.08,
      insult: 0.91,
      identity_hate: 0.12,
    },
    sentiment: {
      score: 0.05,
      label: "Very Negative",
    },
    decision: "REJECT",
    confidence: 0.93,
  },
  spam: {
    label: "Spam",
    input:
      "FREE GIFT CARDS!!! Click here now!!! Limited time offer www dot spam dot com",
    rules: {
      checks: [
        { name: "Spam pattern check", passed: false },
        { name: "Blocklist filter", passed: true },
        { name: "Intensity check", passed: false },
        { name: "URL pattern check", passed: false },
      ],
      flagged: true,
      flagReason: "Spam patterns, all-caps, excessive punctuation",
    },
    toxicity: {
      toxic: 0.05,
      severe_toxic: 0.0,
      obscene: 0.02,
      threat: 0.0,
      insult: 0.01,
      identity_hate: 0.0,
    },
    sentiment: {
      score: 0.5,
      label: "Neutral",
    },
    decision: "REJECT",
    confidence: 0.98,
  },
};

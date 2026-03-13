// Study Guide Data for VP of Engineering & AI Interview Prep

export interface StudyTopic {
  id: string;
  title: string;
  analogy: string;
  tellTheCEO: string;
  tellTheEngineer: string;
  codeExample?: string;
  codeLanguage?: string;
  keyTalkingPoints: string[];
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  type: "multiple_choice" | "open_ended" | "scenario";
  question: string;
  options?: string[];
  correctIndex?: number;
  explanation: string;
  modelAnswer?: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: StudyTopic[];
  questions: QuizQuestion[];
}

// ---------------------------------------------------------------------------
// Category 1: AI/ML Technical Knowledge
// ---------------------------------------------------------------------------

const aiMlTopics: StudyTopic[] = [
  {
    id: "llm-fundamentals",
    title: "How LLMs Work (Transformers, Attention, Tokenization)",
    analogy:
      "Like a student who read every book in the library and can write about any topic, but sometimes confidently makes things up.",
    tellTheCEO:
      "Large language models are AI systems trained on massive amounts of text from the internet. They predict the most likely next word in a sentence, over and over, to generate paragraphs that read like a human wrote them. They are incredibly useful for drafting, summarizing, and answering questions, but they can sometimes produce convincing nonsense because they optimize for plausibility, not truth.",
    tellTheEngineer:
      "Transformers use a self-attention mechanism that lets each token attend to every other token in the context window, producing weighted representations that capture long-range dependencies. The attention score between tokens i and j is computed as softmax(QK^T / sqrt(d_k))V, where Q, K, and V are learned linear projections of the input embeddings. Tokenization (BPE, SentencePiece) converts raw text into sub-word tokens that balance vocabulary size with sequence length. During inference, autoregressive decoding generates one token at a time, sampling from a probability distribution shaped by temperature and top-p parameters. The key limitation is that these models have no grounding in external truth; they model statistical co-occurrence, not factual correctness.",
    keyTalkingPoints: [
      "Self-attention lets the model weigh relationships between every pair of tokens",
      "Tokenization converts text into sub-word units that the model can process numerically",
      "Autoregressive generation produces one token at a time, each conditioned on all prior tokens",
      "Models optimize for plausibility, which is why hallucinations occur",
      "Context window size determines how much text the model can consider at once",
    ],
  },
  {
    id: "rag-vs-finetuning",
    title: "RAG vs Fine-tuning: When to Use Which",
    analogy:
      "RAG is giving someone a reference book during an exam. Fine-tuning is studying the material beforehand.",
    tellTheCEO:
      "When we need AI to answer questions about our company's own data, we have two approaches. RAG fetches relevant documents at query time and feeds them to the model alongside the question. Fine-tuning retrains the model on our data so it internalizes the knowledge. RAG is faster to set up, cheaper to maintain, and always gives answers based on the latest documents. Fine-tuning is better when you need the model to adopt a specific voice, style, or deeply specialized reasoning pattern.",
    tellTheEngineer:
      "RAG decouples knowledge from model weights by retrieving relevant context at inference time. The pipeline embeds a query, performs approximate nearest-neighbor search against a vector store, and injects the top-k results into the prompt. This avoids catastrophic forgetting, supports real-time data updates, and keeps the model general-purpose. Fine-tuning adjusts model weights via gradient descent on domain-specific data, which is ideal for learning new output formats, domain jargon, or specialized reasoning chains. In practice, a hybrid approach works best: fine-tune a smaller model for style and format, then augment it with RAG for factual grounding. Cost-wise, RAG scales with retrieval infrastructure while fine-tuning scales with training compute and requires retraining as data changes.",
    codeExample: `from rag_core import RAGPipeline
from rag_core.embeddings import LocalEmbeddings
from rag_core.stores import InMemoryStore

# Initialize pipeline with recursive chunking
embeddings = LocalEmbeddings(model_name="all-MiniLM-L6-v2")
store = InMemoryStore(dimension=embeddings.dimension)
pipeline = RAGPipeline(
    embedding_provider=embeddings,
    store=store,
    chunk_strategy="recursive",
    chunk_size=500,
    chunk_overlap=50,
)

# Ingest documents
pipeline.ingest(documents)

# Query with retrieval + ranking
response = pipeline.query("How does event-driven architecture work?", top_k=5)
print(response.confidence_score)  # 0.87
print(response.sources)           # ["architecture.md", "aws-guide.md"]`,
    codeLanguage: "python",
    keyTalkingPoints: [
      "RAG provides up-to-date answers without retraining the model",
      "Fine-tuning is better for changing model behavior, tone, or output format",
      "RAG is more cost-effective for knowledge that changes frequently",
      "A hybrid approach (fine-tune for style, RAG for facts) often works best",
      "RAG pipelines need chunking, embedding, and retrieval infrastructure",
    ],
  },
  {
    id: "hallucination-prevention",
    title: "Detecting and Preventing Hallucinations",
    analogy:
      "Like a newspaper with fact-checkers: you need multiple verification layers before publishing.",
    tellTheCEO:
      "AI models sometimes generate answers that sound correct but are completely fabricated. We prevent this by cross-referencing the model's output against our actual source documents. If the model claims something that does not appear in the retrieved sources, we flag it or suppress it. It is the same principle as requiring journalists to cite their sources before an editor approves the story.",
    tellTheEngineer:
      "Hallucination mitigation happens at multiple layers. At retrieval time, we use confidence scores to determine whether the retrieved context is relevant enough to answer the query; if no chunk exceeds the threshold, we return 'I don't know' instead of generating. At generation time, constrained decoding and grounding prompts instruct the model to cite specific passages. Post-generation, we run entailment checks by comparing claims in the output against the retrieved chunks using NLI models. For critical applications, we add a re-ranking step that scores source-answer alignment and reject outputs below a threshold. Measuring hallucination rates requires human evaluation pipelines and automated metrics like faithfulness scores from RAGAS or TruLens.",
    keyTalkingPoints: [
      "Confidence thresholds on retrieval prevent generating answers without supporting evidence",
      "Grounding prompts instruct the model to only use information from provided context",
      "Post-generation entailment checks catch fabricated claims",
      "Returning 'I don't know' is always better than returning a hallucinated answer",
      "Human evaluation is still the gold standard for measuring hallucination rates",
    ],
  },
  {
    id: "embeddings-vector-search",
    title: "Embeddings and Vector Search",
    analogy:
      "Converting recipes into nutritional labels so you can compare similar dishes.",
    tellTheCEO:
      "Embeddings are a way of converting text into numbers that capture meaning. The sentence 'I love pizza' and 'Pizza is my favorite food' produce similar numbers even though they use different words. This lets us build search systems that understand what you mean, not just what you typed. It powers our ability to find relevant documents even when the exact keywords do not match.",
    tellTheEngineer:
      "Embedding models map text to dense vectors in a high-dimensional space where semantic similarity corresponds to geometric proximity. We use sentence transformers like all-MiniLM-L6-v2 that produce 384-dimensional vectors. At search time, we compute cosine similarity between the query embedding and all stored embeddings. For production scale, approximate nearest-neighbor algorithms (HNSW, IVF) trade a small accuracy loss for orders-of-magnitude speed gains. Pre-normalizing vectors lets us replace cosine similarity with a simple dot product, cutting computation in half. The choice of embedding model matters enormously: domain-specific fine-tuned embeddings outperform general-purpose ones for specialized retrieval tasks.",
    codeExample: `def search(self, query_embedding: np.ndarray, top_k: int = 5) -> list[dict]:
    query_norm = self._normalize(query_embedding.astype(np.float32))
    # Cosine similarity via dot product (vectors are pre-normalized)
    scores = self._embeddings @ query_norm
    k = min(top_k, len(self._ids))
    top_indices = np.argsort(scores)[::-1][:k]
    return [
        {"id": self._ids[idx], "score": float(scores[idx]),
         "metadata": self._metadatas[idx], "document": self._documents[idx]}
        for idx in top_indices
    ]`,
    codeLanguage: "python",
    keyTalkingPoints: [
      "Embeddings capture semantic meaning, enabling search by concept rather than keywords",
      "Pre-normalizing vectors allows fast dot-product similarity instead of full cosine computation",
      "Approximate nearest-neighbor indexes (HNSW) make vector search practical at scale",
      "Embedding model choice directly impacts retrieval quality",
      "384-dimensional vectors from MiniLM balance quality and performance",
    ],
  },
  {
    id: "content-moderation",
    title: "Content Moderation at Scale",
    analogy:
      "Like airport security with multiple checkpoints: quick ID check, bag scan, then manual inspection if flagged.",
    tellTheCEO:
      "Content moderation keeps harmful material off our platform. We built an ensemble system with three layers: a fast rule-based filter catches obvious violations, a machine learning model scores toxicity, and a sentiment analyzer provides additional signal. Most content passes through instantly. Only edge cases (roughly 10-15% of flagged content) go to human reviewers. This approach lets us moderate millions of messages per day while keeping human review costs manageable.",
    tellTheEngineer:
      "Our moderation pipeline uses a weighted ensemble of three classifiers. The rule-based layer (weight 0.4) handles deterministic patterns like blocklists, regex matches, and known attack vectors. The toxicity model (weight 0.4) is a fine-tuned transformer that scores content on a 0-1 scale. The sentiment layer (weight 0.2) provides a supplementary signal to catch content that is technically non-toxic but contextually harmful. The weighted score maps to three decision buckets via configurable thresholds: auto-approve below 0.3, auto-reject above 0.7, and flag for human review in between. This threshold design optimizes for high precision on auto-reject (we never want to wrongly ban users) while keeping the human review queue at a manageable volume.",
    codeExample: `from modguard import ModerationPipeline, PipelineConfig
from modguard.config import ClassifierWeights, ThresholdConfig

config = PipelineConfig(
    weights=ClassifierWeights(rules=0.4, toxicity=0.4, sentiment=0.2),
    thresholds=ThresholdConfig(approve_below=0.3, reject_above=0.7),
    enable_toxicity=True,
    enable_sentiment=True,
)
pipeline = ModerationPipeline(config)

result = pipeline.moderate("Your text here")
print(result.decision)     # APPROVE | FLAG_FOR_REVIEW | REJECT
print(result.confidence)   # 0.94
print(result.explanation)  # "Approved: low toxicity (0.05), neutral sentiment"`,
    codeLanguage: "python",
    keyTalkingPoints: [
      "Ensemble approach combines deterministic rules with ML for reliability",
      "Three-tier decision system: auto-approve, flag for review, auto-reject",
      "Weighted scoring lets you tune the influence of each classifier independently",
      "Thresholds are configurable per deployment to balance false positives and false negatives",
      "Human review is reserved for ambiguous cases, keeping costs proportional to edge cases",
    ],
  },
  {
    id: "ai-evaluation-metrics",
    title: "AI Evaluation Metrics",
    analogy:
      "Like grading a student: you need multiple rubrics (accuracy, creativity, consistency) not just one test.",
    tellTheCEO:
      "Measuring AI quality requires more than a single number. We track several metrics: how often the AI gives correct answers (accuracy), how well it retrieves the right source documents (retrieval precision), whether users find the responses helpful (satisfaction), and how frequently it invents facts (hallucination rate). Just like you would not evaluate a sales team on one metric alone, AI evaluation needs a balanced scorecard.",
    tellTheEngineer:
      "For RAG systems, the core metrics are context precision (fraction of retrieved chunks that are relevant), context recall (fraction of relevant chunks that were retrieved), faithfulness (whether the generated answer is supported by the retrieved context), and answer relevancy (whether the answer addresses the question). We use frameworks like RAGAS for automated evaluation against labeled datasets. For classification tasks like content moderation, we track precision, recall, F1, and AUC-ROC across each decision class. Latency percentiles (p50, p95, p99) and cost-per-query round out the operational metrics. The key insight is that offline metrics (evaluated on test sets) must be complemented by online metrics (A/B tests, user feedback) because real-world distribution shift can degrade performance silently.",
    keyTalkingPoints: [
      "RAG evaluation requires both retrieval metrics and generation metrics",
      "Faithfulness measures whether the answer is grounded in retrieved context",
      "Offline evaluation catches regressions; online evaluation catches distribution shift",
      "Latency and cost metrics are just as important as quality metrics for production systems",
      "Human evaluation remains essential for subjective quality dimensions",
    ],
  },
  {
    id: "cost-optimization",
    title: "Cost Optimization for AI Inference",
    analogy:
      "Like running a restaurant kitchen: batch orders, right-size portions, and don't fire up the industrial oven for a single cookie.",
    tellTheCEO:
      "AI inference costs can spiral quickly if you run every request through the largest, most expensive model. We save money by routing simple questions to smaller, cheaper models and only using the powerful (expensive) models for complex tasks. We also batch requests together, cache frequent answers, and use quantized models that are slightly less precise but dramatically cheaper to run. These optimizations cut our inference costs by 40-60% without meaningful quality loss.",
    tellTheEngineer:
      "Cost optimization starts with model selection: use the smallest model that meets quality requirements for each task. Implement a routing layer that classifies query complexity and dispatches to the appropriate model tier. Batch inference with dynamic batching reduces per-request overhead. KV-cache reuse across similar prompts avoids redundant computation. Model quantization (INT8, INT4, GPTQ) reduces memory footprint and increases throughput by 2-4x with minimal quality degradation. Semantic caching stores embeddings of frequent queries and returns cached results when a new query falls within a similarity threshold. For RAG specifically, reducing the number of retrieved chunks and using a re-ranker to select only the most relevant ones shrinks the prompt, directly reducing token costs.",
    keyTalkingPoints: [
      "Route queries to the cheapest model that can handle them",
      "Quantization (INT8/INT4) reduces cost 2-4x with minimal quality loss",
      "Semantic caching avoids redundant inference for similar queries",
      "Fewer, better-ranked retrieval chunks reduce prompt token costs",
      "Dynamic batching improves GPU utilization and throughput",
    ],
  },
  {
    id: "ai-governance",
    title: "AI Governance and Responsible AI",
    analogy:
      "Like building codes for houses: they slow construction slightly but prevent catastrophic failures.",
    tellTheCEO:
      "AI governance is the set of policies, processes, and guardrails that ensure our AI systems are fair, transparent, and safe. This includes bias testing before launch, ongoing monitoring for harmful outputs, clear documentation of what each model can and cannot do, and human oversight for high-stakes decisions. Strong governance builds customer trust, reduces legal risk, and positions us ahead of incoming regulation.",
    tellTheEngineer:
      "A governance framework covers the full ML lifecycle. Pre-deployment: bias audits across demographic slices, red-team testing for adversarial inputs, and model cards documenting training data, limitations, and intended use. Runtime: monitoring for distribution drift, toxicity spikes, and anomalous outputs with automated alerting. We enforce content policies through our moderation pipeline with configurable thresholds that let policy teams adjust sensitivity without engineering changes. Data governance includes PII detection and redaction in training data, data provenance tracking, and retention policies. For regulatory compliance (EU AI Act, state-level laws), we maintain an AI system registry with risk classifications and impact assessments for each model in production.",
    keyTalkingPoints: [
      "Bias audits must happen before deployment and continuously in production",
      "Model cards document capabilities, limitations, and intended use for each system",
      "Configurable thresholds let policy teams adjust guardrails without code changes",
      "PII detection and redaction are essential for training data governance",
      "An AI system registry helps track risk classifications for regulatory compliance",
    ],
  },
];

const aiMlQuestions: QuizQuestion[] = [
  {
    id: "aiml-q1",
    topicId: "llm-fundamentals",
    type: "multiple_choice",
    question:
      "What is the primary mechanism that allows Transformer models to capture long-range dependencies in text?",
    options: [
      "Recurrent hidden states passed sequentially between tokens",
      "Self-attention that lets each token attend to every other token",
      "Convolutional filters that slide across the token sequence",
      "A fixed lookup table mapping each token to a position",
    ],
    correctIndex: 1,
    explanation:
      "Self-attention computes a weighted score between every pair of tokens, allowing the model to capture relationships regardless of distance in the sequence. Unlike recurrent models, attention processes all positions in parallel.",
  },
  {
    id: "aiml-q2",
    topicId: "llm-fundamentals",
    type: "open_ended",
    question:
      "A board member asks: 'Why does our AI chatbot sometimes give confident but wrong answers?' Explain this in business terms and describe what safeguards you would put in place.",
    explanation:
      "This tests your ability to explain hallucinations to a non-technical stakeholder and propose concrete mitigations.",
    modelAnswer:
      "The model is trained to produce plausible-sounding text, not to verify facts. It predicts the most likely next words based on patterns it learned, so it can generate statements that sound authoritative but have no factual basis. To address this, we implement three safeguards: first, we use retrieval-augmented generation to ground every answer in our actual documents; second, we add confidence scoring so the system says 'I am not sure' when evidence is weak; third, we run automated fact-checking that compares claims in the output against the retrieved sources and suppresses unsupported statements.",
  },
  {
    id: "aiml-q3",
    topicId: "rag-vs-finetuning",
    type: "multiple_choice",
    question:
      "When should you prefer RAG over fine-tuning for a knowledge-intensive application?",
    options: [
      "When you need the model to adopt a specific writing style",
      "When the underlying knowledge base changes frequently",
      "When you have unlimited compute budget for training",
      "When response latency is the only concern",
    ],
    correctIndex: 1,
    explanation:
      "RAG excels when knowledge changes frequently because you update the document store rather than retraining the model. Fine-tuning bakes knowledge into model weights, requiring expensive retraining to update.",
  },
  {
    id: "aiml-q4",
    topicId: "rag-vs-finetuning",
    type: "scenario",
    question:
      "Your company has a 50,000-page internal knowledge base that gets updated weekly. The CEO wants employees to be able to ask questions and get accurate answers. The CTO suggests fine-tuning GPT-4 on the entire knowledge base. What do you recommend and why?",
    explanation:
      "This scenario tests whether you understand the practical tradeoffs between RAG and fine-tuning for enterprise knowledge management.",
    modelAnswer:
      "I would recommend RAG over fine-tuning for three reasons. First, the knowledge base changes weekly, and fine-tuning requires expensive retraining on every update. With RAG, we simply re-index changed documents. Second, RAG provides source attribution so employees can verify answers against the original document, which builds trust. Third, fine-tuning on 50K pages risks the model memorizing sensitive information that could leak in unrelated queries. Our rag-core pipeline supports this pattern: we chunk the documents recursively, embed them with a sentence transformer, store them in a vector database, and retrieve the top-k most relevant chunks at query time. The confidence score tells us whether the retrieved context is strong enough to answer reliably.",
  },
  {
    id: "aiml-q5",
    topicId: "hallucination-prevention",
    type: "multiple_choice",
    question:
      "Which approach is MOST effective at preventing hallucinations in a production RAG system?",
    options: [
      "Increasing the model's temperature parameter to explore more options",
      "Using a larger context window so the model has more information",
      "Setting a confidence threshold and returning 'I don't know' when evidence is insufficient",
      "Training the model on more data to improve its general knowledge",
    ],
    correctIndex: 2,
    explanation:
      "Confidence thresholds prevent the model from generating answers when retrieved evidence is weak. Increasing temperature actually increases randomness and hallucination risk. A larger context window helps but does not prevent the model from ignoring it.",
  },
  {
    id: "aiml-q6",
    topicId: "embeddings-vector-search",
    type: "multiple_choice",
    question:
      "In the rag-core vector search implementation, why are embeddings pre-normalized before storage?",
    options: [
      "To reduce storage size by eliminating redundant dimensions",
      "To enable cosine similarity computation via a simple dot product",
      "To ensure all embeddings have the same number of dimensions",
      "To prevent overflow errors during matrix multiplication",
    ],
    correctIndex: 1,
    explanation:
      "When vectors are normalized to unit length, cosine similarity reduces to the dot product: cos(a,b) = (a dot b) / (||a|| * ||b||), and when ||a|| = ||b|| = 1, this simplifies to just a dot b. This cuts computation in half.",
  },
  {
    id: "aiml-q7",
    topicId: "embeddings-vector-search",
    type: "open_ended",
    question:
      "Explain how you would scale vector search from 100K documents to 100M documents while keeping query latency under 50ms.",
    explanation:
      "This tests your understanding of approximate nearest-neighbor algorithms and production vector search infrastructure.",
    modelAnswer:
      "At 100K documents, brute-force search with pre-normalized dot products is fast enough. At 100M, we need approximate nearest-neighbor (ANN) algorithms. I would use HNSW (Hierarchical Navigable Small World) indexes, which build a multi-layer graph structure that enables sub-linear search time. We would deploy a dedicated vector database like Pinecone, Weaviate, or Qdrant that handles sharding across multiple nodes. The index partitions documents into clusters, and at query time we only search the most promising clusters. To stay under 50ms, we also add a result cache for frequent queries, use quantized vectors (product quantization or scalar quantization) to reduce memory bandwidth, and shard the index across multiple replicas for parallel search.",
  },
  {
    id: "aiml-q8",
    topicId: "content-moderation",
    type: "multiple_choice",
    question:
      "In the modguard ensemble pipeline, why does the rule-based classifier receive the same weight (0.4) as the toxicity model?",
    options: [
      "Rule-based systems are always more accurate than ML models",
      "Rules are deterministic and always reliable, making them a strong anchor for the ensemble",
      "ML models are too slow to be given higher weight",
      "Regulatory requirements mandate equal weighting between rule-based and ML systems",
    ],
    correctIndex: 1,
    explanation:
      "The rule-based layer (weight 0.4) is deterministic and always reliable for known patterns. It provides a stable anchor for the ensemble. The toxicity model (also 0.4) adds ML-based detection for novel content. Sentiment (0.2) is supplementary.",
  },
  {
    id: "aiml-q9",
    topicId: "content-moderation",
    type: "scenario",
    question:
      "Your platform is launching in a new market and users are posting content in a language your toxicity model was not trained on. The moderation team reports a spike in false negatives (harmful content getting through). How do you handle this?",
    explanation:
      "This tests your ability to handle a real-world content moderation failure with a practical, layered response.",
    modelAnswer:
      "In the short term, I would lower the auto-approve threshold from 0.3 to 0.15 for content in the new language, routing more content to human review while we build better coverage. I would also expand the rule-based layer with language-specific blocklists and regex patterns for common harmful phrases. In the medium term, I would fine-tune the toxicity model on labeled data from the new language, sourced from our human review queue. The modguard architecture supports this because the weights and thresholds are configurable per deployment. Long term, I would invest in multilingual toxicity models and build a feedback loop where human reviewer decisions automatically contribute to the training dataset.",
  },
  {
    id: "aiml-q10",
    topicId: "ai-evaluation-metrics",
    type: "multiple_choice",
    question:
      "Which metric specifically measures whether a RAG system's generated answer is supported by the retrieved context?",
    options: [
      "Context precision",
      "Answer relevancy",
      "Faithfulness",
      "Context recall",
    ],
    correctIndex: 2,
    explanation:
      "Faithfulness measures whether claims in the generated answer are grounded in the retrieved context. Context precision measures relevance of retrieved chunks. Answer relevancy measures whether the answer addresses the question. Context recall measures completeness of retrieval.",
  },
  {
    id: "aiml-q11",
    topicId: "ai-evaluation-metrics",
    type: "open_ended",
    question:
      "Design an evaluation framework for a customer-facing RAG chatbot that handles product support questions. What metrics would you track, and how would you collect ground truth?",
    explanation:
      "This tests your ability to design a comprehensive evaluation strategy that covers both automated and human-in-the-loop measurement.",
    modelAnswer:
      "I would track four categories of metrics. Retrieval quality: context precision and recall measured against a labeled test set of 500+ question-answer pairs where human annotators identified the correct source documents. Generation quality: faithfulness (is the answer supported by sources?) and answer relevancy (does it address the question?), measured automatically with RAGAS and validated by weekly human evaluation samples. User satisfaction: thumbs up/down on each response, escalation rate to human agents, and resolution rate. Operational: p50/p95 latency, cost per query, and error rate. Ground truth comes from three sources: a curated test set maintained by the support team, implicit feedback from user interactions (thumbs up/down, follow-up questions), and quarterly human evaluation where annotators grade a random sample of 200 conversations.",
  },
  {
    id: "aiml-q12",
    topicId: "cost-optimization",
    type: "multiple_choice",
    question:
      "Which cost optimization technique for AI inference involves storing embeddings of frequent queries and returning cached results for similar new queries?",
    options: [
      "Model quantization",
      "Dynamic batching",
      "Semantic caching",
      "Knowledge distillation",
    ],
    correctIndex: 2,
    explanation:
      "Semantic caching embeds incoming queries and checks if a similar query (above a similarity threshold) has been answered recently. If so, it returns the cached result, avoiding an expensive model inference call entirely.",
  },
  {
    id: "aiml-q13",
    topicId: "cost-optimization",
    type: "scenario",
    question:
      "Your AI inference costs have tripled over the last quarter due to increased usage. The CFO wants a 50% cost reduction without degrading user experience. What is your plan?",
    explanation:
      "This tests your ability to propose a concrete, phased cost optimization strategy.",
    modelAnswer:
      "I would attack this in three phases. Phase 1 (immediate, 1-2 weeks): implement semantic caching for the top 100 most frequent query patterns, which typically account for 30-40% of traffic. This alone could cut costs 25-30%. Phase 2 (2-4 weeks): build a query complexity router that sends simple factual questions to a smaller, cheaper model (like GPT-3.5 or a fine-tuned smaller model) and reserves the expensive model for complex reasoning tasks. About 60% of queries are simple enough for the cheaper tier. Phase 3 (4-8 weeks): apply INT8 quantization to our self-hosted models, reducing per-request compute by 2x with minimal quality loss. Combined, these three phases would achieve 50-60% cost reduction. I would validate each phase with A/B tests comparing response quality metrics before and after.",
  },
  {
    id: "aiml-q14",
    topicId: "ai-governance",
    type: "multiple_choice",
    question:
      "What is the primary purpose of a 'model card' in AI governance?",
    options: [
      "To store the model's API credentials securely",
      "To document training data, limitations, intended use, and evaluation results",
      "To track the model's inference cost over time",
      "To provide a GUI for non-technical users to interact with the model",
    ],
    correctIndex: 1,
    explanation:
      "Model cards are standardized documentation that describes a model's training data, intended use cases, limitations, ethical considerations, and evaluation results. They ensure transparency and help stakeholders make informed decisions about model deployment.",
  },
  {
    id: "aiml-q15",
    topicId: "ai-governance",
    type: "scenario",
    question:
      "Your team discovers that the content moderation model has a 15% higher false-positive rate for content written in African American Vernacular English (AAVE). How do you address this?",
    explanation:
      "This tests your approach to identifying and mitigating bias in AI systems.",
    modelAnswer:
      "First, I would immediately adjust the moderation thresholds to route more AAVE content to human review rather than auto-rejecting, preventing ongoing harm while we fix the root cause. Second, I would audit the training data to identify representation gaps and labeling inconsistencies for AAVE content. Third, I would augment the training set with properly labeled AAVE examples and retrain the toxicity model, then validate with a dedicated evaluation set that measures performance across linguistic demographics. Fourth, I would implement ongoing bias monitoring by slicing our metrics across demographic and linguistic categories and setting up automated alerts when any group's false-positive rate exceeds baseline by more than 5%. Finally, I would document the incident, the root cause, and the remediation in our model card and present findings to the broader team to prevent similar issues in future models.",
  },
];

// ---------------------------------------------------------------------------
// Category 2: Engineering Leadership
// ---------------------------------------------------------------------------

const leadershipTopics: StudyTopic[] = [
  {
    id: "scaling-engineering",
    title: "Scaling Engineering from 10 to 100",
    analogy:
      "Like growing from a food truck to a restaurant chain: processes that work at 5 people break at 50.",
    tellTheCEO:
      "When an engineering team grows beyond 10 people, the informal processes that worked before start breaking. People step on each other's code, priorities get confused, and new hires take months to become productive. Scaling requires investing in clear team boundaries, standardized processes, and self-service tooling. It is like opening new restaurant locations: you need recipes, training manuals, and supply chain systems that did not matter when you had one kitchen.",
    tellTheEngineer:
      "Scaling requires structural changes at three levels. Organization: decompose into cross-functional squads (5-8 people) aligned to product domains, each with clear ownership boundaries and a defined interface contract with other teams. Process: implement trunk-based development with feature flags, automated testing gates in CI/CD, and architecture decision records (ADRs) for significant technical choices. Tooling: invest in developer experience (internal platforms, service templates, self-service environments) so teams can ship independently without bottlenecking on shared infrastructure. The anti-pattern to avoid is adding process without adding enabling tooling. Every new process should be accompanied by automation that makes following it the path of least resistance.",
    keyTalkingPoints: [
      "Cross-functional squads with clear ownership prevent coordination bottlenecks",
      "Feature flags decouple deployment from release, enabling independent team cadences",
      "Architecture Decision Records create institutional memory for technical choices",
      "Internal developer platforms reduce time-to-productivity for new hires",
      "Every new process needs enabling tooling, or it becomes bureaucracy",
    ],
  },
  {
    id: "build-vs-buy",
    title: "Build vs Buy for AI Infrastructure",
    analogy:
      "Like deciding whether to build a custom home or buy and renovate.",
    tellTheCEO:
      "For every AI capability we need, we choose between building it ourselves or purchasing an existing solution. Building gives us full control and competitive differentiation, but costs more time and engineering effort. Buying gets us to market faster, but we depend on a vendor and lose customizability. The right answer depends on whether the capability is core to our competitive advantage. We build what differentiates us and buy everything else.",
    tellTheEngineer:
      "The build-vs-buy framework I use has four dimensions. Strategic value: if it is core IP (our moderation pipeline, recommendation engine), we build to maintain competitive moat and full control. Complexity: if the problem is well-solved by commodity solutions (auth, logging, monitoring), we buy. Time-to-market: if speed matters more than customization, start with a vendor and migrate later if needed. Total cost of ownership: vendor costs compound with usage, while build costs are front-loaded but scale better. For AI specifically, I lean toward building the orchestration layer (like our rag-core pipeline) that integrates various components, while buying individual components (embedding models, vector databases, LLM APIs) that are commoditized. This gives us control over the critical path while leveraging best-in-class components.",
    keyTalkingPoints: [
      "Build what differentiates you, buy what is commoditized",
      "Own the orchestration layer, vendor the individual components",
      "Vendor lock-in risk increases with usage; build migration plans early",
      "Total cost of ownership includes engineering time, not just license fees",
      "The decision should be revisited as the market and your scale evolve",
    ],
  },
  {
    id: "developer-productivity",
    title: "Measuring Developer Productivity",
    analogy:
      "Like measuring a chef's quality: counting dishes per hour misses the point entirely.",
    tellTheCEO:
      "Measuring developer productivity is notoriously difficult because the most valuable work (architecture decisions, mentoring, debugging complex issues) is invisible in simple metrics like lines of code or tickets closed. Instead, we measure outcomes: how quickly teams can ship a new feature from idea to production (cycle time), how stable our releases are (change failure rate), and how satisfied developers are with their tools and processes. Happy, unblocked developers ship better products faster.",
    tellTheEngineer:
      "I use a combination of DORA metrics and developer experience surveys. DORA gives us four measurable signals: deployment frequency, lead time for changes, change failure rate, and mean time to recovery. These are outcome metrics, not activity metrics, so they resist gaming. I complement DORA with quarterly developer experience surveys that measure friction points: how long does environment setup take, how painful are code reviews, how often do flaky tests block deployments. The key is to never use these metrics to compare individual developers. They are team-level and system-level diagnostics. When cycle time increases, the question is not 'who is slow?' but 'what systemic bottleneck appeared?' Common culprits: slow CI pipelines, review bottlenecks, unclear requirements, or excessive context switching.",
    keyTalkingPoints: [
      "DORA metrics (deployment frequency, lead time, failure rate, recovery time) measure outcomes, not activity",
      "Developer experience surveys catch friction points that metrics miss",
      "Never use productivity metrics to compare individual developers",
      "Cycle time increases usually signal systemic bottlenecks, not individual performance issues",
      "The goal is to remove obstacles, not to squeeze more output from people",
    ],
  },
  {
    id: "tech-debt",
    title: "Technical Debt Management",
    analogy:
      "Like home maintenance: skip the roof repair and eventually your whole house has water damage.",
    tellTheCEO:
      "Technical debt is the accumulation of shortcuts and outdated code that slows future development. Like financial debt, a little is fine if managed intentionally, but uncontrolled debt compounds. Teams that ignore tech debt gradually slow to a crawl because every new feature requires working around old problems. We manage it by dedicating 15-20% of each sprint to debt reduction, prioritizing items that block the most future work.",
    tellTheEngineer:
      "I categorize tech debt into four quadrants: deliberate/prudent (we chose to ship fast and will refactor), deliberate/reckless (we cut corners knowing the risks), inadvertent/prudent (we learned a better approach after shipping), and inadvertent/reckless (we did not know enough to do it right). Each quadrant gets different treatment. For management, I maintain a tech debt registry where teams document known debt items with impact scores (how much does this slow us down?) and effort estimates. We allocate 15-20% of sprint capacity to debt reduction, prioritized by impact-to-effort ratio. For architectural debt, I use the strangler fig pattern: build the new system alongside the old one, gradually migrate traffic, and decommission the legacy system when migration is complete. The most important cultural practice is making tech debt visible: if leadership never sees the debt, they cannot make informed tradeoff decisions.",
    keyTalkingPoints: [
      "Categorize debt into four quadrants to determine appropriate treatment",
      "Maintain a tech debt registry with impact scores and effort estimates",
      "Allocate 15-20% of sprint capacity to continuous debt reduction",
      "Strangler fig pattern for large architectural migrations",
      "Make debt visible to leadership so they can make informed tradeoff decisions",
    ],
  },
  {
    id: "incident-management",
    title: "Incident Management and Reliability",
    analogy:
      "Like a hospital ER: triage fast, treat the critical, do a postmortem to prevent repeats.",
    tellTheCEO:
      "When our systems go down, every minute costs money and erodes customer trust. We handle incidents with a clear process: detect the problem automatically (monitoring and alerts), assemble the right people immediately (on-call rotation), fix the immediate issue (restore service), and then investigate the root cause to prevent it from happening again (blameless postmortem). The goal is not to prevent all incidents, which is impossible, but to detect them fast, resolve them quickly, and learn from every one.",
    tellTheEngineer:
      "Our incident management framework has four phases. Detection: structured logging, distributed tracing, and anomaly-based alerting with PagerDuty integration. We aim for automated detection before customer reports (we target under 5 minutes to alert). Response: on-call engineers follow runbooks with pre-defined escalation paths. An incident commander coordinates communication while responders debug. We use severity levels (SEV1-4) to calibrate response urgency. Resolution: the priority is always to restore service first, even with a temporary workaround. Root cause analysis happens after the fire is out. Prevention: blameless postmortems within 48 hours, focused on systemic factors (missing monitoring, unclear ownership, inadequate testing) rather than individual blame. Action items are tracked to completion with owners and deadlines. We measure MTTR (mean time to recovery) and track incident recurrence to verify our postmortem actions are effective.",
    keyTalkingPoints: [
      "Automated detection should fire before customers report issues",
      "Incident commanders manage communication while responders debug",
      "Restore service first, even with workarounds; root cause analysis comes after",
      "Blameless postmortems focus on systemic factors, not individual blame",
      "Track MTTR and incident recurrence to measure process effectiveness",
    ],
  },
];

const leadershipQuestions: QuizQuestion[] = [
  {
    id: "lead-q1",
    topicId: "scaling-engineering",
    type: "multiple_choice",
    question:
      "When scaling from 10 to 50 engineers, what is the FIRST structural change a VP of Engineering should make?",
    options: [
      "Hire a dedicated QA team to handle all testing",
      "Decompose into cross-functional squads with clear ownership boundaries",
      "Implement a strict code review policy requiring 3 approvals",
      "Migrate the entire codebase to microservices",
    ],
    correctIndex: 1,
    explanation:
      "Cross-functional squads with clear ownership boundaries are the foundation for scaling. Without them, coordination overhead grows quadratically with team size. QA teams, review policies, and architecture choices are secondary to organizational structure.",
  },
  {
    id: "lead-q2",
    topicId: "scaling-engineering",
    type: "scenario",
    question:
      "You just joined a 40-person engineering org where there are no defined team boundaries. Engineers work on whatever seems most urgent. Deployments require a 'deployment czar' who manually coordinates releases. What changes do you make in your first 90 days?",
    explanation:
      "This tests your ability to prioritize structural improvements in a growing organization.",
    modelAnswer:
      "In the first 30 days, I would observe and map the actual dependency graph: who talks to whom, which code areas have implicit ownership, and where coordination bottlenecks exist. Days 30-60, I would define 5-6 cross-functional squads aligned to product domains, each owning a clear slice of the codebase and product surface. Each squad gets an engineering lead responsible for technical decisions within their domain. Days 60-90, I would replace the deployment czar with CI/CD automation and feature flags so each squad can deploy independently. The deployment czar role becomes a platform engineering function that maintains the deployment infrastructure rather than gatekeeping individual releases. Throughout, I would document decisions in ADRs and communicate the rationale transparently to the team.",
  },
  {
    id: "lead-q3",
    topicId: "build-vs-buy",
    type: "multiple_choice",
    question:
      "Which criterion should weigh MOST heavily in a build-vs-buy decision for AI infrastructure?",
    options: [
      "The vendor's pricing model",
      "Whether the capability is core to your competitive advantage",
      "How many engineers are available to build it",
      "The vendor's market share and popularity",
    ],
    correctIndex: 1,
    explanation:
      "Strategic differentiation is the primary driver. If a capability is core to your competitive advantage, you need full control and should build. Commoditized capabilities should be purchased. Pricing, team size, and vendor popularity are secondary factors.",
  },
  {
    id: "lead-q4",
    topicId: "build-vs-buy",
    type: "open_ended",
    question:
      "Your CEO wants to add a conversational AI assistant to the product in 3 months. Your team has never built one. Walk through your build-vs-buy analysis.",
    explanation:
      "This tests your ability to apply the build-vs-buy framework to a concrete, time-constrained scenario.",
    modelAnswer:
      "I would break the assistant into components and evaluate each independently. LLM API: buy (OpenAI or Anthropic). Building a foundation model is not our competitive advantage and would take years. Retrieval pipeline: build using our rag-core library. This is where we differentiate because retrieval quality determines answer quality, and we need full control over chunking, ranking, and confidence thresholds. Vector database: buy (Pinecone or Weaviate). This is commodity infrastructure. Conversation UI: build if our product has unique UX requirements, or buy a widget (Intercom, custom React component) if standard chat is sufficient. Evaluation and monitoring: build the evaluation framework since we need custom metrics aligned to our use case, but use existing logging infrastructure (Datadog, LangSmith). This hybrid approach gets us to market in 3 months while maintaining control over the components that determine quality.",
  },
  {
    id: "lead-q5",
    topicId: "developer-productivity",
    type: "multiple_choice",
    question: "Which of the following is a DORA metric?",
    options: [
      "Lines of code per developer per week",
      "Number of pull requests merged per sprint",
      "Lead time for changes (commit to production)",
      "Story points completed per sprint",
    ],
    correctIndex: 2,
    explanation:
      "The four DORA metrics are: deployment frequency, lead time for changes, change failure rate, and mean time to recovery. These measure delivery outcomes, not activity. Lines of code, PR count, and story points are activity metrics that can be gamed.",
  },
  {
    id: "lead-q6",
    topicId: "developer-productivity",
    type: "scenario",
    question:
      "Your engineering team's deployment frequency has dropped from daily to weekly over the last quarter. The team says they are 'being more careful.' What do you investigate?",
    explanation:
      "This tests your ability to diagnose the root cause of a delivery slowdown rather than accepting surface-level explanations.",
    modelAnswer:
      "I would investigate four areas. CI/CD pipeline: has build time increased? Are tests flakier? A slow or unreliable pipeline discourages frequent deployments. Code review bottlenecks: are PRs sitting in review for days? Are there too few reviewers for the team size? Psychological safety: did a recent production incident make people afraid to deploy? 'Being more careful' can be code for 'we got burned and now we are scared.' Feature size: are stories getting larger? Bigger features mean longer branches, which mean less frequent deploys. The fix depends on the root cause. If it is pipeline speed, invest in build optimization. If it is review bottlenecks, implement PR size limits and pair programming. If it is fear after an incident, improve test coverage and invest in feature flags and canary deployments so shipping feels safe again.",
  },
  {
    id: "lead-q7",
    topicId: "tech-debt",
    type: "multiple_choice",
    question:
      "What percentage of sprint capacity should typically be allocated to technical debt reduction?",
    options: [
      "0% (debt should be addressed in dedicated 'tech debt sprints')",
      "5% (minimal maintenance only)",
      "15-20% (continuous, prioritized by impact)",
      "50% (debt should always be the top priority)",
    ],
    correctIndex: 2,
    explanation:
      "Allocating 15-20% of sprint capacity ensures continuous debt reduction without stalling feature development. Dedicated 'tech debt sprints' create feast-or-famine cycles and are easily deprioritized by business pressure.",
  },
  {
    id: "lead-q8",
    topicId: "tech-debt",
    type: "open_ended",
    question:
      "A product manager complains that engineering is spending too much time on 'invisible work' instead of features. How do you make the case for continued tech debt investment?",
    explanation:
      "This tests your ability to communicate engineering priorities to non-technical stakeholders.",
    modelAnswer:
      "I would make the case with data and business impact. First, I would show cycle time trends: 'Six months ago, a typical feature took 2 weeks. Now it takes 4 weeks because engineers spend half their time working around legacy issues.' Second, I would quantify the debt: 'We have 47 documented debt items. The top 10 slow down every feature that touches our payment system by 3-5 days each.' Third, I would frame it as investment: 'Spending 20% on debt now saves us 40% in slower delivery later. It is like maintaining a car: oil changes are invisible but skipping them leads to engine failure.' Fourth, I would offer visibility: 'I will tag every debt item with the features it blocks so you can see exactly which future work gets easier with each debt reduction. We can prioritize debt items that unblock the features you care about most.'",
  },
  {
    id: "lead-q9",
    topicId: "incident-management",
    type: "multiple_choice",
    question:
      "What is the primary goal during the response phase of an incident?",
    options: [
      "Identify the root cause of the problem",
      "Determine which engineer introduced the bug",
      "Restore service as quickly as possible, even with workarounds",
      "Document the incident timeline for the postmortem",
    ],
    correctIndex: 2,
    explanation:
      "During an active incident, the priority is restoring service. Root cause analysis, timeline documentation, and accountability discussions happen in the postmortem after service is restored. Every minute of downtime has a measurable business cost.",
  },
  {
    id: "lead-q10",
    topicId: "incident-management",
    type: "scenario",
    question:
      "A SEV1 incident took 4 hours to resolve. During the postmortem, you discover that the on-call engineer spent the first 90 minutes trying to debug alone before escalating. How do you improve the process?",
    explanation:
      "This tests your ability to design systemic improvements rather than blaming individuals.",
    modelAnswer:
      "This is a systemic problem, not an individual one. I would make three changes. First, implement automatic escalation timers: if a SEV1 is not acknowledged within 15 minutes or mitigated within 30 minutes, it automatically escalates to the engineering lead and pages additional responders. Second, update the runbooks with clear escalation triggers: 'If you cannot identify the root cause within 20 minutes, escalate immediately. There is no penalty for escalating early.' Third, run incident response drills quarterly so engineers practice escalating in a low-stakes environment. The cultural message needs to be: escalating early is a sign of good judgment, not weakness. I would also review our on-call training to ensure every engineer knows the escalation path and has practiced it before their first real on-call rotation.",
  },
  {
    id: "lead-q11",
    topicId: "scaling-engineering",
    type: "open_ended",
    question:
      "How do you maintain engineering culture and technical excellence as a team grows from 15 to 60 people in one year?",
    explanation:
      "This tests your approach to preserving quality and culture during rapid scaling.",
    modelAnswer:
      "Culture preservation during rapid growth requires intentional systems, not just hope. I focus on four pillars. Hiring bar: every candidate is evaluated by at least two senior engineers against a consistent rubric. We never lower the bar to fill seats faster. Technical practices: establish non-negotiable standards (code review, testing, documentation) and encode them in CI/CD so compliance is automated, not policed. Knowledge sharing: weekly tech talks, architecture review boards for cross-cutting decisions, and a mentorship program pairing senior engineers with new hires. Values documentation: write down the engineering principles that were previously implicit (we ship small and often, we own what we build, we write tests). New hires cannot absorb unwritten culture through osmosis when the team triples in size. The key insight is that what works through informal communication at 15 people must be systematized at 60, but the systems should enable the culture rather than replace it.",
  },
  {
    id: "lead-q12",
    topicId: "developer-productivity",
    type: "open_ended",
    question:
      "Your team's MTTR (mean time to recovery) has increased from 30 minutes to 3 hours over the past quarter. What is your investigation plan?",
    explanation:
      "This tests your ability to systematically diagnose a reliability degradation.",
    modelAnswer:
      "I would analyze recent incidents across four dimensions. Detection time: are we finding problems slower? Check if alerting thresholds have drifted or if new services lack monitoring coverage. Diagnosis time: are problems harder to debug? Check if observability (logging, tracing, dashboards) has kept pace with system complexity. Runbook quality: are runbooks outdated for recent architecture changes? A common cause of slow MTTR is engineers following stale procedures. Knowledge concentration: has on-call rotation expanded to include less experienced engineers without adequate training? I would pull the last 20 incidents, tag each phase (detect, diagnose, mitigate, resolve), and look for the phase that grew most. If diagnosis is the bottleneck, invest in observability. If it is mitigation, improve rollback automation. If detection, tune alerting. I would also check whether system complexity has outpaced our operational tooling, which is a common pattern in fast-growing startups.",
  },
];

// ---------------------------------------------------------------------------
// Category 3: Project Deep-Dives
// ---------------------------------------------------------------------------

const projectTopics: StudyTopic[] = [
  {
    id: "rag-architecture",
    title: "RAG Pipeline Architecture Decisions",
    analogy:
      "Like designing a research assistant: they need to know how to search, what sources to trust, and how to synthesize findings into a clear answer.",
    tellTheCEO:
      "Our RAG pipeline is the engine behind our AI's ability to answer questions using our own documents. It works in three stages: first, it breaks documents into searchable chunks and stores them; second, when a user asks a question, it finds the most relevant chunks; third, it feeds those chunks to the AI model along with the question. The result is answers grounded in our actual data, not the model's general training.",
    tellTheEngineer:
      "The rag-core pipeline architecture has four pluggable stages. Ingestion: documents are recursively chunked with configurable size and overlap, then embedded using sentence transformers. Storage: embeddings are stored in an abstract store interface (InMemoryStore for development, with production adapters for Pinecone/Chroma). Retrieval: the query is embedded using the same model, and cosine similarity search returns the top-k candidates. Ranking: a multi-signal ranker adjusts scores based on recency, source authority, and diversity before returning the final results. Each stage is independently configurable and replaceable. The pipeline returns a confidence score with every response, enabling downstream applications to decide when to show the answer versus when to say 'I don't know.'",
    codeExample: `from rag_core import RAGPipeline
from rag_core.embeddings import LocalEmbeddings
from rag_core.stores import InMemoryStore

# Initialize pipeline with recursive chunking
embeddings = LocalEmbeddings(model_name="all-MiniLM-L6-v2")
store = InMemoryStore(dimension=embeddings.dimension)
pipeline = RAGPipeline(
    embedding_provider=embeddings,
    store=store,
    chunk_strategy="recursive",
    chunk_size=500,
    chunk_overlap=50,
)

# Ingest documents
pipeline.ingest(documents)

# Query with retrieval + ranking
response = pipeline.query("How does event-driven architecture work?", top_k=5)
print(response.confidence_score)  # 0.87
print(response.sources)           # ["architecture.md", "aws-guide.md"]`,
    codeLanguage: "python",
    keyTalkingPoints: [
      "Four pluggable stages: ingestion, storage, retrieval, ranking",
      "Abstract store interface allows swapping backends without changing pipeline logic",
      "Confidence scores enable downstream 'I don't know' decisions",
      "Recursive chunking preserves document structure better than fixed-size splitting",
      "The same embedding model must be used for both ingestion and query",
    ],
  },
  {
    id: "recursive-chunking",
    title: "Recursive Chunking Strategy",
    analogy:
      "Like organizing a library: first by floor (sections), then by aisle (paragraphs), then by shelf (sentences).",
    tellTheCEO:
      "Before our AI can search documents, we need to break them into smaller pieces. Our recursive chunking strategy is smart about how it splits: it first tries to break at section boundaries, then at paragraphs, then at sentences. This keeps related information together, which means the AI gets more useful context when it retrieves a chunk. Think of it like cutting a pizza: you want to cut between the toppings, not through the middle of a slice.",
    tellTheEngineer:
      "The recursive chunker uses a separator hierarchy (double newlines for sections, single newlines for paragraphs, periods for sentences, then character-level as a fallback). At each level, it accumulates text in a buffer until adding the next segment would exceed chunk_size, then flushes the buffer and starts a new chunk. If a single segment exceeds chunk_size, it recurses to the next separator level. This approach maximizes semantic coherence within each chunk while respecting size constraints. The chunk_overlap parameter (default 50 characters) creates sliding-window overlap between adjacent chunks, ensuring that information near chunk boundaries is not lost during retrieval. The key insight is that the separator hierarchy mirrors natural document structure, so chunks tend to align with meaningful content boundaries.",
    codeExample: `def _recursive_split(self, text: str, separators: list[str]) -> list[str]:
    """Recursively split using separator hierarchy."""
    if len(text) <= self.chunk_size:
        return [text]
    if not separators:
        return self._char_split(text)

    separator = separators[0]
    remaining_separators = separators[1:]
    parts = text.split(separator)
    result: list[str] = []
    buffer = ""

    for part in parts:
        candidate = f"{buffer}{separator}{part}" if buffer else part
        if len(candidate) <= self.chunk_size:
            buffer = candidate
        else:
            if buffer:
                result.append(buffer)
            if len(part) <= self.chunk_size:
                buffer = part
            else:
                sub_parts = self._recursive_split(part, remaining_separators)
                result.extend(sub_parts)
                buffer = ""
    if buffer:
        result.append(buffer)
    return result`,
    codeLanguage: "python",
    keyTalkingPoints: [
      "Separator hierarchy mirrors natural document structure (sections, paragraphs, sentences)",
      "Buffer accumulation keeps related content together within size constraints",
      "Recursion to finer-grained separators handles oversized segments gracefully",
      "Chunk overlap prevents information loss at boundaries",
      "Semantic coherence within chunks improves retrieval accuracy",
    ],
  },
  {
    id: "moderation-ensemble",
    title: "Content Moderation Ensemble Design",
    analogy:
      "Like a panel of judges: each scores independently, then a weighted average determines the verdict.",
    tellTheCEO:
      "Our content moderation system uses three independent judges to evaluate every piece of content. A rule-based filter catches known bad patterns instantly. A machine learning model evaluates overall toxicity. A sentiment analyzer detects subtle negativity. Each judge contributes a score, weighted by reliability, and the combined score determines the outcome: approve, reject, or send to a human reviewer. This layered approach catches more bad content while minimizing false alarms.",
    tellTheEngineer:
      "The ensemble classifier computes a weighted sum of layer scores. Rules (weight 0.4) provide deterministic, explainable baseline detection. The toxicity model (weight 0.4) handles novel patterns the rules miss. Sentiment analysis (weight 0.2) catches contextually harmful content that is not overtly toxic. The weighted score maps to a three-tier decision via configurable thresholds: approve below 0.3, reject above 0.7, flag for review in between. When total_weight is less than 1.0 (because a layer is disabled), we normalize by dividing by total_weight to maintain consistent scale. This design lets operators disable layers or adjust weights without code changes. The separation of scoring from decision-making (thresholds) means the same ensemble can serve different content policies by simply changing the threshold configuration.",
    codeExample: `def classify(self, text: str, layer_results: dict) -> ModerationResult:
    weighted_score = 0.0
    total_weight = 0.0

    for layer_name, weight in [("rules", self.weights.rules),
                                ("toxicity", self.weights.toxicity),
                                ("sentiment", self.weights.sentiment)]:
        if layer_name in layer_results:
            score = self._score_layer(layer_name, layer_results[layer_name])
            weighted_score += score * weight
            total_weight += weight

    if total_weight > 0 and total_weight < 1.0:
        weighted_score = weighted_score / total_weight

    # Threshold-based decision
    if weighted_score >= self.thresholds.reject_above:
        decision = Decision.REJECT
    elif weighted_score >= self.thresholds.approve_below:
        decision = Decision.FLAG_FOR_REVIEW
    else:
        decision = Decision.APPROVE

    return ModerationResult(decision=decision, confidence=confidence)`,
    codeLanguage: "python",
    keyTalkingPoints: [
      "Weighted ensemble combines deterministic rules with ML-based classifiers",
      "Weight normalization handles disabled layers without breaking the scoring scale",
      "Separation of scoring and decision-making enables policy customization via thresholds",
      "Three-tier decisions route only ambiguous content to human review",
      "Operators can adjust weights and thresholds without deploying new code",
    ],
  },
  {
    id: "ranking-reranking",
    title: "Ranking and Re-ranking",
    analogy:
      "Like Google results: relevance alone is not enough; you also consider freshness, authority, and diversity.",
    tellTheCEO:
      "When our AI searches for information, the initial results are ranked purely by how closely they match the question. But similarity alone is not enough. Our re-ranker adjusts the scores by considering three additional factors: how recent the information is (freshness), how reliable the source is (authority), and whether the results offer different perspectives (diversity). This ensures users get the most useful, well-rounded answers.",
    tellTheEngineer:
      "The ranker takes initial retrieval results (scored by cosine similarity) and applies three additive adjustments. Recency boost: a time-decay function that favors recently updated documents, weighted by recency_weight. Authority boost: metadata-based scoring that promotes documents from high-trust sources (official docs over blog posts), weighted by authority_weight. Diversity penalty: a deduplication signal that penalizes results from the same source as previously ranked items, tracked via a seen_sources dictionary and weighted by diversity_weight. The adjusted score is base_score + recency_boost + authority_boost - diversity_penalty. Results are re-sorted by adjusted score. This approach is intentionally simple and transparent. Each signal is independently tunable, and the additive model makes it easy to explain why a particular result ranked where it did.",
    codeExample: `def rerank(self, results: list[dict]) -> list[dict]:
    scored = []
    seen_sources: dict[str, int] = {}
    for result in results:
        base_score = result.get("score", 0.0)
        metadata = result.get("metadata", {})
        adjusted = (
            base_score
            + self.recency_weight * self._recency_boost(metadata)
            + self.authority_weight * self._authority_boost(metadata)
            - self.diversity_weight * self._diversity_penalty(
                metadata.get("source", ""), seen_sources
            )
        )
        result_copy = dict(result)
        result_copy["adjusted_score"] = adjusted
        scored.append(result_copy)
    scored.sort(key=lambda r: r["adjusted_score"], reverse=True)
    return scored`,
    codeLanguage: "python",
    keyTalkingPoints: [
      "Multi-signal ranking goes beyond simple similarity for production-quality results",
      "Additive model makes each signal independently tunable and explainable",
      "Diversity penalty prevents results from being dominated by a single source",
      "Recency boost ensures fresh information surfaces for time-sensitive queries",
      "Authority boost promotes trusted sources without ignoring lesser-known relevant content",
    ],
  },
  {
    id: "threshold-tuning",
    title: "Threshold Tuning for AI Decisions",
    analogy:
      "Like adjusting a spam filter: too strict blocks real emails, too loose lets spam through.",
    tellTheCEO:
      "Every AI decision system needs a threshold that determines when to act automatically and when to involve a human. Set it too aggressively, and you get false positives (blocking legitimate content, wasting reviewer time). Set it too conservatively, and you get false negatives (harmful content slipping through). Our modguard system uses two thresholds that create three zones: safe content passes through automatically, dangerous content is blocked automatically, and everything in between goes to a human reviewer. We tune these thresholds based on our tolerance for each type of error.",
    tellTheEngineer:
      "The ThresholdConfig in modguard defines two boundaries: approve_below (default 0.3) and reject_above (default 0.7). Content scoring below 0.3 is auto-approved, above 0.7 is auto-rejected, and the 0.3-0.7 range triggers human review. The gap between thresholds controls the human review volume: narrowing the gap reduces human workload but increases both false positives and false negatives. Tuning happens empirically: we run the ensemble on a labeled evaluation set and plot precision-recall curves at various threshold pairs. For high-risk platforms (children's content), we lower reject_above to 0.5 and lower approve_below to 0.15, accepting more human review to minimize harmful content exposure. For low-risk platforms (professional forums), we raise approve_below to 0.4, accepting slightly more risk to reduce moderation overhead. The key principle: threshold tuning is a business decision, not a technical one. Engineering provides the precision-recall tradeoff curves, and product/policy teams choose where on the curve to operate.",
    codeExample: `@dataclass
class ClassifierWeights:
    rules: float = 0.4      # Deterministic, always reliable
    toxicity: float = 0.4   # ML-based, high accuracy
    sentiment: float = 0.2  # Supplementary signal

@dataclass
class ThresholdConfig:
    approve_below: float = 0.3   # Low risk -> auto-approve
    reject_above: float = 0.7    # High risk -> auto-reject
    # Between 0.3-0.7 -> FLAG_FOR_REVIEW (human decides)`,
    codeLanguage: "python",
    keyTalkingPoints: [
      "Two thresholds create three decision zones: auto-approve, human review, auto-reject",
      "The gap between thresholds directly controls human review volume",
      "Threshold tuning is a business decision informed by precision-recall curves",
      "High-risk platforms should have lower reject thresholds (more conservative)",
      "Thresholds are configurable per deployment, enabling different policies without code changes",
    ],
  },
];

const projectQuestions: QuizQuestion[] = [
  {
    id: "proj-q1",
    topicId: "rag-architecture",
    type: "multiple_choice",
    question:
      "Why does the rag-core pipeline use the same embedding model for both document ingestion and query time?",
    options: [
      "To reduce the total number of API calls to the embedding service",
      "Because different models produce vectors in different spaces, making similarity comparison meaningless",
      "To save storage space by reusing the same model weights",
      "Because the query embedding model is always faster than the document model",
    ],
    correctIndex: 1,
    explanation:
      "Embedding models map text into specific vector spaces. If the document embeddings and query embeddings are in different spaces (from different models), cosine similarity between them is meaningless. The same model must produce both for valid comparison.",
  },
  {
    id: "proj-q2",
    topicId: "rag-architecture",
    type: "open_ended",
    question:
      "Walk through what happens internally when pipeline.query() is called in rag-core, from the raw query string to the final response.",
    explanation:
      "This tests your understanding of the full retrieval-augmented generation pipeline.",
    modelAnswer:
      "When pipeline.query() is called, five steps execute in sequence. Step 1: the query string is tokenized and embedded using the same LocalEmbeddings model used during ingestion, producing a 384-dimensional vector. Step 2: the vector store performs a similarity search by computing the dot product of the normalized query vector against all stored embeddings, returning the top-k candidate chunks sorted by score. Step 3: the ranker adjusts the candidate scores based on recency, source authority, and diversity signals, then re-sorts the results. Step 4: the top-ranked chunks are assembled into a context window alongside the original query and passed to the LLM for generation. Step 5: the response is packaged with metadata including a confidence score (derived from the retrieval similarity scores) and source attribution (which documents the chunks came from). The confidence score is critical because it allows the calling application to suppress low-confidence answers.",
  },
  {
    id: "proj-q3",
    topicId: "recursive-chunking",
    type: "multiple_choice",
    question:
      "In the recursive chunker, what happens when a single text segment exceeds the chunk_size and there are no more separators in the hierarchy?",
    options: [
      "The segment is discarded entirely",
      "The segment is stored as-is, exceeding the size limit",
      "The fallback character-level split (_char_split) is used",
      "An exception is raised to notify the caller",
    ],
    correctIndex: 2,
    explanation:
      "When the separator list is exhausted, the code falls back to _char_split(), which splits the text at the character level to enforce the chunk_size constraint. This ensures every chunk respects the size limit, even in degenerate cases.",
  },
  {
    id: "proj-q4",
    topicId: "recursive-chunking",
    type: "scenario",
    question:
      "A user ingests a large codebase (Python files) into the RAG pipeline and complains that code snippets are being split in the middle of functions, making retrieval results useless. How would you modify the recursive chunking strategy to handle code better?",
    explanation:
      "This tests your ability to adapt the chunking strategy for different content types.",
    modelAnswer:
      "I would create a code-aware separator hierarchy tailored to Python's structure. Instead of the default separators (double newline, single newline, period), I would use: class definitions ('\\nclass '), function definitions ('\\ndef '), double newlines (blank lines between logical blocks), single newlines, then character-level fallback. This way, the chunker first tries to split between classes, then between functions, then between logical blocks within a function. I would also increase the chunk_size for code (from 500 to 1000-1500 characters) since functions are typically longer than prose paragraphs and splitting a function in half destroys its semantic meaning. Additionally, I would add metadata to each chunk indicating the parent class and function name, so the re-ranker can use this context for authority scoring. The rag-core architecture supports this because the chunking strategy is pluggable: we can register a 'python' strategy alongside the default 'recursive' strategy.",
  },
  {
    id: "proj-q5",
    topicId: "moderation-ensemble",
    type: "multiple_choice",
    question:
      "In the modguard ensemble classifier, what happens when the toxicity layer is disabled (enable_toxicity=False)?",
    options: [
      "The pipeline raises an error because toxicity is required",
      "The toxicity weight is redistributed equally to the other layers",
      "The weighted score is normalized by dividing by the active total_weight",
      "The toxicity score defaults to 0.0",
    ],
    correctIndex: 2,
    explanation:
      "When a layer is disabled, it is not included in layer_results, so its weight is not added to total_weight. The code normalizes by dividing weighted_score by total_weight when total_weight < 1.0, maintaining consistent scoring regardless of which layers are active.",
  },
  {
    id: "proj-q6",
    topicId: "moderation-ensemble",
    type: "open_ended",
    question:
      "Explain why the modguard ensemble uses a weighted average rather than a majority vote or max-score approach.",
    explanation:
      "This tests your understanding of ensemble design tradeoffs.",
    modelAnswer:
      "A weighted average is the right choice for three reasons. First, it allows continuous confidence scoring. Majority vote produces a binary outcome (flagged or not), losing the nuance needed for the three-tier decision system (approve, review, reject). A weighted average preserves the gradient of severity. Second, it lets us express domain knowledge about classifier reliability. Rules are deterministic and always reliable, so they get 0.4 weight. The toxicity model is strong but imperfect, also 0.4. Sentiment is a weaker, supplementary signal at 0.2. A majority vote would treat all three as equally trustworthy. Third, it degrades gracefully. If one layer is disabled or returns an error, the normalization step adjusts the remaining weights to still produce a valid 0-1 score. A max-score approach would be too aggressive: a single classifier spiking to 0.9 would override the other two, even if they score 0.1. The weighted average balances confidence across all active signals.",
  },
  {
    id: "proj-q7",
    topicId: "ranking-reranking",
    type: "multiple_choice",
    question:
      "What is the purpose of the diversity_penalty in the rag-core ranker?",
    options: [
      "To penalize documents that are too long",
      "To demote results from sources that already appear earlier in the ranking",
      "To remove duplicate chunks from the results",
      "To boost results that disagree with the query",
    ],
    correctIndex: 1,
    explanation:
      "The diversity penalty uses a seen_sources dictionary to track which sources have already appeared in the ranking. Results from sources that are already represented are penalized, ensuring the final ranking includes content from multiple sources rather than clustering results from a single document.",
  },
  {
    id: "proj-q8",
    topicId: "ranking-reranking",
    type: "scenario",
    question:
      "The RAG system keeps returning outdated documentation as the top result because those pages have been cited by many other pages (high authority). Users want recent content to surface first. How do you adjust the ranker?",
    explanation:
      "This tests your ability to tune multi-signal ranking for specific business needs.",
    modelAnswer:
      "I would make three adjustments. First, increase the recency_weight relative to authority_weight. If the current weights are recency=0.1 and authority=0.3, I would flip them to recency=0.3 and authority=0.1. This shifts the balance toward fresh content. Second, modify the recency_boost function to use a steeper decay curve so documents older than 30 days receive significantly less boost, while documents updated in the last 7 days get a strong positive signal. Third, add a 'last_updated' timestamp to the document metadata during ingestion and use it in the recency calculation instead of relying on creation date. I would validate these changes by running the updated ranker against a test set of queries where users previously complained about stale results, measuring whether the top-3 results now include the expected recent documents. The beauty of the additive ranking model is that these changes only require configuration adjustments, not architectural changes.",
  },
  {
    id: "proj-q9",
    topicId: "threshold-tuning",
    type: "multiple_choice",
    question:
      "If you narrow the gap between approve_below and reject_above in the modguard ThresholdConfig (e.g., changing from 0.3/0.7 to 0.4/0.6), what is the primary effect?",
    options: [
      "The model becomes more accurate overall",
      "Human review volume decreases, but both false positives and false negatives increase",
      "Processing speed increases because fewer layers are evaluated",
      "The confidence scores change for all content",
    ],
    correctIndex: 1,
    explanation:
      "Narrowing the review window (from 0.3-0.7 to 0.4-0.6) means more content is auto-decided and less goes to human review. But this means borderline content that was previously reviewed by humans is now auto-approved or auto-rejected, increasing both types of errors.",
  },
  {
    id: "proj-q10",
    topicId: "threshold-tuning",
    type: "scenario",
    question:
      "You are deploying modguard for a children's educational platform. The current thresholds (approve_below=0.3, reject_above=0.7) were tuned for a general audience. How do you adjust them, and what tradeoffs do you accept?",
    explanation:
      "This tests your ability to tune AI decision thresholds for a high-stakes deployment.",
    modelAnswer:
      "For a children's platform, I would prioritize safety over efficiency. I would lower approve_below from 0.3 to 0.15, meaning only very clearly safe content is auto-approved. I would lower reject_above from 0.7 to 0.5, meaning content that is even moderately suspicious is auto-rejected. This widens the FLAG_FOR_REVIEW window (0.15 to 0.5), which significantly increases human review volume. I accept this tradeoff because the cost of a false negative (harmful content reaching children) far outweighs the cost of extra human review. I would also consider adding a fourth category: 'escalate to senior reviewer' for content scoring between 0.4 and 0.5, ensuring borderline cases get experienced judgment. I would validate these thresholds by running the pipeline against a labeled dataset of children's content, measuring that the false negative rate for harmful content drops below 1% while keeping human review volume under 20% of total content.",
  },
  {
    id: "proj-q11",
    topicId: "rag-architecture",
    type: "scenario",
    question:
      "Your rag-core pipeline currently handles 100 queries per second with an InMemoryStore. The product team wants to support 10,000 QPS with 10 million documents. What architectural changes do you make?",
    explanation:
      "This tests your ability to scale a RAG system from prototype to production.",
    modelAnswer:
      "I would make changes at three layers. Storage: replace InMemoryStore with a distributed vector database (Pinecone, Qdrant, or Weaviate) that supports horizontal sharding across multiple nodes. The rag-core abstract store interface means this is a backend swap with no pipeline logic changes. Embedding: move from synchronous single-request embedding to a batched embedding service with GPU acceleration. Use an embedding microservice behind a load balancer so multiple pipeline instances can share it. Pipeline: deploy multiple stateless pipeline instances behind a load balancer. Since the pipeline reads from the shared vector store, it scales horizontally. Add a Redis-based semantic cache in front of the pipeline to serve repeat and similar queries without hitting the vector store at all. I would also optimize the ranker to work with pre-computed metadata indexes rather than scanning result metadata at query time. Target architecture: load balancer routing to N pipeline instances, each backed by the same distributed vector store and shared embedding service, with a semantic cache handling 30-40% of queries.",
  },
  {
    id: "proj-q12",
    topicId: "recursive-chunking",
    type: "open_ended",
    question:
      "Why does the recursive chunker use chunk_overlap, and what are the risks of setting it too high or too low?",
    explanation:
      "This tests your understanding of the tradeoffs in chunk overlap configuration.",
    modelAnswer:
      "Chunk overlap (default 50 characters) creates redundancy at chunk boundaries so that information spanning two chunks is fully captured in at least one of them. Without overlap, a sentence that falls exactly on a chunk boundary gets split across two chunks, and neither chunk contains the complete thought. The retrieval system might miss it entirely if only partial information is not relevant enough to surface. Setting overlap too low (0-10 characters) risks losing boundary information and fragmenting sentences. Setting overlap too high (200+ characters when chunk_size is 500) wastes storage (up to 40% redundancy), increases embedding costs proportionally, and can cause the same information to appear in multiple retrieval results, reducing effective diversity in the top-k. A good rule of thumb is 10-15% of chunk_size, which preserves boundary context without excessive duplication.",
  },
];

// ---------------------------------------------------------------------------
// Category 4: Career & Behavioral
// ---------------------------------------------------------------------------

const careerTopics: StudyTopic[] = [
  {
    id: "amara-leadership",
    title: "Leading Amara Social Engineering",
    analogy:
      "Like being the head chef of a restaurant that is also designing the kitchen while serving customers: you are building the product, the team, and the processes simultaneously.",
    tellTheCEO:
      "At Amara Social, I lead 25 professionals across 5 cross-functional squads building an AI-powered social platform. We ship AI content moderation that processes millions of posts, recommendation systems that personalize user feeds, and engagement features that drive retention. I scaled the team from a small group to 25 people while maintaining velocity, establishing engineering processes, and building the AI infrastructure from the ground up.",
    tellTheEngineer:
      "At Amara, I own the entire engineering and AI organization: 5 squads covering platform backend (Node.js/Python microservices on AWS), mobile (React Native), ML/AI (content moderation, recommendations, personalization), data engineering (event pipelines, analytics), and DevOps/SRE. The content moderation system uses an ensemble approach (which inspired the open-source modguard project) processing content through rule-based filters, ML toxicity models, and sentiment analysis. The recommendation engine uses collaborative filtering combined with content-based signals, boosted by a re-ranking layer that accounts for recency, engagement probability, and content diversity. Key technical decisions I drove: migrating from a monolith to event-driven microservices, implementing feature flags for safe rollouts, and building a shared ML feature store that serves both moderation and recommendation systems.",
    keyTalkingPoints: [
      "Led 25 professionals across 5 cross-functional squads",
      "Built AI content moderation and recommendation systems from scratch",
      "Scaled team while maintaining delivery velocity",
      "Drove migration from monolith to event-driven microservices",
      "Established engineering processes including CI/CD, feature flags, and on-call rotations",
    ],
  },
  {
    id: "dolo-cofounding",
    title: "Co-founding Dolo Distribution",
    analogy:
      "Like building the plane while flying it: simultaneously writing code, fundraising, selling, and hiring, all with a tiny team and limited runway.",
    tellTheCEO:
      "I co-founded Dolo Distribution and built all the technology from scratch. Our AI recommendation engine increased average order value by 18% by suggesting complementary products to buyers. I wore every hat in the early days: coding the platform, managing our small team, contributing to fundraising that exceeded $500K, and growing profits 22%. We ultimately achieved a successful exit, validating the technology and business model.",
    tellTheEngineer:
      "At Dolo, I built the full-stack platform: a Next.js frontend, Python backend API, PostgreSQL database, and an AI recommendation service. The recommendation engine used item-to-item collaborative filtering with implicit feedback signals (purchase history, browse patterns, cart additions). The 18% order value increase came from a 'frequently bought together' model that learned product affinities from transaction data. I also built the inventory management system, payment processing integration, and analytics dashboard. The technical challenge was building production-grade systems with minimal resources: I optimized for simplicity and reliability, using managed services (AWS RDS, S3, Lambda) to minimize ops overhead so I could focus engineering time on differentiated features.",
    keyTalkingPoints: [
      "Built all technology from scratch as technical co-founder",
      "AI recommendation engine increased average order value by 18%",
      "Contributed to strategy that raised $500K+ in venture capital",
      "Achieved 22% profit growth through technology optimization",
      "Led to a successful exit, validating the technology and business model",
    ],
  },
  {
    id: "defense-engineering",
    title: "Defense Industry Engineering",
    analogy:
      "Like building a bridge that lives depend on: every line of code goes through rigorous review, testing, and documentation because failure is not an option.",
    tellTheCEO:
      "At General Atomics, I built mission-critical software for drone systems that had to work perfectly in life-or-death situations. This experience taught me the value of rigorous engineering discipline: extensive testing, formal code reviews, and comprehensive documentation. These habits now inform how I build AI systems where reliability and safety are paramount. I also hold an active SECRET security clearance.",
    tellTheEngineer:
      "At General Atomics, I worked on real-time embedded systems for UAV (unmanned aerial vehicle) platforms. The software had to meet DoD quality standards: formal requirements traceability, MISRA-compliant code, extensive unit and integration testing with coverage requirements, and rigorous peer review processes. I wrote C/C++ for safety-critical flight control systems where latency budgets were measured in microseconds. At MITRE Corporation, I supported government R&D in a consultative engineering role. The defense background gives me a unique perspective on AI safety and reliability: I apply the same discipline (rigorous testing, formal verification where possible, extensive monitoring, and graceful degradation) to ML systems where the failure modes are different but the consequences can still be severe.",
    keyTalkingPoints: [
      "Built mission-critical drone software at General Atomics",
      "Practiced DoD-level quality standards: formal reviews, coverage requirements, requirements traceability",
      "Active SECRET security clearance",
      "Defense engineering discipline directly applies to AI safety and reliability",
      "Supported government R&D at MITRE Corporation",
    ],
  },
  {
    id: "fundraising-strategy",
    title: "Fundraising and Business Strategy",
    analogy:
      "Like being both the architect and the real estate agent: you have to build something valuable AND convince investors it is worth funding.",
    tellTheCEO:
      "Across my ventures, I have contributed to raising over $500K in venture capital and growing profits by 22%. I can speak the language of both investors and engineers, translating technical capabilities into business value and market opportunity. My approach to fundraising combines a strong technical demo with clear unit economics and a credible growth story.",
    tellTheEngineer:
      "My fundraising experience gives me a unique perspective as a technical leader. I can articulate the business value of engineering investments in terms investors and executives understand: reducing customer acquisition cost through AI-powered recommendations, improving retention through personalized experiences, and reducing operational costs through automation. When presenting to boards or investors, I frame technical decisions as business decisions: 'Building our own moderation pipeline costs 6 months of engineering time, but reduces moderation costs by 60% at scale and creates a proprietary competitive advantage.' This ability to bridge technical and business contexts is essential for a VP of Engineering who needs to secure budget for infrastructure investments that do not have immediate, visible user-facing impact.",
    keyTalkingPoints: [
      "Contributed to strategy that raised $500K+ in venture capital",
      "Achieved 22% profit growth through strategic technology investments",
      "Can translate technical capabilities into investor-friendly business value",
      "Frame engineering investments as business decisions with measurable ROI",
      "Bridge the gap between technical execution and board-level communication",
    ],
  },
];

const careerQuestions: QuizQuestion[] = [
  {
    id: "career-q1",
    topicId: "amara-leadership",
    type: "open_ended",
    question:
      "Tell me about a time you had to scale an engineering team rapidly. What worked and what would you do differently?",
    explanation:
      "This is a classic behavioral question testing leadership experience and self-awareness.",
    modelAnswer:
      "At Amara Social, I scaled the engineering team from a small founding group to 25 professionals across 5 squads in under two years. What worked: I structured teams around product domains (platform, mobile, ML/AI, data, DevOps) with clear ownership boundaries from the start, which prevented the coordination chaos that often accompanies rapid growth. I also invested early in CI/CD automation and feature flags, which let new team members ship safely from their first week. What I would do differently: I underestimated how quickly institutional knowledge fragments during rapid hiring. In hindsight, I would have established architecture decision records and a formal onboarding curriculum earlier. We eventually built these, but the first wave of hires had to learn through tribal knowledge, which created inconsistencies. I would also invest in an internal developer platform sooner, as too many early hires spent their first weeks fighting environment setup instead of contributing.",
  },
  {
    id: "career-q2",
    topicId: "amara-leadership",
    type: "scenario",
    question:
      "You are leading 5 engineering squads at Amara. Two squad leads come to you with a conflict: the Platform team wants to refactor the API layer, which would block the ML team's feature rollout for 3 weeks. How do you resolve this?",
    explanation:
      "This tests conflict resolution and prioritization skills in a multi-team environment.",
    modelAnswer:
      "First, I would meet with both squad leads together to understand the full picture. What is the business impact of the ML feature delay? What is the risk of not doing the API refactor? Then I would look for a path that avoids the false choice. Can the refactor be done incrementally with backward-compatible changes so the ML team can continue building against the current API while the new one is being built? This is the strangler fig pattern. If the refactor truly requires a breaking change, I would evaluate: which initiative has a harder deadline? The ML feature might have a customer commitment or revenue impact. The refactor might be blocking three other teams behind the scenes. I would make the decision based on total organizational impact, communicate the rationale transparently to both teams, and ensure the deprioritized team gets a committed slot on the roadmap for their work. The worst outcome is leaving both teams in limbo, so a clear, timely decision matters more than a perfect one.",
  },
  {
    id: "career-q3",
    topicId: "dolo-cofounding",
    type: "open_ended",
    question:
      "Describe a time you built a product that directly moved a business metric. What was your approach?",
    explanation:
      "This tests your ability to connect technical work to measurable business outcomes.",
    modelAnswer:
      "At Dolo Distribution, I built an AI recommendation engine that increased average order value by 18%. My approach started with understanding the business problem: buyers were purchasing single items when our data showed clear product affinities (customers who buy X frequently also buy Y). I analyzed six months of transaction data to identify the strongest product co-occurrence patterns. I built a collaborative filtering model using implicit feedback (purchase history and browse patterns) and deployed it as a 'frequently bought together' component on the product detail page and in the cart. I ran an A/B test for two weeks to validate the impact. The control group saw no recommendations; the test group saw three complementary product suggestions. The test group's average order value was 18% higher with no decrease in conversion rate. The key insight was starting with the business metric (order value) and working backward to the technical solution, rather than building AI for its own sake.",
  },
  {
    id: "career-q4",
    topicId: "dolo-cofounding",
    type: "scenario",
    question:
      "You are a technical co-founder with 3 months of runway left. Your AI recommendation feature is 80% built but the sales team says customers want a completely different feature. What do you do?",
    explanation:
      "This tests your ability to make tough prioritization calls under extreme constraints.",
    modelAnswer:
      "With 3 months of runway, survival trumps perfection. First, I would validate the sales team's claim by talking to 3-5 customers directly. Sales teams sometimes confuse 'customers mentioned this' with 'customers will pay for this.' If the customer demand is real and the new feature drives revenue or retention that extends our runway, I would pause the recommendation engine (80% is sunk cost, not a reason to continue) and redirect engineering to the customer-requested feature. I would ship a minimal viable version in 4-6 weeks, leaving buffer for iteration. If the customer demand is speculative, I would finish the recommendation engine in 2-3 weeks (it is 80% done) and ship it to prove impact with data. The 18% order value increase we eventually achieved at Dolo was exactly this kind of evidence that helped with fundraising. The principle: at 3 months of runway, every engineering decision must either generate revenue, prove metrics for fundraising, or reduce burn rate. Everything else waits.",
  },
  {
    id: "career-q5",
    topicId: "defense-engineering",
    type: "open_ended",
    question:
      "How has your defense industry background influenced the way you build AI systems?",
    explanation:
      "This tests your ability to connect diverse experience to current leadership philosophy.",
    modelAnswer:
      "Working on mission-critical drone software at General Atomics fundamentally shaped my engineering philosophy in three ways. First, testing discipline: in defense, you test exhaustively because failure means lives at risk. I bring that same rigor to AI systems, where the failure mode is different (biased outputs, hallucinated content, privacy violations) but the discipline of comprehensive testing applies directly. We run automated evaluation suites, adversarial red-team testing, and bias audits before every model deployment. Second, formal documentation: defense requires requirements traceability, meaning every line of code maps to a documented requirement. In AI, I apply this as model cards and evaluation reports that document what each model can and cannot do, its training data, and its known limitations. Third, graceful degradation: safety-critical systems are designed to fail safely. Our AI systems follow the same pattern. If the moderation model is uncertain, it flags for human review rather than making a wrong automated decision. If the RAG pipeline has low confidence, it says 'I don't know' instead of hallucinating.",
  },
  {
    id: "career-q6",
    topicId: "defense-engineering",
    type: "scenario",
    question:
      "Your AI content moderation system just made a high-profile false positive, incorrectly flagging a prominent user's post as harmful. It is trending on social media. What do you do in the first 60 minutes?",
    explanation:
      "This tests incident response skills applied to an AI-specific crisis.",
    modelAnswer:
      "Minute 0-10: Acknowledge the incident internally and assemble the response team (engineering lead, communications, product, legal). Manually reverse the moderation decision and restore the user's post. Minute 10-20: Draft a brief public acknowledgment: 'Our automated system incorrectly flagged this post. We have restored it and are investigating.' Speed matters; silence lets the narrative spiral. Minute 20-40: Pull the moderation logs for this specific decision. Identify which classifier(s) triggered the false positive and at what confidence level. Check if other posts from this user or similar content were also incorrectly flagged (blast radius assessment). Minute 40-60: If this is a systemic issue (a category of content being misflagged), immediately adjust the relevant threshold to route this content type to human review instead of auto-reject. If it is an isolated edge case, document it for the postmortem. Within 24 hours: conduct a blameless postmortem and add the misclassified content as a test case in our evaluation suite to prevent recurrence.",
  },
  {
    id: "career-q7",
    topicId: "fundraising-strategy",
    type: "open_ended",
    question:
      "How do you justify engineering infrastructure investments (like building an internal AI platform) to a board that wants to see customer-facing features?",
    explanation:
      "This tests your ability to communicate technical strategy in business terms.",
    modelAnswer:
      "I frame infrastructure investments in terms the board cares about: speed, cost, and risk. For example, when justifying our investment in the rag-core pipeline: 'Right now, every team that needs AI search builds it from scratch, taking 6-8 weeks each. A shared pipeline reduces that to 1-2 weeks, meaning we ship 4 AI-powered features this quarter instead of 1. The investment pays for itself by the second feature.' I also quantify the cost of NOT investing: 'Without a shared moderation pipeline, each product team implements their own content filtering. This means inconsistent safety standards, duplicated effort across 3 teams, and higher compliance risk. The platform investment costs 2 months of one team's time but saves 6 months across the organization this year.' I always bring data: before/after metrics from similar investments, industry benchmarks, and specific customer commitments that depend on the infrastructure. The key is connecting every engineering dollar to either revenue acceleration, cost reduction, or risk mitigation.",
  },
  {
    id: "career-q8",
    topicId: "fundraising-strategy",
    type: "scenario",
    question:
      "An investor asks: 'Why should we fund your AI startup instead of a team from Google Brain?' How do you respond?",
    explanation:
      "This tests your ability to position yourself and your team's unique advantages under pressure.",
    modelAnswer:
      "I would respond with three points. First, execution track record: 'We have already shipped production AI systems to real users. Our moderation pipeline processes millions of posts, our recommendation engine increased order value by 18%, and we led a company to a successful exit. We do not just research AI; we deploy it and measure business impact.' Second, full-stack capability: 'A Google Brain team has deep ML expertise, but building a product requires engineering leadership, team management, infrastructure, and business acumen. I have scaled teams to 25 people, managed $500K+ in funding, and built everything from mission-critical drone software to consumer social platforms. We ship complete products, not papers.' Third, domain advantage: 'We have been building in this specific market for years and understand the customers, the data challenges, and the regulatory landscape. Domain expertise combined with AI capability is harder to replicate than pure AI research talent.' The underlying message: we are not competing on who wrote the best paper. We are competing on who can turn AI into a business.",
  },
  {
    id: "career-q9",
    topicId: "amara-leadership",
    type: "scenario",
    question:
      "Your best senior engineer just gave two weeks notice. They own critical institutional knowledge about the AI recommendation system. What do you do?",
    explanation:
      "This tests knowledge management and succession planning under pressure.",
    modelAnswer:
      "Immediate actions (day 1-2): have a candid conversation to understand their reasons for leaving. If it is fixable (compensation, role scope, burnout), make a counteroffer. If they are committed to leaving, shift to knowledge transfer mode. Days 2-7: schedule dedicated knowledge transfer sessions where the departing engineer documents and walks through the recommendation system architecture, key decisions, known issues, and operational runbooks. Record these sessions. Assign a primary successor who shadows them for the remaining time. Days 7-14: have the successor make a small change to the system independently, with the departing engineer available for questions but not doing the work. This validates the knowledge transfer. Long-term: this situation reveals a single-point-of-failure problem. After they leave, I would establish a policy that every critical system has at least two engineers with working knowledge, implement architecture decision records so future decisions are documented in context, and review compensation bands to reduce future retention risk. The lesson is that knowledge concentration is a form of technical debt.",
  },
  {
    id: "career-q10",
    topicId: "dolo-cofounding",
    type: "open_ended",
    question:
      "What is the most important lesson you learned from your startup exit, and how does it influence your approach as a VP of Engineering?",
    explanation:
      "This tests self-reflection and the ability to extract transferable leadership lessons from past experience.",
    modelAnswer:
      "The most important lesson from Dolo was that technology alone does not win. The AI recommendation engine was technically sound and measurably impactful (18% order value increase), but the exit happened because we aligned technology with business strategy at every step. As VP of Engineering, this lesson manifests in three ways. First, I start every technical initiative by defining the business metric it should move, and I kill projects that cannot articulate their business case, no matter how technically interesting they are. Second, I ensure my engineering leads can explain their team's work in business terms. If a tech lead cannot describe why their project matters to a non-technical stakeholder in 30 seconds, the project is either misaligned or poorly communicated, and both are problems. Third, I maintain strong relationships with product, sales, and finance so that engineering priorities are always informed by what the business actually needs, not what engineers find most interesting to build. The startup taught me that great engineering in service of the wrong problem is waste.",
  },
];

// ---------------------------------------------------------------------------
// Export all categories
// ---------------------------------------------------------------------------

export const STUDY_GUIDE_CATEGORIES: QuizCategory[] = [
  {
    id: "ai-ml",
    title: "AI/ML Technical Knowledge",
    description:
      "Deep technical understanding of LLMs, RAG, embeddings, content moderation, and AI evaluation. The foundation for any VP of Engineering leading AI initiatives.",
    icon: "Brain",
    topics: aiMlTopics,
    questions: aiMlQuestions,
  },
  {
    id: "engineering-leadership",
    title: "Engineering Leadership",
    description:
      "Scaling teams, managing technical debt, build-vs-buy decisions, developer productivity, and incident management. The organizational skills that separate managers from leaders.",
    icon: "Users",
    topics: leadershipTopics,
    questions: leadershipQuestions,
  },
  {
    id: "project-deep-dives",
    title: "Project Deep-Dives",
    description:
      "Architecture decisions, implementation details, and technical tradeoffs from real projects (rag-core, modguard). Expect interviewers to probe your actual code.",
    icon: "Code",
    topics: projectTopics,
    questions: projectQuestions,
  },
  {
    id: "career-behavioral",
    title: "Career & Behavioral",
    description:
      "Leadership stories from Amara Social, Dolo Distribution, General Atomics, and fundraising. Practice the STAR method with real experiences.",
    icon: "Briefcase",
    topics: careerTopics,
    questions: careerQuestions,
  },
];

// Utility helpers
export function getAllQuestions(): QuizQuestion[] {
  return STUDY_GUIDE_CATEGORIES.flatMap((cat) => cat.questions);
}

export function getQuestionsByType(
  type: "multiple_choice" | "open_ended" | "scenario"
): QuizQuestion[] {
  return getAllQuestions().filter((q) => q.type === type);
}

export function getTopicById(topicId: string): StudyTopic | undefined {
  for (const category of STUDY_GUIDE_CATEGORIES) {
    const topic = category.topics.find((t) => t.id === topicId);
    if (topic) return topic;
  }
  return undefined;
}

export function getCategoryById(categoryId: string): QuizCategory | undefined {
  return STUDY_GUIDE_CATEGORIES.find((c) => c.id === categoryId);
}

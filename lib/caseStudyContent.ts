export const RAG_CASE_STUDY = {
  title: "rag-core",
  subtitle: "A Lightweight, Modular RAG Pipeline Library for Python",
  github: "https://github.com/claytoncuteri/rag-core",
  overview:
    "rag-core is an opinionated but modular RAG (Retrieval-Augmented Generation) pipeline that handles the full journey from raw documents to grounded LLM responses. It is designed to make smart defaults easy while keeping every component swappable.",
  architectureStages: [
    { label: "Document Loader", description: "Ingest text, markdown, PDF, or CSV files into a standard Document format" },
    { label: "Chunker", description: "Split documents into overlapping chunks using recursive, semantic, or fixed-size strategies" },
    { label: "Embedding Engine", description: "Convert chunks to vector embeddings via local models or the OpenAI API" },
    { label: "Vector Store", description: "Index embeddings for fast similarity search using in-memory numpy or ChromaDB" },
    { label: "Retriever + Ranker", description: "Find the top-k relevant chunks and re-rank them with metadata boosters" },
    { label: "Prompt Builder", description: "Assemble a grounded prompt with retrieved context and source citations" },
  ],
  decisions: [
    {
      title: "Why Recursive Chunking Is the Default",
      description:
        "Recursive chunking tries the largest natural boundaries first (double newlines, then single newlines, then sentences) before falling back to character splits. This preserves semantic coherence better than fixed-size chunking while still guaranteeing a maximum chunk size. In contrast, fixed-size chunks can split mid-sentence, degrading retrieval precision. Semantic chunking works well for structured content like markdown, but can produce unpredictable chunk sizes. Recursive chunking balances precision, context preservation, and compute cost.",
      icon: "Scissors",
    },
    {
      title: "Why Cosine Similarity Over Other Metrics",
      description:
        "Cosine similarity measures the angle between two vectors, making it magnitude-invariant. This is critical for text embeddings because document length can vary dramatically. Two paragraphs about the same topic will have similar directions in embedding space even if one is twice as long. Dot product is faster but sensitive to magnitude. Euclidean distance works well for normalized vectors but can be misleading for raw embeddings of different lengths.",
      icon: "Target",
    },
    {
      title: "Local vs API Embeddings",
      description:
        "The library supports both sentence-transformers (local, free, private) and OpenAI embeddings (higher quality, API cost). Local models like all-MiniLM-L6-v2 produce 384-dimensional embeddings with reasonable quality for most use cases. OpenAI's text-embedding-3-small produces 1536 dimensions with stronger semantic understanding. The choice depends on your privacy requirements, budget, and quality needs. For development and testing, local embeddings eliminate API dependencies entirely.",
      icon: "Cpu",
    },
    {
      title: "Caching Strategy",
      description:
        "The embedding cache uses a content hash (text + model name) as the key, stored as a numpy .npz file on disk. This means re-ingesting unchanged documents skips the expensive embedding step entirely. For large document collections, this can reduce pipeline run time from minutes to seconds. The cache invalidates automatically when document content changes because the hash changes.",
      icon: "Database",
    },
  ],
  pipelineCode: `from rag_core import RAGPipeline
from rag_core.loaders import MarkdownLoader
from rag_core.embeddings import LocalEmbeddings

# Initialize pipeline with smart defaults
pipeline = RAGPipeline(
    embedding_provider=LocalEmbeddings(),
    chunk_strategy="recursive",
    chunk_size=512,
    chunk_overlap=50,
)

# Ingest documents
docs = MarkdownLoader.load_directory("./docs/")
pipeline.ingest(docs)

# Query
response = pipeline.query(
    "What are the key benefits of event-driven architecture?"
)
print(response.answer)
print(f"Sources: {response.sources}")
print(f"Confidence: {response.confidence_score}")`,
  chunkerComparisonCode: `# Fixed-size: simple but can split mid-sentence
fixed = FixedSizeChunker(chunk_size=500, overlap=50)

# Semantic: splits at paragraph/header boundaries
semantic = SemanticChunker(max_chunk_size=800)

# Recursive (default): tries natural boundaries first
recursive = RecursiveChunker(
    chunk_size=512,
    overlap=50,
    separators=["\\n\\n", "\\n", ". ", " "]
)`,
};

export const MODGUARD_CASE_STUDY = {
  title: "modguard",
  subtitle: "A Multi-Layered AI Content Moderation Pipeline",
  github: "https://github.com/claytoncuteri/modguard",
  overview:
    "modguard implements a layered content moderation approach where each layer catches different types of violations. Rule-based filters handle obvious cases instantly, ML classifiers detect subtle toxicity, and sentiment analysis catches context-dependent negativity. An ensemble engine combines all signals into a single, explainable decision.",
  architectureLayers: [
    {
      label: "Layer 1: Rule-Based Filters",
      description:
        "Regex patterns, keyword blocklists, and spam detection. Fast, deterministic, zero-cost first pass that catches obvious violations with 100% confidence.",
      color: "text-emerald-400",
    },
    {
      label: "Layer 2: ML Toxicity Classifier",
      description:
        "Pre-trained transformer model for multi-label toxicity detection: toxic, severe_toxic, obscene, threat, insult, identity_hate. Returns per-label confidence scores.",
      color: "text-accent-blue",
    },
    {
      label: "Layer 3: Sentiment Analyzer",
      description:
        "Sentiment analysis model that catches subtle negativity, sarcasm, and backhanded compliments that the toxicity model might miss.",
      color: "text-accent-amber",
    },
    {
      label: "Ensemble Decision Engine",
      description:
        "Weighted combination of all layer scores into a final decision (APPROVE, FLAG_FOR_REVIEW, or REJECT) with an overall confidence score and human-readable explanation.",
      color: "text-purple-400",
    },
  ],
  decisions: [
    {
      title: "Why Layered Moderation Outperforms Single Models",
      description:
        "No single classifier excels at every type of content violation. Rule-based filters are perfect for known patterns (slurs, spam URLs) but miss novel toxicity. ML models detect nuanced toxicity but are expensive and can have false positives. Sentiment analysis catches negativity that is technically not toxic but still harmful. Layering these approaches covers each other's blind spots, and the ensemble engine weighs their contributions based on reliability.",
      icon: "Layers",
    },
    {
      title: "Ensemble Weighting and Tuning",
      description:
        "The ensemble uses weighted scoring: final_score = 0.4 * rule_score + 0.4 * toxicity_score + 0.2 * sentiment_score. Rules and toxicity get equal weight because rules are highly precise (few false positives) and toxicity models capture a broad range of violations. Sentiment gets lower weight because negative sentiment alone does not mean content should be moderated. These weights are configurable per deployment based on the specific community's tolerance levels.",
      icon: "Scale",
    },
    {
      title: "Precision vs Recall in Content Moderation",
      description:
        "For hate speech and threats, you want high recall (catch everything, even at the cost of some false positives). For mild negativity, you can tolerate lower recall because over-moderation drives users away. The threshold system (score < 0.3 = APPROVE, 0.3-0.7 = FLAG, > 0.7 = REJECT) creates a middle ground: borderline content goes to human review rather than being auto-rejected. This balances user safety with free expression.",
      icon: "Target",
    },
    {
      title: "Confidence Scoring for Human Moderators",
      description:
        "Every decision includes a confidence score, which is the weighted average of individual layer confidences. Low-confidence decisions (0.3-0.5) get routed to senior moderators. High-confidence rejections (>0.9) can be auto-actioned. This creates an efficient triage system where human moderators spend their time on genuinely ambiguous cases rather than reviewing obviously safe or obviously toxic content.",
      icon: "Users",
    },
  ],
  pipelineCode: `from modguard import ModerationPipeline

# Initialize with defaults
pipeline = ModerationPipeline()

# Moderate a single item
result = pipeline.moderate(
    "I really enjoyed the new update!"
)
print(result.decision)      # APPROVE
print(result.confidence)    # 0.95
print(result.explanation)

# Get layer-by-layer breakdown
for layer, result in result.layer_results.items():
    print(f"{layer}: {result}")`,
  ensembleCode: `# Ensemble scoring formula
final_score = (
    0.4 * rule_score +
    0.4 * toxicity_score +
    0.2 * sentiment_score
)

# Decision thresholds
if final_score < 0.3:
    decision = "APPROVE"
elif final_score < 0.7:
    decision = "FLAG_FOR_REVIEW"
else:
    decision = "REJECT"`,
};

"use client";

import { useState, useMemo } from "react";
import {
  Brain,
  Users,
  Code,
  Briefcase,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  BookOpen,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Timer,
  BarChart3,
  RotateCcw,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  STUDY_GUIDE_CATEGORIES,
  type QuizCategory,
  type StudyTopic,
  type QuizQuestion,
} from "@/lib/studyGuideData";

const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Users,
  Code,
  Briefcase,
};

// ─── Study Mode ──────────────────────────────────────────────────────────────

function TopicCard({
  topic,
  studied,
  onToggleStudied,
}: {
  topic: StudyTopic;
  studied: boolean;
  onToggleStudied: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [level, setLevel] = useState<"ceo" | "engineer">("ceo");

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-gray-100 transition-colors cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded); }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStudied();
          }}
          className="mt-0.5 shrink-0"
        >
          {studied ? (
            <CheckCircle size={20} className="text-emerald-400" />
          ) : (
            <Circle size={20} className="text-gray-600" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h4 className="text-foreground font-medium">{topic.title}</h4>
          <div className="flex items-center gap-2 mt-2">
            <Lightbulb size={14} className="text-amber-500 shrink-0" />
            <p className="text-sm text-amber-700/80 italic">{topic.analogy}</p>
          </div>
        </div>
        {expanded ? (
          <ChevronDown size={18} className="text-gray-500 shrink-0 mt-1" />
        ) : (
          <ChevronRight size={18} className="text-gray-500 shrink-0 mt-1" />
        )}
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-200">
          {/* Level toggle */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setLevel("ceo")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                level === "ceo"
                  ? "bg-[#0071E3] text-white"
                  : "bg-gray-200 text-gray-400 hover:text-foreground"
              }`}
            >
              Tell the CEO
            </button>
            <button
              onClick={() => setLevel("engineer")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                level === "engineer"
                  ? "bg-[#0071E3] text-white"
                  : "bg-gray-200 text-gray-400 hover:text-foreground"
              }`}
            >
              Tell the Staff Engineer
            </button>
          </div>

          {/* Explanation */}
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              {level === "ceo" ? topic.tellTheCEO : topic.tellTheEngineer}
            </p>
          </div>

          {/* Code example */}
          {topic.codeExample && (
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                Code Example
              </p>
              <div className="bg-[#0B1120] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-gray-300">
                  <code>{topic.codeExample}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Key talking points */}
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
              Key Talking Points
            </p>
            <ul className="space-y-1.5">
              {topic.keyTalkingPoints.map((point, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-400 flex items-start gap-2"
                >
                  <span className="text-[#0071E3] mt-1 shrink-0">
                    &#8226;
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function StudyMode() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [studiedTopics, setStudiedTopics] = useState<Set<string>>(new Set());

  const toggleStudied = (topicId: string) => {
    setStudiedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const category = STUDY_GUIDE_CATEGORIES.find(
    (c) => c.id === selectedCategory
  );

  if (category) {
    const studiedCount = category.topics.filter((t) =>
      studiedTopics.has(t.id)
    ).length;

    return (
      <div>
        {/* Back button + title */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
            <p className="text-xs text-gray-500">
              {studiedCount} of {category.topics.length} topics studied
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-300"
            style={{
              width: `${(studiedCount / category.topics.length) * 100}%`,
            }}
          />
        </div>

        {/* Topics */}
        <div className="space-y-3">
          {category.topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              studied={studiedTopics.has(topic.id)}
              onToggleStudied={() => toggleStudied(topic.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Category selection grid
  return (
    <div>
      <div className="mb-8">
        <h3 className="text-lg font-bold text-foreground mb-1">Study Topics</h3>
        <p className="text-sm text-gray-500">
          Select a category to study. Each topic includes analogies, code
          examples, and key talking points.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STUDY_GUIDE_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Brain;
          const studiedCount = cat.topics.filter((t) =>
            studiedTopics.has(t.id)
          ).length;
          const progress = (studiedCount / cat.topics.length) * 100;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="text-left p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#0071E3]/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-[#0071E3]/10 group-hover:bg-[#0071E3]/20 transition-colors">
                  <Icon size={20} className="text-[#0071E3]" />
                </div>
                <span className="text-xs text-gray-500">
                  {cat.topics.length} topics
                </span>
              </div>
              <h4 className="text-foreground font-medium mb-1">{cat.title}</h4>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                {cat.description}
              </p>
              {/* Progress */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">
                  {studiedCount}/{cat.topics.length}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Overall stats */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-[#0071E3]" />
            <span className="text-sm text-gray-400">
              {studiedTopics.size} of{" "}
              {STUDY_GUIDE_CATEGORIES.reduce(
                (sum, c) => sum + c.topics.length,
                0
              )}{" "}
              topics studied
            </span>
          </div>
          <span className="text-sm text-gray-400">
            {STUDY_GUIDE_CATEGORIES.reduce(
              (sum, c) => sum + c.questions.length,
              0
            )}{" "}
            total questions available
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Exam Mode ───────────────────────────────────────────────────────────────

interface ExamState {
  categoryId: string | "all";
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Map<string, string | number>;
  selfScores: Map<string, "nailed" | "partial" | "missed">;
  showResult: boolean;
  finished: boolean;
  timerEnabled: boolean;
  timePerQuestion: number;
}

function MultipleChoiceQuestion({
  question,
  selectedIndex,
  onSelect,
  showResult,
}: {
  question: QuizQuestion;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  showResult: boolean;
}) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div className="space-y-3">
      {question.options?.map((option, i) => {
        let borderColor = "border-gray-200";
        let bg = "bg-gray-50";

        if (showResult && i === question.correctIndex) {
          borderColor = "border-emerald-400/50";
          bg = "bg-emerald-400/5";
        } else if (
          showResult &&
          selectedIndex === i &&
          i !== question.correctIndex
        ) {
          borderColor = "border-red-400/50";
          bg = "bg-red-400/5";
        } else if (!showResult && selectedIndex === i) {
          borderColor = "border-[#0071E3]/50";
          bg = "bg-[#0071E3]/5";
        }

        return (
          <button
            key={i}
            onClick={() => !showResult && onSelect(i)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded-xl border ${borderColor} ${bg} transition-all flex items-start gap-3 ${
              !showResult ? "hover:border-[#0071E3]/30 cursor-pointer" : ""
            }`}
          >
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                showResult && i === question.correctIndex
                  ? "bg-emerald-400/20 text-emerald-400"
                  : showResult &&
                      selectedIndex === i &&
                      i !== question.correctIndex
                    ? "bg-red-400/20 text-red-400"
                    : !showResult && selectedIndex === i
                      ? "bg-[#0071E3]/20 text-[#0071E3]"
                      : "bg-gray-200 text-gray-500"
              }`}
            >
              {labels[i]}
            </span>
            <span className="text-sm text-gray-300">{option}</span>
          </button>
        );
      })}
    </div>
  );
}

function OpenEndedQuestion({
  answer,
  onChange,
  showResult,
  modelAnswer,
}: {
  answer: string;
  onChange: (val: string) => void;
  showResult: boolean;
  modelAnswer?: string;
}) {
  return (
    <div className="space-y-4">
      <textarea
        value={answer}
        onChange={(e) => onChange(e.target.value)}
        disabled={showResult}
        rows={6}
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-foreground placeholder-gray-400 focus:outline-none focus:border-[#0071E3] resize-none text-sm disabled:opacity-60"
        placeholder="Type your answer here..."
      />
      {showResult && modelAnswer && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
            Model Answer
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">{modelAnswer}</p>
        </div>
      )}
    </div>
  );
}

function SelfScore({
  onScore,
  currentScore,
}: {
  onScore: (score: "nailed" | "partial" | "missed") => void;
  currentScore?: "nailed" | "partial" | "missed";
}) {
  const options: { value: "nailed" | "partial" | "missed"; label: string; color: string }[] = [
    { value: "nailed", label: "Nailed It", color: "emerald" },
    { value: "partial", label: "Partial", color: "amber" },
    { value: "missed", label: "Missed It", color: "red" },
  ];

  return (
    <div className="flex gap-2">
      <span className="text-xs text-gray-500 self-center mr-2">
        How did you do?
      </span>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onScore(opt.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            currentScore === opt.value
              ? opt.color === "emerald"
                ? "bg-emerald-400/20 text-emerald-400"
                : opt.color === "amber"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-red-400/20 text-red-400"
              : "bg-gray-200 text-gray-500 hover:text-gray-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ExamResults({
  exam,
  onRetake,
  onReview,
  onExit,
}: {
  exam: ExamState;
  onRetake: () => void;
  onReview: () => void;
  onExit: () => void;
}) {
  const totalQuestions = exam.questions.length;
  const mcQuestions = exam.questions.filter((q) => q.type === "multiple_choice");
  const mcCorrect = mcQuestions.filter(
    (q) => exam.answers.get(q.id) === q.correctIndex
  ).length;

  const selfScored = exam.questions.filter((q) => q.type !== "multiple_choice");
  const nailed = selfScored.filter(
    (q) => exam.selfScores.get(q.id) === "nailed"
  ).length;
  const partial = selfScored.filter(
    (q) => exam.selfScores.get(q.id) === "partial"
  ).length;

  const totalCorrect = mcCorrect + nailed;
  const totalPartial = partial;
  const score = Math.round(
    ((totalCorrect + totalPartial * 0.5) / totalQuestions) * 100
  );

  const grade =
    score >= 90
      ? "A"
      : score >= 80
        ? "B"
        : score >= 70
          ? "C"
          : score >= 60
            ? "D"
            : "F";
  const gradeColor =
    score >= 80
      ? "text-emerald-400"
      : score >= 60
        ? "text-amber-600"
        : "text-red-400";

  // Per-category breakdown
  const categoryBreakdown = STUDY_GUIDE_CATEGORIES.map((cat) => {
    const catQuestions = exam.questions.filter((q) =>
      cat.questions.some((cq) => cq.id === q.id)
    );
    if (catQuestions.length === 0) return null;

    const catMc = catQuestions.filter((q) => q.type === "multiple_choice");
    const catMcCorrect = catMc.filter(
      (q) => exam.answers.get(q.id) === q.correctIndex
    ).length;
    const catSelf = catQuestions.filter((q) => q.type !== "multiple_choice");
    const catNailed = catSelf.filter(
      (q) => exam.selfScores.get(q.id) === "nailed"
    ).length;
    const catPartial = catSelf.filter(
      (q) => exam.selfScores.get(q.id) === "partial"
    ).length;
    const catScore = Math.round(
      ((catMcCorrect + catNailed + catPartial * 0.5) / catQuestions.length) * 100
    );

    return { title: cat.title, score: catScore, total: catQuestions.length };
  }).filter(Boolean) as { title: string; score: number; total: number }[];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Score circle */}
      <div className="text-center">
        <div className="inline-flex flex-col items-center p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <span className={`text-6xl font-bold ${gradeColor}`}>{grade}</span>
          <span className="text-3xl font-bold text-foreground mt-2">{score}%</span>
          <span className="text-sm text-gray-500 mt-1">
            {totalCorrect} correct, {totalPartial} partial out of{" "}
            {totalQuestions}
          </span>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          Category Breakdown
        </h4>
        {categoryBreakdown.map((cat) => (
          <div key={cat.title} className="flex items-center gap-3">
            <span className="text-sm text-gray-400 w-48 truncate">
              {cat.title}
            </span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className={`h-full rounded-full transition-all ${
                  cat.score >= 80
                    ? "bg-emerald-400"
                    : cat.score >= 60
                      ? "bg-amber-400"
                      : "bg-red-400"
                }`}
                style={{ width: `${cat.score}%` }}
              />
            </div>
            <span className="text-sm text-gray-400 w-12 text-right">
              {cat.score}%
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onReview}
          className="px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-300 text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <BookOpen size={16} />
          Review Answers
        </button>
        <button
          onClick={onRetake}
          className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm hover:bg-[#0077ED] transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Retake
        </button>
        <button
          onClick={onExit}
          className="px-5 py-2.5 rounded-full bg-gray-200 text-gray-400 text-sm hover:text-foreground transition-colors flex items-center gap-2"
        >
          <X size={16} />
          Exit
        </button>
      </div>
    </div>
  );
}

function ExamMode() {
  const [exam, setExam] = useState<ExamState | null>(null);
  const [selectingCategory, setSelectingCategory] = useState(true);

  const startExam = (categoryId: string | "all") => {
    let questions: QuizQuestion[];
    if (categoryId === "all") {
      questions = STUDY_GUIDE_CATEGORIES.flatMap((c) => c.questions);
    } else {
      const cat = STUDY_GUIDE_CATEGORIES.find((c) => c.id === categoryId);
      questions = cat?.questions || [];
    }

    // Shuffle questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);

    setExam({
      categoryId,
      questions: shuffled,
      currentIndex: 0,
      answers: new Map(),
      selfScores: new Map(),
      showResult: false,
      finished: false,
      timerEnabled: false,
      timePerQuestion: 60,
    });
    setSelectingCategory(false);
  };

  const submitAnswer = () => {
    if (!exam) return;
    setExam({ ...exam, showResult: true });
  };

  const nextQuestion = () => {
    if (!exam) return;
    if (exam.currentIndex >= exam.questions.length - 1) {
      setExam({ ...exam, finished: true });
    } else {
      setExam({
        ...exam,
        currentIndex: exam.currentIndex + 1,
        showResult: false,
      });
    }
  };

  const setAnswer = (questionId: string, answer: string | number) => {
    if (!exam) return;
    const newAnswers = new Map(exam.answers);
    newAnswers.set(questionId, answer);
    setExam({ ...exam, answers: newAnswers });
  };

  const setSelfScore = (
    questionId: string,
    score: "nailed" | "partial" | "missed"
  ) => {
    if (!exam) return;
    const newScores = new Map(exam.selfScores);
    newScores.set(questionId, score);
    setExam({ ...exam, selfScores: newScores });
  };

  // Category selection
  if (selectingCategory || !exam) {
    return (
      <div>
        <div className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-1">Start an Exam</h3>
          <p className="text-sm text-gray-500">
            Choose a category or take the full exam covering all topics.
          </p>
        </div>

        <div className="space-y-3">
          {/* Full exam */}
          <button
            onClick={() => startExam("all")}
            className="w-full text-left p-5 bg-gray-50 rounded-xl border border-[#0071E3]/30 hover:border-[#0071E3]/60 transition-all flex items-center gap-4"
          >
            <div className="p-2.5 rounded-lg bg-[#0071E3]/10">
              <GraduationCap size={20} className="text-[#0071E3]" />
            </div>
            <div className="flex-1">
              <h4 className="text-foreground font-medium">Full Exam</h4>
              <p className="text-xs text-gray-500">
                All categories,{" "}
                {STUDY_GUIDE_CATEGORIES.reduce(
                  (sum, c) => sum + c.questions.length,
                  0
                )}{" "}
                questions
              </p>
            </div>
            <ArrowRight size={18} className="text-gray-500" />
          </button>

          {/* Per category */}
          {STUDY_GUIDE_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Brain;
            return (
              <button
                key={cat.id}
                onClick={() => startExam(cat.id)}
                className="w-full text-left p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#0071E3]/30 transition-all flex items-center gap-4"
              >
                <div className="p-2.5 rounded-lg bg-[#0071E3]/10">
                  <Icon size={20} className="text-[#0071E3]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground font-medium">{cat.title}</h4>
                  <p className="text-xs text-gray-500">
                    {cat.questions.length} questions
                  </p>
                </div>
                <ArrowRight size={18} className="text-gray-500" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Results
  if (exam.finished) {
    return (
      <ExamResults
        exam={exam}
        onRetake={() => startExam(exam.categoryId)}
        onReview={() => {
          setExam({ ...exam, currentIndex: 0, finished: false, showResult: true });
        }}
        onExit={() => {
          setExam(null);
          setSelectingCategory(true);
        }}
      />
    );
  }

  // Active question
  const question = exam.questions[exam.currentIndex];
  const currentAnswer = exam.answers.get(question.id);
  const currentSelfScore = exam.selfScores.get(question.id);
  const hasAnswered =
    question.type === "multiple_choice"
      ? currentAnswer !== undefined
      : typeof currentAnswer === "string" && currentAnswer.length > 0;

  const typeLabel =
    question.type === "multiple_choice"
      ? "Multiple Choice"
      : question.type === "open_ended"
        ? "Open Ended"
        : "Scenario";
  const typeColor =
    question.type === "multiple_choice"
      ? "bg-[#0071E3]/10 text-[#0071E3]"
      : question.type === "open_ended"
        ? "bg-emerald-400/10 text-emerald-400"
        : "bg-amber-50 text-amber-600";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            setExam(null);
            setSelectingCategory(true);
          }}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {exam.currentIndex + 1} / {exam.questions.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-1 bg-gray-200 rounded-full mb-8">
        <div
          className="h-full bg-[#0071E3] rounded-full transition-all duration-300"
          style={{
            width: `${((exam.currentIndex + 1) / exam.questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${typeColor} mb-3 inline-block`}>
          {typeLabel}
        </span>
        <h3 className="text-lg text-foreground font-medium leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Answer area */}
      {question.type === "multiple_choice" ? (
        <MultipleChoiceQuestion
          question={question}
          selectedIndex={
            typeof currentAnswer === "number" ? currentAnswer : null
          }
          onSelect={(i) => setAnswer(question.id, i)}
          showResult={exam.showResult}
        />
      ) : (
        <OpenEndedQuestion
          answer={typeof currentAnswer === "string" ? currentAnswer : ""}
          onChange={(val) => setAnswer(question.id, val)}
          showResult={exam.showResult}
          modelAnswer={question.modelAnswer}
        />
      )}

      {/* Explanation (shown after submit) */}
      {exam.showResult && (
        <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
            Explanation
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Self-score for non-MC questions */}
      {exam.showResult && question.type !== "multiple_choice" && (
        <div className="mt-4">
          <SelfScore
            onScore={(score) => setSelfScore(question.id, score)}
            currentScore={currentSelfScore}
          />
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-3">
        {!exam.showResult ? (
          <button
            onClick={submitAnswer}
            disabled={!hasAnswered}
            className="px-6 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium hover:bg-[#0077ED] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Submit Answer
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium hover:bg-[#0077ED] transition-colors flex items-center gap-2"
          >
            {exam.currentIndex >= exam.questions.length - 1
              ? "View Results"
              : "Next Question"}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

export default function StudyGuidePanel() {
  const [mode, setMode] = useState<"study" | "exam">("study");

  return (
    <div className="p-8 h-[calc(100vh-120px)] overflow-y-auto">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setMode("study")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
            mode === "study"
              ? "bg-[#0071E3] text-white"
              : "bg-gray-50 text-gray-400 hover:text-foreground border border-gray-200"
          }`}
        >
          <BookOpen size={16} />
          Study Mode
        </button>
        <button
          onClick={() => setMode("exam")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
            mode === "exam"
              ? "bg-[#0071E3] text-white"
              : "bg-gray-50 text-gray-400 hover:text-foreground border border-gray-200"
          }`}
        >
          <GraduationCap size={16} />
          Exam Mode
        </button>
      </div>

      {/* Content */}
      <div>
        {mode === "study" ? <StudyMode /> : <ExamMode />}
      </div>
    </div>
  );
}

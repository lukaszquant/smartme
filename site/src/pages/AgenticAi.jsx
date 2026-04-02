import { useDocumentHead } from "../hooks";
import AgenticAiGuide from "@pub/agentic_ai/claude-code-mastery-visual.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function AgenticAi() {
  useDocumentHead("Agentic AI — Interactive", "Interactive guide to mastering Claude Code as an agentic system");
  return (
    <>
      <GuideTranscriptBar essayPath="/agentic-ai" color="#3b82f6" />
      <AgenticAiGuide />
      <GuideTranscriptBar essayPath="/agentic-ai" color="#3b82f6" />
    </>
  );
}

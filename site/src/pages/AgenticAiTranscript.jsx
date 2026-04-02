import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/agentic-ai.html?raw";

export default function AgenticAiTranscript() {
  return (
    <TranscriptPage
      title="Claude Code as Your Agent"
      subtitle="Making the most of what you already have · ~24 min listen"
      html={html}
      interactivePath="/agentic-ai/interactive"
      downloadFile="/downloads/agentic-ai-transcript.docx"
      color="#3b82f6"
    />
  );
}

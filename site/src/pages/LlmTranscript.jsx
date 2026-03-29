import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/llm.html?raw";

export default function LlmTranscript() {
  return (
    <TranscriptPage
      title="How Large Language Models Work"
      subtitle="From autocomplete to emergent intelligence · a walking guide"
      html={html}
      interactivePath="/llm/interactive"
      downloadFile="/downloads/llm-transcript.docx"
      color="#e94560"
    />
  );
}

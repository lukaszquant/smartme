import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/hard-to-vary.html?raw";

export default function HardToVaryTranscript() {
  return (
    <TranscriptPage
      title="The Hard-to-Vary Criterion"
      subtitle="What separates good explanations from bad ones · Based on David Deutsch"
      html={html}
      interactivePath="/hard-to-vary/interactive"
      downloadFile="/downloads/hard-to-vary-transcript.docx"
      color="#e8c547"
    />
  );
}

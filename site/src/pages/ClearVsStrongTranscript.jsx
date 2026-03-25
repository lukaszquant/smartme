import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/clear-vs-strong.html?raw";

export default function ClearVsStrongTranscript() {
  return (
    <TranscriptPage
      title="The Expert Blind Spot"
      subtitle="Clear intuitions, strong intuitions, and why intelligence makes it worse · Based on Kahneman & Duke"
      html={html}
      interactivePath="/clear-vs-strong/interactive"
      downloadFile="/downloads/clear-vs-strong-transcript.docx"
      color="#c8a96e"
    />
  );
}

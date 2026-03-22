import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/double-slit.html?raw";

export default function DoubleSlitTranscript() {
  return (
    <TranscriptPage
      title="The Double Slit Experiment"
      subtitle="A walking script on the most important experiment in all of physics"
      html={html}
      interactivePath="/double-slit/interactive"
      downloadFile="/downloads/double-slit-transcript.docx"
      color="#e05050"
    />
  );
}

import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/double-slit.html?raw";

export default function DoubleSlitTranscript() {
  return (
    <TranscriptPage
      title="The Double Slit Experiment"
      subtitle="The most important experiment in all of physics · ~22 min listen"
      html={html}
      interactivePath="/double-slit/interactive"
      downloadFile="/downloads/double-slit-transcript.docx"
      color="#e05050"
    />
  );
}

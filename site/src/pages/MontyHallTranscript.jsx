import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/monty-hall.html?raw";

export default function MontyHallTranscript() {
  return (
    <TranscriptPage
      title="The Monty Hall Problem"
      subtitle="A walking audiobook — why you should always switch doors"
      html={html}
      interactivePath="/monty-hall/interactive"
      downloadFile="/downloads/monty-hall-transcript.docx"
      color="#f0c040"
    />
  );
}

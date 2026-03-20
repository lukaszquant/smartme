import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/fine-tuning.html?raw";

export default function FineTuningTranscript() {
  return (
    <TranscriptPage
      title="Why Is the Universe Just Right?"
      subtitle="A walking narration on fine-tuning, the multiverse, and why the answer might be wrong"
      html={html}
      guidePath="/fine-tuning"
      downloadFile="/downloads/fine-tuning-transcript.docx"
      color="#a78bfa"
    />
  );
}

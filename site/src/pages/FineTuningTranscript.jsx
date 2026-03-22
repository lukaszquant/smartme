import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/fine-tuning.html?raw";

export default function FineTuningTranscript() {
  return (
    <TranscriptPage
      title="Why Is the Universe Just Right?"
      subtitle="Fine-tuning, the multiverse, and why the answer might be wrong · ~10 min listen"
      html={html}
      interactivePath="/fine-tuning/interactive"
      downloadFile="/downloads/fine-tuning-transcript.docx"
      color="#a78bfa"
    />
  );
}

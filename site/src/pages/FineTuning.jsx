import FineTuningGuide from "@pub/fine_tuning/why-is-the-universe-just-right.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

const transcriptProps = {
  transcriptPath: "/fine-tuning/transcript",
  downloadFile: "/downloads/fine-tuning-transcript.docx",
  color: "#a78bfa",
};

export default function FineTuning() {
  return (
    <>
      <GuideTranscriptBar {...transcriptProps} />
      <FineTuningGuide />
      <GuideTranscriptBar {...transcriptProps} />
    </>
  );
}

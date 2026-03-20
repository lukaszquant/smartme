import { useDocumentHead } from "../hooks";
import FineTuningGuide from "@pub/fine_tuning/why-is-the-universe-just-right.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function FineTuning() {
  useDocumentHead("Why Is the Universe Just Right? — Interactive", "Interactive explainer on fine-tuning and the multiverse");
  return (
    <>
      <GuideTranscriptBar essayPath="/fine-tuning" color="#a78bfa" />
      <FineTuningGuide />
      <GuideTranscriptBar essayPath="/fine-tuning" color="#a78bfa" />
    </>
  );
}

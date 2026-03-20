import FineTuningGuide from "@pub/fine_tuning/why-is-the-universe-just-right.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function FineTuning() {
  return (
    <>
      <GuideTranscriptBar essayPath="/fine-tuning" color="#a78bfa" />
      <FineTuningGuide />
      <GuideTranscriptBar essayPath="/fine-tuning" color="#a78bfa" />
    </>
  );
}

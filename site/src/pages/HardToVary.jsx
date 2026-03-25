import { useDocumentHead } from "../hooks";
import HardToVaryGuide from "@pub/explanation/hard-to-vary.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function HardToVary() {
  useDocumentHead("Hard to Vary — Interactive", "Interactive guide to David Deutsch's hard-to-vary criterion for good explanations");
  return (
    <>
      <GuideTranscriptBar essayPath="/hard-to-vary" color="#e8c547" />
      <HardToVaryGuide />
      <GuideTranscriptBar essayPath="/hard-to-vary" color="#e8c547" />
    </>
  );
}

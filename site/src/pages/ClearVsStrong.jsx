import { useDocumentHead } from "../hooks";
import KahnemanVisuals from "@pub/clear_vs_strong/kahneman_visuals_v3.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function ClearVsStrong() {
  useDocumentHead("Clear vs Strong — Interactive", "Interactive Kahneman visuals on why clear intuitions are often weak predictions");
  return (
    <>
      <GuideTranscriptBar essayPath="/clear-vs-strong" color="#c8a96e" />
      <KahnemanVisuals />
      <GuideTranscriptBar essayPath="/clear-vs-strong" color="#c8a96e" />
    </>
  );
}

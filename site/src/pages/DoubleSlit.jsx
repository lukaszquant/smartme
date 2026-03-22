import { useDocumentHead } from "../hooks";
import DoubleSlitGuide from "@pub/double_slit/double-slit.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function DoubleSlit() {
  useDocumentHead("Double Slit — Interactive", "Interactive double slit experiment explainer with live visualizations");
  return (
    <>
      <GuideTranscriptBar essayPath="/double-slit" color="#e05050" />
      <DoubleSlitGuide />
      <GuideTranscriptBar essayPath="/double-slit" color="#e05050" />
    </>
  );
}

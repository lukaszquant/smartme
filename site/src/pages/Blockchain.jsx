import { useDocumentHead } from "../hooks";
import BlockchainGuide from "@pub/blockchain/blockchain-guide.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function Blockchain() {
  useDocumentHead("Blockchain — Interactive", "Interactive blockchain explainer with live visualizations");
  return (
    <>
      <GuideTranscriptBar essayPath="/blockchain" color="#42b4f5" />
      <BlockchainGuide />
      <GuideTranscriptBar essayPath="/blockchain" color="#42b4f5" />
    </>
  );
}

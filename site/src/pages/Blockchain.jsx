import BlockchainGuide from "@pub/blockchain/blockchain-guide.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function Blockchain() {
  return (
    <>
      <GuideTranscriptBar essayPath="/blockchain" color="#42b4f5" />
      <BlockchainGuide />
      <GuideTranscriptBar essayPath="/blockchain" color="#42b4f5" />
    </>
  );
}

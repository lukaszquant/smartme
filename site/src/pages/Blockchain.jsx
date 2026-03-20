import BlockchainGuide from "@pub/blockchain/blockchain-guide.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

const transcriptProps = {
  transcriptPath: "/blockchain/transcript",
  downloadFile: "/downloads/blockchain-transcript.docx",
  color: "#42b4f5",
};

export default function Blockchain() {
  return (
    <>
      <GuideTranscriptBar {...transcriptProps} />
      <BlockchainGuide />
      <GuideTranscriptBar {...transcriptProps} />
    </>
  );
}

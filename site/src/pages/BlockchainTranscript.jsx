import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/blockchain.html?raw";

export default function BlockchainTranscript() {
  return (
    <TranscriptPage
      title="Blockchain Explained"
      subtitle="A walk-friendly audio transcript with everyday analogies and real-world examples"
      html={html}
      interactivePath="/blockchain/interactive"
      downloadFile="/downloads/blockchain-transcript.docx"
      color="#42b4f5"
    />
  );
}

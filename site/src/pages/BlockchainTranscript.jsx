import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/blockchain.html?raw";

export default function BlockchainTranscript() {
  return (
    <TranscriptPage
      title="Blockchain Explained"
      subtitle="A walk-friendly guide with everyday analogies · ~35 min listen"
      html={html}
      interactivePath="/blockchain/interactive"
      downloadFile="/downloads/blockchain-transcript.docx"
      color="#42b4f5"
    />
  );
}

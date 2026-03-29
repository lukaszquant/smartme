import TranscriptPage from "../components/TranscriptPage";
import html from "./transcripts/group-power.html?raw";

export default function GroupPowerTranscript() {
  return (
    <TranscriptPage
      title="The Power of the Group"
      subtitle="Why groups make better decisions — when structured right"
      html={html}
      interactivePath="/group-power/interactive"
      downloadFile="/downloads/group-power-transcript.docx"
      color="#3a9e6e"
    />
  );
}

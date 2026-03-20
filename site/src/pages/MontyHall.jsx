import MontyHallGuide from "@pub/montyhall/monty-hall.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

const transcriptProps = {
  transcriptPath: "/monty-hall/transcript",
  downloadFile: "/downloads/monty-hall-transcript.docx",
  color: "#f0c040",
};

export default function MontyHall() {
  return (
    <>
      <GuideTranscriptBar {...transcriptProps} />
      <MontyHallGuide />
      <GuideTranscriptBar {...transcriptProps} />
    </>
  );
}

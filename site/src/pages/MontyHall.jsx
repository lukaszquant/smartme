import MontyHallGuide from "@pub/montyhall/monty-hall.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function MontyHall() {
  return (
    <>
      <GuideTranscriptBar essayPath="/monty-hall" color="#f0c040" />
      <MontyHallGuide />
      <GuideTranscriptBar essayPath="/monty-hall" color="#f0c040" />
    </>
  );
}

import { useDocumentHead } from "../hooks";
import MontyHallGuide from "@pub/montyhall/monty-hall.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function MontyHall() {
  useDocumentHead("The Monty Hall Problem — Interactive", "Interactive Monty Hall simulation with step-by-step walkthrough");
  return (
    <>
      <GuideTranscriptBar essayPath="/monty-hall" color="#f0c040" />
      <MontyHallGuide />
      <GuideTranscriptBar essayPath="/monty-hall" color="#f0c040" />
    </>
  );
}

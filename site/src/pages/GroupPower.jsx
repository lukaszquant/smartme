import { useDocumentHead } from "../hooks";
import PowerOfTheGroup from "@pub/group_power/power-of-the-group.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function GroupPower() {
  useDocumentHead("Power of the Group — Interactive", "Interactive guide to group decision-making with live visualizations");
  return (
    <>
      <GuideTranscriptBar essayPath="/group-power" color="#3a9e6e" />
      <PowerOfTheGroup />
      <GuideTranscriptBar essayPath="/group-power" color="#3a9e6e" />
    </>
  );
}

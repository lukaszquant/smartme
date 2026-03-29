import { useDocumentHead } from "../hooks";
import LlmExplainer from "@pub/llm/llm-explainer.jsx";
import { GuideTranscriptBar } from "../components/GuideFooter";

export default function Llm() {
  useDocumentHead("LLMs Explained — Interactive", "Interactive explainer on how large language models work");
  return (
    <>
      <GuideTranscriptBar essayPath="/llm" color="#e94560" />
      <LlmExplainer />
      <GuideTranscriptBar essayPath="/llm" color="#e94560" />
    </>
  );
}

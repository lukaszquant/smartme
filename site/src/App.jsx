import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Blockchain from "./pages/Blockchain";
import FineTuning from "./pages/FineTuning";
import MontyHall from "./pages/MontyHall";
import BlockchainTranscript from "./pages/BlockchainTranscript";
import FineTuningTranscript from "./pages/FineTuningTranscript";
import MontyHallTranscript from "./pages/MontyHallTranscript";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/blockchain/transcript" element={<BlockchainTranscript />} />
        <Route path="/fine-tuning" element={<FineTuning />} />
        <Route path="/fine-tuning/transcript" element={<FineTuningTranscript />} />
        <Route path="/monty-hall" element={<MontyHall />} />
        <Route path="/monty-hall/transcript" element={<MontyHallTranscript />} />
      </Routes>
    </Layout>
  );
}

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
        <Route path="/blockchain" element={<BlockchainTranscript />} />
        <Route path="/blockchain/interactive" element={<Blockchain />} />
        <Route path="/fine-tuning" element={<FineTuningTranscript />} />
        <Route path="/fine-tuning/interactive" element={<FineTuning />} />
        <Route path="/monty-hall" element={<MontyHallTranscript />} />
        <Route path="/monty-hall/interactive" element={<MontyHall />} />
      </Routes>
    </Layout>
  );
}

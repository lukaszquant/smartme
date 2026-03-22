import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./hooks";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Blockchain from "./pages/Blockchain";
import FineTuning from "./pages/FineTuning";
import MontyHall from "./pages/MontyHall";
import BlockchainTranscript from "./pages/BlockchainTranscript";
import FineTuningTranscript from "./pages/FineTuningTranscript";
import MontyHallTranscript from "./pages/MontyHallTranscript";
import DoubleSlit from "./pages/DoubleSlit";
import DoubleSlitTranscript from "./pages/DoubleSlitTranscript";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blockchain" element={<BlockchainTranscript />} />
        <Route path="/blockchain/interactive" element={<Blockchain />} />
        <Route path="/fine-tuning" element={<FineTuningTranscript />} />
        <Route path="/fine-tuning/interactive" element={<FineTuning />} />
        <Route path="/monty-hall" element={<MontyHallTranscript />} />
        <Route path="/monty-hall/interactive" element={<MontyHall />} />
        <Route path="/double-slit" element={<DoubleSlitTranscript />} />
        <Route path="/double-slit/interactive" element={<DoubleSlit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

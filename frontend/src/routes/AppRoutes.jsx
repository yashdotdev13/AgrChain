import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import AddProducePage from "../pages/AddProducePage";
import MyProducePage from "../pages/MyProducePage";
import TransferProducePage from "../pages/TransferProducePage";
import ProduceDetailPage from "../pages/ProduceDetailPage";
import ActorsPage from "../pages/ActorsPage"; // New import
import CreateActorForm from "../pages/CreateActorForm";
import ProduceHistoryPage from "../pages/ProduceHistoryPage"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/produce/add" element={<AddProducePage />} />
      <Route path="/my-produce" element={<MyProducePage />} />
      <Route path="/transfer-produce" element={<TransferProducePage />} />
      <Route path="/produce/:id" element={<ProduceDetailPage />} />

        <Route path="/actors/create" element={<CreateActorForm />} /> {/* <-- new */}
      
      <Route path="/actors" element={<ActorsPage />} /> {/* New route */}

        <Route path="/produce-history/:id" element={<ProduceHistoryPage />} /> 
    </Routes>
  );
}

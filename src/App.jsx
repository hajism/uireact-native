import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

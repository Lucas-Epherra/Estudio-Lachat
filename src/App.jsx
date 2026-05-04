import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ConsultationPage from "./pages/ConsultationPage";

/**
 * App define las rutas principales del sitio.
 *
 * /         → landing comercial
 * /consulta → formulario formal conectado a Supabase
 */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consulta" element={<ConsultationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
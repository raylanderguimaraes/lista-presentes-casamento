import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import ListPresents from "@/pages/listPresents";
import Login from "@/pages/login";
import Register from "@/pages/register";

// import Bride from "@/pages/bride";
// import Guests from "@/pages/guests";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/presentes" element={<ListPresents />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Register />} />
      {/* As rotas abaixo serão rotas protegidas */}
      {/* <Route path="/noivos" element={<Bride />} />
      <Route path="/convidados" element={<Guests />} /> */}
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import ListPresents from "@/pages/listPresents";
import Login from "@/pages/login";
export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/presentes" element={<ListPresents />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

//As Rotas abaixo são somente para lembrar quando for fazer e separar as responsabilidades das rotas, rotas protegidas por exemplo.
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/presentes",
//         element: <ListPresents />,
//       },
//       {
//         path: "/noivos",
//         element: <Bride />,
//       },
//       {
//         path: "/convidados",
//         element: <Guests />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//     ],
//   },
// ]);

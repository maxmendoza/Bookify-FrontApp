// AdminRoute.jsx
import { Routes, Route } from "react-router-dom";
import AdminNavBar from '../components/navBar/Admin/NavBar';
import TablaLibro from "../pages/Admin/TablaLibro";
import TablaUsuario from "../pages/Admin/TablaUsuario";
import ServerError from "../pages/Errors/ServerError";
import Unauthorized from "../pages/Errors/Unauthorized";
import NotFound from "../pages/Errors/NotFound";
import PerfilAdmin from "../pages/Admin/PerfilAdmin";

export default function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path="dataBooks" element={<TablaLibro />} />
        <Route path="dataUsers" element={<TablaUsuario />} />
        <Route path="profile" element={<PerfilAdmin />} />
        <Route path="/" element={<PerfilAdmin />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

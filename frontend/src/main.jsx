import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Main from "./Components/Main.jsx";
import Events, { AddMP, CheckMP } from "./Components/Events/Events.jsx";
import Login from "./Components/Auth/Login.jsx";
import SelectRole from "./Components/Profile/Main_Profile.jsx";
import DF_User, { ORG_User } from "./Components/Profile/User.jsx";
import Register from "./Components/Auth/Register.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Main />} />

      <Route path="events">
        <Route index element={<Events />} />
        <Route path=":id" element={<CheckMP />} />
        <Route path="add" element={<AddMP />} />
      </Route>

      <Route path="auth">
        <Route index element={<Login />} />
        <Route path="r" element={<Register />} />
      </Route>

      <Route path="profile">
        <Route index element={<SelectRole />} />
        <Route path="u" element={<DF_User />} />
        <Route path="o" element={<ORG_User />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

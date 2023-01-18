import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/layout/Layout";
import SelectTeacherPage from "./pages/SelectTeacherPage/SelectTeacherPage";
import SelectSchedulePage from "./pages/SelectSchedulePage/SelectSchedulePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/*" element={<Layout />} /> */}
        <Route index element={<LoginPage />} />
        <Route path="inicio" element={<HomePage />} />
        <Route path="agenda" element={<SchedulePage />} />
        <Route path="usuarios" element={<UsersPage />} />
        <Route path="usuarios/:id" element={<UserPage />} />
        <Route path="docentes" element={<SelectTeacherPage />} />
        <Route path="/docentes/agendar/:id" element={<SelectSchedulePage />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="/login" element={<LoginPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

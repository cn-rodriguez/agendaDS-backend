import React, { useContext } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
// import Layout from "./components/layout/Layout";
import SelectTeacherPage from "./pages/SelectTeacherPage/SelectTeacherPage";
import SelectSchedulePage from "./pages/SelectSchedulePage/SelectSchedulePage";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeTeacher from "./pages/HomeTeacher";

//* CONTEXT
import LoginState from "./context/Login/LoginState";
import LoginContext from "./context/Login/LoginContext";
import LoginPersistent from "./components/LoginPersistent";

//* PAGES
import ScheduleTeacherPage from "./pages/ScheduleTeacherPage";
import HomeAdmin from "./pages/HomeAdmin";
import UsersAdminPage from "./pages/UsersAdminPage";
import MeetingsAdminPage from "./pages/MeetingsAdminPage";
import ManageMeetingsPage from "./pages/ManageMeetingsPage";
import ScheduleHeadmasterPage from "./pages/ScheduleHeadmasterPage";
import ScheduleManagerTeacherPage from "./pages/ScheduleManagerTeacherPage";

export default function App() {
  return (
    <LoginState>
      <LoginPersistent>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="inicio" element={<HomePage />} />
              <Route path="agenda" element={<SchedulePage />} />
              <Route path="docentes" element={<SelectTeacherPage />} />
              <Route
                path="/docentes/agendar/:id"
                element={<SelectSchedulePage />}
              />
            </Route>
            <Route element={<ProtectedRoute isAllowed={"teacher"} />}>
              <Route path="profesor" element={<HomeTeacher />} />
              <Route path="agenda_profesor" element={<ScheduleTeacherPage />} />
              <Route path="horarios" element={<ScheduleManagerTeacherPage />} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={"admin"} />}>
              <Route path="directora" element={<HomeAdmin />} />
              <Route path="usuarios" element={<UsersAdminPage />} />
              <Route
                path="agenda_directora"
                element={<ScheduleHeadmasterPage />}
              />
              <Route path="reuniones" element={<MeetingsAdminPage />} />
              <Route
                path="reuniones/:id/panel"
                element={<ManageMeetingsPage />}
              />

              {/* <Route path="agenda_profesor" element={<ScheduleTeacherPage />} /> */}
            </Route>
            {/* <Route path="usuarios" element={<UsersPage />} /> */}
            {/* <Route path="usuarios/:id" element={<UserPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </LoginPersistent>
    </LoginState>
  );
}

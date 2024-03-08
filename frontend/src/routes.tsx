import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./pages/login/Login";
import Step2 from "./pages/login-step-2/Step2";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/password" element={<Step2 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
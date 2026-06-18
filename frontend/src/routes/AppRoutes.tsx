import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";


function AppRoutes() {

    return (

        <Routes>


            <Route
                path="/"
                element={<Navigate to="/login" />}
            />


            <Route
                path="/login"
                element={<Login />}
            />


            <Route element={<ProtectedRoute />}>

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />


                    <Route
                        path="/students"
                        element={<Students />}
                    />


                </Route>

            </Route>


        </Routes>

    );

}


export default AppRoutes;
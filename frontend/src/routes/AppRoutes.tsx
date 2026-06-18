import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import DashboardLayout from "../layouts/DashboardLayout";
import Students from "../pages/Students";



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



            <Route
                element={<DashboardLayout />}
            >


                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route
                    path="/students"
                    element={<Students />}
                />


            </Route>



        </Routes>

    );

}


export default AppRoutes;
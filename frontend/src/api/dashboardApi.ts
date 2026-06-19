import axios from "./axios";


export type DashboardStats = {

    students: number;

    departments: number;

};



export type DepartmentCount = {

    department: string;

    count: number;

};





export const getDashboardStats = async () => {


    const response =
        await axios.get<DashboardStats>(
            "/api/dashboard/stats"
        );


    return response.data;


};







export const getDepartmentCounts = async () => {


    const response =
        await axios.get<DepartmentCount[]>(
            "/api/dashboard/departments"
        );


    return response.data;


};
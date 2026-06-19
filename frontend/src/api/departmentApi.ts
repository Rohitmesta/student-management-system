import axios from "./axios";



export type Department = {

    id: number;

    code: string;

    name: string;

    hodName: string;

};





export const getDepartments = async () => {


    const response =
        await axios.get<Department[]>(
            "/api/departments"
        );


    return response.data;


};
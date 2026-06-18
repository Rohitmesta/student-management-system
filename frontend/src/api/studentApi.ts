import axios from "./axios";


export type Student = {

    id: number;

    name: string;

    email: string;

};



export const getStudents = async () => {

    const response =
        await axios.get("/api/students");

    return response.data;

};



export const createStudent = async (
    data: {
        name: string;
        email: string;
    }
) => {


    const response =
        await axios.post(
            "/api/students",
            data
        );


    return response.data;

};



export const updateStudent = async (

    id: number,

    data: {
        name: string;
        email: string;
    }

) => {


    const response =
        await axios.put(
            `/api/students/${id}`,
            data
        );


    return response.data;

};




export const deleteStudent = async (
    id: number
) => {


    await axios.delete(
        `/api/students/${id}`
    );

};
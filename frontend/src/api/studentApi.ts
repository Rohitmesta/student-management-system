import axios from "./axios";



export type Student = {

    id: number;

    usn: string;

    name: string;

    email: string;

    department: string;

    age: number;

};






export type StudentRequest = {

    usn: string;

    name: string;

    email: string;

    department: string;

    age: number;

};









export const getStudents = async () => {


    const response =
        await axios.get<Student[]>(
            "/api/students"
        );


    return response.data;


};










export const createStudent = async (
    data: StudentRequest
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

    data: StudentRequest

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


    const response =
        await axios.delete(
            `/api/students/${id}`
        );


    return response.data;


};
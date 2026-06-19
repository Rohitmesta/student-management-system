import axios from "./axios";

import type { Department } from "./departmentApi";



export type Student = {

    id: number;

    usn: string;

    name: string;

    email: string;

    department: Department | null;

    age: number;

};



export type StudentRequest = {

    usn: string;

    name: string;

    email: string;

    departmentId: number;

    age: number;

};



export type StudentPage = {

    content: Student[];

    totalPages: number;

    totalElements: number;

    number: number;

    size: number;

};

// NORMAL GET (old one)
export const getStudents = async () => {


    const response =
        await axios.get<Student[]>(
            "/api/students"
        );


    return response.data;


};


// PAGINATION GET (new)
export const getStudentsPage = async (

    page: number,

    size: number,

    keyword: string = ""

) => {


    const response =
        await axios.get<StudentPage>(

            "/api/students/paged",

            {

                params: {

                    page,

                    size,

                    sortBy: "id",

                    direction: "asc",

                    keyword

                }

            }

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
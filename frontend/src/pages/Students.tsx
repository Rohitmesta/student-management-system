import { useEffect, useState } from "react";

import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
} from "../api/studentApi";


import {
    Edit,
    Trash2,
    Plus,
    Search
} from "lucide-react";



type Student = {

    id: number;
    name: string;
    email: string;
    department: string;
    age: number;

};



function Students() {


    const [students, setStudents] =
        useState<Student[]>([]);


    const [search, setSearch] =
        useState("");


    const [name, setName] =
        useState("");


    const [email, setEmail] =
        useState("");


    const [department, setDepartment] =
        useState("");


    const [age, setAge] =
        useState("");


    const [editId, setEditId] =
        useState<number | null>(null);




    const loadStudents = async () => {

        const data =
            await getStudents();


        setStudents(data);

    };



    useEffect(() => {

        loadStudents();

    }, []);





    const handleSubmit = async () => {


        const data = {

            name,
            email,
            department,
            age: Number(age)

        };



        if (editId) {


            await updateStudent(
                editId,
                data
            );


            setEditId(null);


        } else {


            await createStudent(data);


        }



        setName("");
        setEmail("");
        setDepartment("");
        setAge("");


        loadStudents();


    };





    const handleEdit = (
        student: Student
    ) => {


        setEditId(student.id);

        setName(student.name);

        setEmail(student.email);

        setDepartment(student.department);

        setAge(String(student.age));


    };





    const handleDelete = async (
        id: number
    ) => {


        if (
            confirm(
                "Delete this student?"
            )
        ) {


            await deleteStudent(id);


            loadStudents();


        }


    };





    const filteredStudents =
        students.filter(

            student =>

                student.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                student.email
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                student.department
                    .toLowerCase()
                    .includes(search.toLowerCase())

        );






    return (

        <div>


            <div className="mb-8">


                <h1 className="text-3xl font-bold">

                    Students 🎓

                </h1>


                <p className="text-gray-500">

                    Manage student information

                </p>


            </div>






            <div className="bg-white rounded-2xl shadow p-6 mb-8">


                <h2 className="font-bold text-lg mb-5">


                    {
                        editId
                            ? "Update Student"
                            : "Add New Student"
                    }


                </h2>




                <div className="grid grid-cols-5 gap-4">


                    <input

                        value={name}

                        onChange={
                            e => setName(e.target.value)
                        }

                        placeholder="Name"

                        className="border rounded-xl p-3"

                    />



                    <input

                        value={email}

                        onChange={
                            e => setEmail(e.target.value)
                        }

                        placeholder="Email"

                        className="border rounded-xl p-3"

                    />



                    <input

                        value={department}

                        onChange={
                            e => setDepartment(e.target.value)
                        }

                        placeholder="Department"

                        className="border rounded-xl p-3"

                    />



                    <input

                        value={age}

                        onChange={
                            e => setAge(e.target.value)
                        }

                        placeholder="Age"

                        type="number"

                        className="border rounded-xl p-3"

                    />




                    <button

                        onClick={handleSubmit}

                        className="bg-slate-950 text-white rounded-xl flex justify-center items-center gap-2"

                    >


                        <Plus size={18}/>


                        {
                            editId
                                ? "Update"
                                : "Add"
                        }


                    </button>


                </div>


            </div>






            <div className="bg-white rounded-2xl shadow p-6">


                <div className="flex items-center border rounded-xl p-3 mb-5">


                    <Search />


                    <input

                        value={search}

                        onChange={
                            e => setSearch(e.target.value)
                        }

                        placeholder="Search students..."

                        className="outline-none ml-3 flex-1"

                    />


                </div>






                <table className="w-full">


                    <thead className="bg-gray-100">


                    <tr>


                        <th className="p-4">

                            ID

                        </th>


                        <th>Name</th>


                        <th>Email</th>


                        <th>Department</th>


                        <th>Age</th>


                        <th>Actions</th>


                    </tr>


                    </thead>






                    <tbody>


                    {

                        filteredStudents.map(

                            student => (


                                <tr

                                    key={student.id}

                                    className="border-t text-center hover:bg-gray-50"

                                >



                                    <td className="p-4">

                                        {student.id}

                                    </td>



                                    <td>

                                        {student.name}

                                    </td>



                                    <td>

                                        {student.email}

                                    </td>



                                    <td>

                                        {student.department}

                                    </td>



                                    <td>

                                        {student.age}

                                    </td>





                                    <td className="space-x-5">


                                        <button

                                            onClick={
                                                () => handleEdit(student)
                                            }

                                            className="text-blue-600"

                                        >


                                            <Edit />


                                        </button>





                                        <button

                                            onClick={
                                                () => handleDelete(student.id)
                                            }

                                            className="text-red-600"

                                        >


                                            <Trash2 />


                                        </button>


                                    </td>


                                </tr>


                            )

                        )

                    }


                    </tbody>


                </table>


            </div>


        </div>

    );

}


export default Students;
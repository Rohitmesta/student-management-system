import { useEffect, useState } from "react";

import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
} from "../api/studentApi";


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

        setAge(
            String(student.age)
        );


    };




    const handleDelete = async (
        id: number
    ) => {


        await deleteStudent(id);


        loadStudents();


    };





    return (

        <div>


            <h1 className="text-3xl font-bold mb-8">

                Students 🎓

            </h1>



            <div className="bg-white p-6 rounded-xl shadow mb-8">


                <input

                    value={name}

                    onChange={
                        e => setName(e.target.value)
                    }

                    placeholder="Name"

                    className="border p-2 mr-2"

                />



                <input

                    value={email}

                    onChange={
                        e => setEmail(e.target.value)
                    }

                    placeholder="Email"

                    className="border p-2 mr-2"

                />



                <input

                    value={department}

                    onChange={
                        e => setDepartment(e.target.value)
                    }

                    placeholder="Department"

                    className="border p-2 mr-2"

                />



                <input

                    value={age}

                    onChange={
                        e => setAge(e.target.value)
                    }

                    placeholder="Age"

                    type="number"

                    className="border p-2 mr-2"

                />




                <button

                    onClick={handleSubmit}

                    className="bg-blue-600 text-white px-6 py-2 rounded"

                >


                    {editId ? "Update" : "Add"}


                </button>


            </div>





            <table className="bg-white w-full rounded-xl shadow">


                <thead>


                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Department</th>

                    <th>Age</th>

                    <th>Actions</th>

                </tr>


                </thead>




                <tbody>


                {

                    students.map(
                        student => (


                            <tr key={student.id}>


                                <td>{student.id}</td>

                                <td>{student.name}</td>

                                <td>{student.email}</td>

                                <td>{student.department}</td>

                                <td>{student.age}</td>


                                <td>


                                    <button

                                        onClick={
                                            () => handleEdit(student)
                                        }

                                        className="text-blue-600 mr-4"

                                    >

                                        Edit

                                    </button>



                                    <button

                                        onClick={
                                            () => handleDelete(student.id)
                                        }

                                        className="text-red-600"

                                    >

                                        Delete

                                    </button>


                                </td>


                            </tr>


                        )
                    )

                }


                </tbody>


            </table>


        </div>

    );

}


export default Students;
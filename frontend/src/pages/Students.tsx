import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { AxiosError } from "axios";


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

    usn: string;

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


    const [usn, setUsn] =
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








    const showError = (
        error: unknown
    ) => {


        if (
            error instanceof AxiosError
        ) {


            const data =
                error.response?.data;



            if (
                data?.message
            ) {

                toast.error(data.message);

                return;

            }



            if (data) {


                const firstError =
                    Object.values(data)[0];


                if (firstError) {


                    toast.error(
                        String(firstError)
                    );


                    return;

                }

            }

        }


        toast.error(
            "Something went wrong"
        );

    };









    const loadStudents = async () => {


        try {


            const data =
                await getStudents();


            setStudents(data);


        } catch (error) {


            showError(error);


        }

    };








    useEffect(() => {


        loadStudents();


    }, []);









    const handleSubmit = async () => {


        const data = {

            usn,

            name,

            email,

            department,

            age: Number(age)

        };



        try {


            if (editId) {


                await updateStudent(
                    editId,
                    data
                );


                toast.success(
                    "Student updated successfully"
                );


                setEditId(null);


            } else {



                await createStudent(
                    data
                );


                toast.success(
                    "Student added successfully"
                );


            }




            setUsn("");
            setName("");
            setEmail("");
            setDepartment("");
            setAge("");



            loadStudents();



        } catch (error) {


            showError(error);


        }


    };









    const handleEdit = (
        student: Student
    ) => {


        setEditId(student.id);

        setUsn(student.usn);

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


        if (
            confirm("Delete this student?")
        ) {


            try {


                await deleteStudent(id);


                toast.success(
                    "Student deleted successfully"
                );


                loadStudents();



            } catch (error) {


                showError(error);


            }


        }

    };










    const filteredStudents =
        students.filter(

            student =>


                student.usn
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

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


            <h1 className="text-3xl font-bold mb-8">

                Students 🎓

            </h1>








            <div className="bg-white rounded-2xl shadow p-6 mb-8">


                <h2 className="font-bold text-lg mb-5">

                    {editId ? "Update Student" : "Add New Student"}

                </h2>






                <div className="grid grid-cols-6 gap-4">


                    <input

                        value={usn}

                        onChange={
                            e => setUsn(e.target.value)
                        }

                        placeholder="USN"

                        className="border rounded-xl p-3"

                    />



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

                        className="bg-slate-950 text-white rounded-xl flex items-center justify-center gap-2"

                    >


                        <Plus size={18}/>


                        {editId ? "Update" : "Add"}


                    </button>


                </div>


            </div>









            <div className="bg-white rounded-2xl shadow p-6">


                <div className="flex border rounded-xl p-3 mb-5">


                    <Search />


                    <input

                        value={search}

                        onChange={
                            e => setSearch(e.target.value)
                        }

                        placeholder="Search USN, name, email..."

                        className="outline-none ml-3 flex-1"

                    />


                </div>






                <table className="w-full">


                    <tbody>


                    {

                        filteredStudents.map(student => (


                            <tr

                                key={student.id}

                                className="border-t text-center"

                            >


                                <td className="p-4">

                                    {student.usn}

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


                        ))

                    }


                    </tbody>


                </table>


            </div>


        </div>

    );

}



export default Students;
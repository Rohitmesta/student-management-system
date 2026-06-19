import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { AxiosError } from "axios";


import {
    getStudentsPage,
    createStudent,
    updateStudent,
    deleteStudent
} from "../api/studentApi";


import {
    getDepartments
} from "../api/departmentApi";


import type {
    Department
} from "../api/departmentApi";


import {
    Edit,
    Trash2,
    Plus,
    Search,
    X
} from "lucide-react";




type Student = {

    id: number;
    usn: string;
    name: string;
    email: string;
    department: Department | null;
    age: number;

};





function Students() {


    const [students, setStudents] =
        useState<Student[]>([]);


    const [departments, setDepartments] =
        useState<Department[]>([]);


    const [page, setPage] =
        useState(0);


    const [totalPages, setTotalPages] =
        useState(0);


    const [search, setSearch] =
        useState("");


    const [loading, setLoading] =
        useState(false);


    const [usn, setUsn] =
        useState("");


    const [name, setName] =
        useState("");


    const [email, setEmail] =
        useState("");


    const [departmentId, setDepartmentId] =
        useState("");


    const [age, setAge] =
        useState("");


    const [editId, setEditId] =
        useState<number | null>(null);








    const showError = (
        error: unknown
    ) => {


        if (error instanceof AxiosError) {


            const data =
                error.response?.data;


            if (data?.message) {

                toast.error(data.message);

                return;

            }


        }


        toast.error(
            "Something went wrong"
        );


    };








    const loadStudents = async () => {


        try {


            setLoading(true);


            const data =
                await getStudentsPage(
                    page,
                    5,
                    search
                );


            setStudents(data.content);


            setTotalPages(
                data.totalPages
            );


        }

        catch (error) {


            showError(error);


        }

        finally {


            setLoading(false);


        }


    };








    const loadDepartments = async () => {


        try {


            const data =
                await getDepartments();


            setDepartments(data);


        }

        catch(error) {


            showError(error);


        }


    };







    useEffect(() => {


        loadStudents();


    }, [page, search]);




    useEffect(() => {


        loadDepartments();


    }, []);








    const clearForm = () => {


        setUsn("");

        setName("");

        setEmail("");

        setDepartmentId("");

        setAge("");

        setEditId(null);


    };








    const handleSubmit = async () => {


        const data = {

            usn,
            name,
            email,

            departmentId:
                Number(departmentId),

            age:
                Number(age)

        };



        try {


            if(editId){


                await updateStudent(
                    editId,
                    data
                );


                toast.success(
                    "Student updated"
                );


            }


            else {


                await createStudent(
                    data
                );


                toast.success(
                    "Student added"
                );


            }



            clearForm();


            loadStudents();



        }

        catch(error){


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


        setDepartmentId(
            String(
                student.department?.id || ""
            )
        );


        setAge(
            String(student.age)
        );


    };








    const handleDelete = async (
        id:number
    ) => {


        if(confirm("Delete student?")){


            await deleteStudent(id);


            toast.success(
                "Student deleted"
            );


            loadStudents();


        }


    };










    return (


        <div className="space-y-8">





            <div>


                <h1 className="text-3xl font-bold">

                    Students 🎓

                </h1>


                <p className="text-gray-500">

                    Manage student records

                </p>


            </div>








            <div className="bg-white rounded-2xl shadow p-6">


                <h2 className="text-xl font-semibold mb-5">

                    {editId ? "Update Student" : "Add Student"}

                </h2>





                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">


                    <input value={usn} onChange={e=>setUsn(e.target.value)} placeholder="USN" className="border rounded-xl p-3"/>


                    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border rounded-xl p-3"/>


                    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border rounded-xl p-3"/>



                    <select value={departmentId} onChange={e=>setDepartmentId(e.target.value)} className="border rounded-xl p-3">


                        <option value="">Department</option>


                        {departments.map(d=>

                            <option key={d.id} value={d.id}>

                                {d.code}

                            </option>

                        )}


                    </select>




                    <input value={age} onChange={e=>setAge(e.target.value)} placeholder="Age" type="number" className="border rounded-xl p-3"/>




                    <button onClick={handleSubmit} className="bg-blue-600 text-white rounded-xl flex justify-center items-center gap-2">


                        <Plus/>


                        {editId ? "Update":"Add"}


                    </button>


                </div>





                {editId &&


                    <button onClick={clearForm} className="mt-4 text-red-500 flex gap-2">


                        <X/>

                        Cancel Edit


                    </button>

                }



            </div>









            <div className="bg-white rounded-2xl shadow p-6">


                <div className="flex border rounded-xl p-3 mb-6">


                    <Search/>


                    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student..." className="outline-none ml-3 flex-1"/>


                </div>






                <table className="w-full text-center">


                    <thead className="text-gray-500 border-b">


                    <tr>

                        <th className="p-3">USN</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Age</th>
                        <th>Action</th>

                    </tr>


                    </thead>





                    <tbody>


                    {loading &&

                        <tr>

                            <td colSpan={6} className="p-8">

                                Loading students...

                            </td>

                        </tr>

                    }




                    {!loading && students.length===0 &&

                        <tr>

                            <td colSpan={6} className="p-8">

                                No students found

                            </td>

                        </tr>

                    }






                    {!loading && students.map(student=>

                        <tr key={student.id} className="border-b hover:bg-gray-50">


                            <td className="p-4 font-medium">{student.usn}</td>

                            <td>{student.name}</td>

                            <td>{student.email}</td>


                            <td>


                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">


                                    {student.department?.code || "None"}


                                </span>


                            </td>


                            <td>{student.age}</td>



                            <td className="space-x-4">


                                <button onClick={()=>handleEdit(student)} className="text-blue-600">

                                    <Edit/>

                                </button>


                                <button onClick={()=>handleDelete(student.id)} className="text-red-600">

                                    <Trash2/>

                                </button>


                            </td>


                        </tr>

                    )}


                    </tbody>


                </table>








                <div className="flex justify-center gap-5 mt-6">


                    <button disabled={page===0} onClick={()=>setPage(page-1)}>

                        Previous

                    </button>



                    <span>

                        Page {page+1}/{totalPages}

                    </span>



                    <button disabled={page+1>=totalPages} onClick={()=>setPage(page+1)}>

                        Next

                    </button>


                </div>


            </div>


        </div>


    );


}



export default Students;
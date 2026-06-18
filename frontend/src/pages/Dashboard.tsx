import { useQuery } from "@tanstack/react-query";


import {
    Users,
    Building,
    Activity
} from "lucide-react";


import { getStudents } from "../api/studentApi";



function Dashboard() {


    const {
        data: students = []
    } = useQuery({

        queryKey: ["students"],

        queryFn: getStudents

    });




    const departments =
        new Set(

            students.map(

                student =>
                    student.department

            )

        ).size;






    return (

        <div>


            <h1 className="text-3xl font-bold">

                Welcome back 👋

            </h1>



            <p className="text-gray-500 mt-2">

                Student Management Overview

            </p>






            <div className="grid grid-cols-3 gap-6 mt-8">





                <div className="bg-white p-6 rounded-2xl shadow">


                    <Users size={35} />


                    <p className="text-gray-500 mt-5">

                        Total Students

                    </p>



                    <h2 className="text-4xl font-bold">

                        {students.length}

                    </h2>


                </div>








                <div className="bg-white p-6 rounded-2xl shadow">


                    <Building size={35} />



                    <p className="text-gray-500 mt-5">

                        Departments

                    </p>



                    <h2 className="text-4xl font-bold">

                        {departments}

                    </h2>


                </div>









                <div className="bg-white p-6 rounded-2xl shadow">


                    <Activity size={35} />



                    <p className="text-gray-500 mt-5">

                        System Status

                    </p>



                    <h2 className="text-green-600 text-2xl font-bold">

                        Active

                    </h2>


                </div>




            </div>


        </div>

    );

}


export default Dashboard;
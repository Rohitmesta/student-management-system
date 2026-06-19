import { useEffect, useState } from "react";


import {
    getDashboardStats,
    getDepartmentCounts,
    type DashboardStats,
    type DepartmentCount

} from "../api/dashboardApi";


import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer

} from "recharts";


import {
    Users,
    Building2,
    BarChart3

} from "lucide-react";









function Dashboard() {


    const [stats, setStats] =
        useState<DashboardStats>({

            students: 0,

            departments: 0

        });




    const [departmentData, setDepartmentData] =
        useState<DepartmentCount[]>([]);







    useEffect(() => {


        loadDashboard();


    }, []);









    const loadDashboard = async () => {


        const statsData =
            await getDashboardStats();


        const deptData =
            await getDepartmentCounts();




        setStats(
            statsData
        );


        setDepartmentData(
            deptData
        );


    };










    return (


        <div className="space-y-8">






            {/* HEADER */}

            <div>


                <h1 className="text-3xl font-bold text-slate-800">


                    Dashboard 📊


                </h1>



                <p className="text-gray-500 mt-2">


                    Student Management Overview


                </p>


            </div>











            {/* CARDS */}


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">






                {/* STUDENTS */}


                <div className="bg-white rounded-2xl shadow p-8 flex justify-between items-center">



                    <div>


                        <p className="text-gray-500">


                            Total Students


                        </p>



                        <h1 className="text-4xl font-bold mt-4">


                            {stats.students}


                        </h1>



                    </div>




                    <div className="bg-blue-100 p-5 rounded-xl">


                        <Users

                            size={40}

                            className="text-blue-600"

                        />


                    </div>




                </div>









                {/* DEPARTMENTS */}


                <div className="bg-white rounded-2xl shadow p-8 flex justify-between items-center">



                    <div>


                        <p className="text-gray-500">


                            Total Departments


                        </p>




                        <h1 className="text-4xl font-bold mt-4">


                            {stats.departments}


                        </h1>



                    </div>





                    <div className="bg-green-100 p-5 rounded-xl">


                        <Building2

                            size={40}

                            className="text-green-600"

                        />


                    </div>




                </div>





            </div>












            {/* CHART */}


            <div className="bg-white rounded-2xl shadow p-8">



                <div className="flex items-center gap-3 mb-8">


                    <BarChart3

                        className="text-purple-600"

                    />



                    <h2 className="text-xl font-bold">


                        Students by Department


                    </h2>



                </div>








                <div className="h-80">



                    <ResponsiveContainer

                        width="100%"

                        height="100%"

                    >



                        <BarChart

                            data={departmentData}

                        >



                            <XAxis

                                dataKey="department"

                            />



                            <YAxis

                                allowDecimals={false}

                            />



                            <Tooltip />




                            <Bar

                                dataKey="count"

                                fill="#2563eb"

                                radius={[8, 8, 0, 0]}

                                barSize={80}

                            />



                        </BarChart>




                    </ResponsiveContainer>



                </div>




            </div>





        </div>


    );


}



export default Dashboard;
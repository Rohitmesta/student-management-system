import {
    Link,
    Outlet,
    useNavigate
} from "react-router-dom";


import {
    GraduationCap,
    LayoutDashboard,
    Users,
    LogOut
} from "lucide-react";



function DashboardLayout() {


    const navigate =
        useNavigate();



    const logout = () => {


        localStorage.clear();


        navigate("/login");


    };




    return (

        <div className="flex min-h-screen bg-gray-100">


            <aside className="w-72 bg-slate-950 text-white flex flex-col">


                <div className="p-6 flex items-center gap-3">


                    <GraduationCap size={32} />


                    <h1 className="text-2xl font-bold">

                        EduAdmin

                    </h1>


                </div>





                <nav className="flex-1 px-5 mt-8 space-y-3">


                    <Link

                        to="/dashboard"

                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"

                    >


                        <LayoutDashboard />


                        Dashboard


                    </Link>





                    <Link

                        to="/students"

                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"

                    >


                        <Users />


                        Students


                    </Link>



                </nav>





                <button

                    onClick={logout}

                    className="m-5 flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-950"

                >


                    <LogOut />


                    Logout


                </button>



            </aside>






            <main className="flex-1 p-8">


                <Outlet />


            </main>



        </div>

    );

}



export default DashboardLayout;
import {
    Link,
    Outlet,
    useNavigate,
    useLocation

} from "react-router-dom";


import {
    LayoutDashboard,
    Users,
    LogOut,
    GraduationCap

} from "lucide-react";








function DashboardLayout() {


    const navigate =
        useNavigate();


    const location =
        useLocation();







    const logout = () => {


        localStorage.removeItem(
            "accessToken"
        );


        localStorage.removeItem(
            "refreshToken"
        );



        navigate(
            "/login"
        );


    };








    const activeClass = (
        path: string
    ) =>


        location.pathname === path

            ? "bg-blue-600 text-white"

            : "text-gray-300 hover:bg-slate-800 hover:text-white";









    return (


        <div className="flex min-h-screen bg-slate-100">






            {/* Sidebar */}

            <aside className="w-64 bg-slate-950 text-white p-6 flex flex-col">






                <div className="flex items-center gap-3 mb-14">


                    <GraduationCap
                        size={32}
                    />


                    <h1 className="text-2xl font-bold">

                        EduAdmin

                    </h1>


                </div>









                <nav className="space-y-3 flex-1">







                    <Link

                        to="/dashboard"

                        className={

                            `
                            flex 
                            items-center 
                            gap-3 
                            px-4 
                            py-3 
                            rounded-xl 
                            transition
                            ${activeClass("/dashboard")}
                            `

                        }

                    >


                        <LayoutDashboard />


                        Dashboard


                    </Link>










                    <Link

                        to="/students"

                        className={

                            `
                            flex 
                            items-center 
                            gap-3 
                            px-4 
                            py-3 
                            rounded-xl 
                            transition
                            ${activeClass("/students")}
                            `

                        }

                    >



                        <Users />


                        Students



                    </Link>






                </nav>









                <button

                    onClick={logout}

                    className="
                    flex
                    items-center
                    gap-3
                    text-red-400
                    hover:text-red-300
                    "

                >


                    <LogOut />


                    Logout



                </button>







            </aside>









            {/* Main Content */}


            <main className="flex-1 bg-slate-100 p-10 overflow-auto">



                <div className="max-w-7xl mx-auto">


                    <Outlet />


                </div>



            </main>





        </div>


    );


}




export default DashboardLayout;
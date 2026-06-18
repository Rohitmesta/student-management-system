import {
    Link,
    Outlet,
    useNavigate
} from "react-router-dom";


function DashboardLayout() {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/login");

    };


    return (

        <div className="flex min-h-screen">


            <aside className="w-64 bg-slate-950 text-white p-6">

                <h1 className="text-xl font-bold mb-10">
                    Student Admin
                </h1>


                <nav className="space-y-5">


                    <Link
                        to="/dashboard"
                        className="block hover:text-blue-400"
                    >
                        Dashboard
                    </Link>


                    <Link
                        to="/students"
                        className="block hover:text-blue-400"
                    >
                        Students
                    </Link>


                    <button
                        onClick={logout}
                        className="mt-10 text-red-400 hover:text-red-300"
                    >
                        Logout
                    </button>


                </nav>


            </aside>




            <main className="flex-1 bg-gray-100 p-8">

                <Outlet />

            </main>


        </div>

    );

}


export default DashboardLayout;
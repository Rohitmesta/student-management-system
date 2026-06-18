import { Link, Outlet } from "react-router-dom";


function DashboardLayout() {

    return (

        <div className="flex min-h-screen">

            <aside className="w-64 bg-slate-950 text-white p-6">

                <h1 className="text-xl font-bold mb-10">
                    Student Admin
                </h1>


                <nav className="space-y-5">

                    <Link
                        className="block cursor-pointer hover:text-blue-400"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>


                    <Link
                        className="block cursor-pointer hover:text-blue-400"
                        to="/students"
                    >
                        Students
                    </Link>

                </nav>

            </aside>


            <main className="flex-1 bg-gray-100 p-8">

                <Outlet />

            </main>

        </div>

    );

}


export default DashboardLayout;
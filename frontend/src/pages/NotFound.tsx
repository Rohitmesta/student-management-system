import {
    Link
} from "react-router-dom";


import {
    Home,
    AlertTriangle,
    LogIn
} from "lucide-react";



function NotFound() {


    const isLoggedIn =
        !!localStorage.getItem(
            "accessToken"
        );



    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">


            <div className="bg-white p-10 rounded-3xl shadow-xl text-center">


                <AlertTriangle
                    size={70}
                    className="mx-auto mb-5"
                />



                <h1 className="text-6xl font-bold">

                    404

                </h1>



                <h2 className="text-2xl font-semibold mt-3">

                    Page Not Found

                </h2>



                <p className="text-gray-500 mt-3">

                    The page you are looking for does not exist.

                </p>






                <Link

                    to={
                        isLoggedIn
                            ? "/dashboard"
                            : "/login"
                    }


                    className="mt-8 inline-flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-xl"

                >


                    {
                        isLoggedIn
                            ? <Home size={18}/>
                            : <LogIn size={18}/>
                    }



                    {
                        isLoggedIn
                            ? "Back Dashboard"
                            : "Back Login"
                    }


                </Link>


            </div>


        </div>

    );

}



export default NotFound;
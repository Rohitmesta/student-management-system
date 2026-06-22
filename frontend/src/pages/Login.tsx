import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";


import {
    GraduationCap,
    Lock,
    User,
    Loader2

} from "lucide-react";



import {
    loginSchema
} from "../schemas/loginSchema";


import type {
    LoginForm
} from "../schemas/loginSchema";


import {
    login
} from "../api/authApi";









function Login() {


    const navigate =
        useNavigate();



    const [loading, setLoading] =
        useState(false);






    const {

        register,

        handleSubmit,

        formState: { errors }

    } = useForm<LoginForm>({

        resolver:
            zodResolver(loginSchema)

    });









    const submit = async (
        data: LoginForm
    ) => {


        try {


            setLoading(true);




            const response =
                await login(
                    data
                );




            localStorage.setItem(

                "accessToken",

                response.accessToken

            );





            localStorage.setItem(

                "refreshToken",

                response.refreshToken

            );





            toast.success(

                "Login successful"

            );




            navigate(

                "/dashboard"

            );



        }


        catch (error) {



            console.log(
                error
            );



            toast.error(

                "Invalid username or password"

            );



        }


        finally {


            setLoading(false);


        }


    };












    return (


        <div className="min-h-screen flex bg-slate-100">







            {/* LEFT SIDE */}


            <div className="hidden md:flex w-1/2 bg-slate-950 text-white flex-col justify-center items-center p-10">



                <GraduationCap

                    size={95}

                    className="text-blue-500"

                />




                <h1 className="text-5xl font-bold mt-6">


                    EduAdmin


                </h1>





                <p className="text-gray-300 text-xl mt-5 text-center max-w-md">


                    Secure Student Management Platform


                </p>




            </div>












            {/* LOGIN FORM */}


            <div className="flex flex-1 justify-center items-center p-6">





                <form


                    onSubmit={

                        handleSubmit(
                            submit
                        )

                    }


                    className="
                    bg-white
                    w-full
                    max-w-md
                    rounded-3xl
                    shadow-xl
                    p-10
                    "


                >








                    <h2 className="text-3xl font-bold text-gray-800">


                        Welcome Back


                    </h2>






                    <p className="text-gray-500 mt-2 mb-8">


                        Login to your dashboard


                    </p>









                    {/* USERNAME */}


                    <div className="border rounded-xl flex items-center px-3 mb-2 focus-within:border-blue-500">



                        <User

                            size={20}

                            className="text-gray-500"

                        />




                        <input


                            {...register(
                                "username"
                            )}


                            placeholder="Username"


                            className="
                            p-3
                            outline-none
                            flex-1
                            "


                        />



                    </div>






                    <p className="text-red-500 text-sm mb-4">


                        {
                            errors.username?.message
                        }


                    </p>












                    {/* PASSWORD */}


                    <div className="border rounded-xl flex items-center px-3 mb-2 focus-within:border-blue-500">



                        <Lock

                            size={20}

                            className="text-gray-500"

                        />




                        <input


                            {...register(
                                "password"
                            )}


                            type="password"


                            placeholder="Password"


                            className="
                            p-3
                            outline-none
                            flex-1
                            "


                        />



                    </div>






                    <p className="text-red-500 text-sm mb-5">


                        {
                            errors.password?.message
                        }


                    </p>











                    {/* BUTTON */}


                    <button


                        disabled={loading}


                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        disabled:bg-gray-400
                        text-white
                        w-full
                        p-3
                        rounded-xl
                        font-semibold
                        flex
                        justify-center
                        items-center
                        gap-2
                        "


                    >




                        {


                            loading

                                ? (

                                    <>

                                        <Loader2

                                            className="animate-spin"

                                        />


                                        Logging in...


                                    </>

                                )


                                : "Login"


                        }





                    </button>







                </form>





            </div>






        </div>


    );


}





export default Login;
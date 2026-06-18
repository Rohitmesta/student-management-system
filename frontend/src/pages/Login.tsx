import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";


import {
    GraduationCap,
    Lock,
    User
} from "lucide-react";


import { loginSchema } from "../schemas/loginSchema";

import type { LoginForm } from "../schemas/loginSchema";

import { login } from "../api/authApi";



function Login() {


    const navigate = useNavigate();



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


            const response =
                await login(data);




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



            navigate("/dashboard");



        } catch (error) {


            console.log(error);



            toast.error(
                "Invalid username or password"
            );


        }


    };







    return (

        <div className="min-h-screen flex bg-gray-100">



            <div className="hidden md:flex w-1/2 bg-slate-950 text-white flex-col justify-center items-center p-10">


                <GraduationCap size={90} />


                <h1 className="text-5xl font-bold mt-6">

                    EduAdmin

                </h1>


                <p className="text-gray-300 text-xl mt-5 text-center">

                    Smart Student Management Platform

                </p>


            </div>






            <div className="flex flex-1 justify-center items-center">


                <form

                    onSubmit={
                        handleSubmit(submit)
                    }

                    className="bg-white w-96 rounded-3xl shadow-xl p-10"

                >


                    <h2 className="text-3xl font-bold">

                        Welcome Back 👋

                    </h2>



                    <p className="text-gray-500 mt-2 mb-8">

                        Login to continue

                    </p>






                    <div className="border rounded-xl flex items-center px-3 mb-2">


                        <User size={20}/>


                        <input

                            {...register("username")}

                            placeholder="Username"

                            className="p-3 outline-none flex-1"

                        />


                    </div>



                    <p className="text-red-500 text-sm mb-3">

                        {errors.username?.message}

                    </p>








                    <div className="border rounded-xl flex items-center px-3 mb-2">


                        <Lock size={20}/>


                        <input

                            {...register("password")}

                            type="password"

                            placeholder="Password"

                            className="p-3 outline-none flex-1"

                        />


                    </div>



                    <p className="text-red-500 text-sm mb-5">

                        {errors.password?.message}

                    </p>







                    <button

                        className="bg-slate-950 text-white w-full p-3 rounded-xl font-semibold hover:bg-slate-800"

                    >


                        Login


                    </button>



                </form>


            </div>


        </div>

    );

}



export default Login;
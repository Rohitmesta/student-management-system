import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

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


            console.log(response);


            localStorage.setItem(
                "accessToken",
                response.accessToken
            );


            localStorage.setItem(
                "refreshToken",
                response.refreshToken
            );


            navigate("/dashboard");


        } catch (error) {


            console.log(error);


            alert(
                "Login failed"
            );


        }


    };



    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">


            <form
                onSubmit={handleSubmit(submit)}

                className="bg-white p-8 rounded-xl shadow w-96"
            >


                <h1 className="text-2xl font-bold mb-6">

                    Admin Login

                </h1>



                <input

                    {...register("username")}

                    placeholder="Username"

                    className="border p-2 w-full mb-2"

                />


                <p className="text-red-500">

                    {errors.username?.message}

                </p>



                <input

                    {...register("password")}

                    type="password"

                    placeholder="Password"

                    className="border p-2 w-full mb-2"

                />


                <p className="text-red-500">

                    {errors.password?.message}

                </p>



                <button

                    className="bg-blue-600 text-white w-full p-2 rounded mt-4"

                >

                    Login

                </button>


            </form>


        </div>

    );

}


export default Login;
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/Auth";
import { useAppDispatch } from "../hooks";
import { useLoginUserMutation } from "../services/api/postsApi";

type FormData = {
    email: string;
    password: string;
};

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loginUser, { data: dataLogin, error, isLoading, isSuccess }] = useLoginUserMutation({
        fixedCacheKey: "login",
    });


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {

            
            await loginUser({ username: data.email, password: data.password }).unwrap();
          
        } catch (error) {
            console.error(error);
        }
      
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser({ token: dataLogin.signInUserSession.accessToken.jwtToken, name: dataLogin.username }));
            navigate("/");
        }
    }, [isSuccess, navigate, dataLogin, dispatch]);

    return (
        <div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <form className="mb-0 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="email"
                                        className={`${
                                            errors.email
                                                ? "border-red-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                                                : ""
                                        }`}
                                        autoComplete="email"
                                        {...register("email", {
                                            required: true,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                </div>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="password"
                                        autoComplete="current-password"
                                        className={`${
                                            errors.password
                                                ? "border-red-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                                                : ""
                                        }`}
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </label>
                        </div>
                        <div>
                            {error && "message" in error && <p className="text-red-600">{error.message || ""}</p>}
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                    <p className="text-slate-500 text-right mt-6"></p>
                </div>
            </div>
        </div>
    );
}

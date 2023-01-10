import { useNavigate } from "react-router-dom";
import { logout, selectAuth } from "../features/Auth";
import { useAppDispatch, useAppSelector } from "../hooks";
export default function Home() {
    const { token } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth");
    };
    return (
        <div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 text-center text-black">
                    <h3>Bienvenido {token}</h3>
                    <button
                        className="bg-white h-[50px] w-[100px] rounded hover:bg-gray-200"
                        onClick={() => handleLogout()}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

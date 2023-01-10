//import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { selectAuth/*, setUser */} from "./features/Auth";
//import { useAppDispatch } from "./hooks";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";

function App() {
   // const dispatch = useAppDispatch();
    //const user = JSON.parse(localStorage.getItem("User"));

    const user = useSelector(selectAuth);
    console.log({user})

   /*  useEffect(() => {
        dispatch(setUser(user));
    }, [dispatch, user]); */

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index path="/" element={<Home />} />
                <Route path="/auth" element={<SignIn />} />
            </Route>
        </Routes>
    );
}

export default App;

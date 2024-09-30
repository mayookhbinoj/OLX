import React, { Suspense, lazy ,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RoundLoading from "../Components/Loading/RoundLoading";
import Home from "../Pages/Home";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase/config";
// import Signup from "../Pages/Signup";
// import Login from "../Pages/Login";
// import CreatePost from "../Pages/CreatePost";
// import ViewPost from "../Pages/ViewPost";
// import ViewMore from "../Pages/ViewMore";

const CreatePost = lazy(() => import("../Pages/CreatePost"));
// const Home = lazy(() => import("../Pages/Home"));
const Signup = lazy(() => import("../Pages/Signup"));
const Login = lazy(() => import("../Pages/Login"));
const ViewPost = lazy(() => import("../Pages/ViewPost"));
const ViewMore = lazy(() => import("../Pages/ViewMore"));

function MainRoutes() {
  const navigate=useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log("log in ")
        navigate("/Home")
      }else{
        console.log("log out")
        navigate("/login")
      }
    })
  },[])
  return (
    <Suspense fallback={<RoundLoading />}>
      

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/view" element={<ViewPost />} />
          <Route path="/viewmore" element={<ViewMore />} />
          <Route path="/search" element={<ViewMore />} />
        </Routes>
      
    </Suspense>
  );
}

export default MainRoutes;

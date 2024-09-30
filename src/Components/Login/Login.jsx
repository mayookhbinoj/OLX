import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Firebase } from "../../firebase/config";
import Logo from "../../olx-logo.png";
import "./Login.css";
import RoundLoading from "../Loading/RoundLoading";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from 'firebase/auth'

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

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


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Integrate Zod schema
  });

  const onSubmit = (data) => {
    setLoading(true);
    Firebase.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        swal("Success", "You have logged in successfully!", "success").then(
          () => {
            setLoading(false);
            navigate("/Home");
          }
        );
      })
      .catch((error) => {
        swal("Error", error.code.split("/")[1].split("-").join(" "), "error");
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <RoundLoading />}
      <div className="d-flex justify-content-center align-items-center min-vh-200 bg-light">
        <div
          className="card  p-4 shadow-sm "
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div
            className="position-absolute"
            style={{ top: "10px", right: "10px" }}
          >
            <p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              X
            </p>
          </div>
          <div className="text-center mb-4">
            <img width="200px" height="200px" src={Logo} alt="" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                type="password"
                placeholder="password"
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>
            <button className="btn btn-primary btn-block">Login</button>
          </form>
          <div className="text-center mt-3">
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

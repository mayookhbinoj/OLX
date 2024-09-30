import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { Firebase } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import RoundLoading from "../Loading/RoundLoading";
import swal from "sweetalert";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Using react-hook-form with zod for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    Firebase.auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        result.user.updateProfile({ displayName: data.name }).then(() => {
          Firebase.firestore().collection("OLXusers").doc(result.user.uid).set({
            id: result.user.uid,
            name: data.name,
            phone: data.phone,
          });
        });
      })
      .then(() => {
        swal("Success", "You have signed up successfully!", "success").then(
          () => {
            navigate("/login");
          }
        );
      })
      .catch((error) => {
        swal("Error", error.code.split("/")[1].split("-").join(" "), "error");
        setLoading(false);
        console.log("error", error.message);
      });
  };

  return (
    <>
      {loading && <RoundLoading />}
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card text-center" style={{ maxWidth: "400px" }}>
          <div className="card-header">
            <h5 className="mb-0">Sign Up</h5>
          </div>
          <div className="card-body">
            <img src={Logo} alt="Logo" width="200px" height="200px" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  {...register("name")}
                  name="name"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  {...register("email")}
                  name="email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  id="phone"
                  {...register("phone")}
                  name="phone"
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  id="password"
                  {...register("password")}
                  name="password"
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

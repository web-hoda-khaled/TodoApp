import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();
  let user = {
    email: "",
    password: "",
  };
  async function loginUser(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );

      if (data.msg == "done") {
        setDone("welcom back ");

        localStorage.setItem("token", `3b8ny__${data.token}`);
        setTimeout(function () {
          nav("/");
        }, 1000);
      }

      console.log(data);
    } catch (error) {
      setError(error.response.data.msg);
    }

    setIsLoading(false);
  }

  let validYup = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter Email Valid"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{4,8}$/, "password must start uppercase"),
  });

  const formik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: validYup,
  });

  return (
    <section className="sign-in d-flex justify-content-center align-items-center vh-100">
      <div className="container shadow p-5 mb-5 bg-body rounded-4 ">
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          ""
        )}
        {done ? (
          <div className="alert alert-success" role="alert">
            {done}
          </div>
        ) : (
          ""
        )}
        <div className="signin-content row align-items-center">
          <div className="signin-image col-md-6">
            <figure>
              <img
                className="w-100"
                src="Images/Notebook-cuate.png"
                alt="singIn"
              />
            </figure>
          </div>

          {/* form  */}
          <div className="signin-form col-md-6 boxShadow">
            <h2 className="form-title fw-bold">Login Form</h2>
            <form className="register-form mt-4" onSubmit={formik.handleSubmit}>
              <div className="form-group d-flex align-items-center mb-4">
                <label htmlFor="email">
                  <i className="fa-solid fa-envelope"></i>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger" role="alert">
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}

              <div className="form-group d-flex align-items-center mb-4">
                <label htmlFor="password">
                  <i className="fa-solid fa-lock"></i>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />{" "}
              </div>

              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger" role="alert">
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}

              <button type="submit" className="btn btn-primary">
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  " Login"
                )}
              </button>
            </form>
            <div className="social-login d-flex flex-column justify-content-center align-items-center mt-4">
              <p className="mt-3 me-3">
                Don't Have an Account ?
                <Link to="/register" className="text-primary  mx-3">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

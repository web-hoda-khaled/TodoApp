import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();
  let user = {
    name: "",
    email: "",
    password: "",
    age: 0,
    phone: "",
  };
  async function registerUser(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );

      if (data.msg == "done") {
        setDone("welcom back ");
        setTimeout(function () {
          nav("/login");
        }, 1000);
      }

      console.log(data);
    } catch (error) {
      setError(error.response.data.msg);
    }

    setIsLoading(false);
  }

  let validYup = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "min chars is 3 ")
      .max(10, "max chars is 10"),
    email: Yup.string()
      .required("email is required")
      .email("enter Email Valid"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{4,8}$/, "password must start uppercase"),
    age: Yup.number().required("Age is required").positive().integer(),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(02)?01[0125][0-9]{8}$/),
  });

  const formik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: validYup,
  });

  return (
    <>
      <section className="signup d-flex justify-content-center align-items-center vh-100">
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
          <div className="signup-content row">
            {/* form  */}

            <div className="signup-form col-md-6">
              <h2 className="form-title fw-bold">Register Form </h2>
              <form
                className="register-form mt-4"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-group d-flex align-items-center mb-4">
                  <label htmlFor="name">
                    <i className="fa-solid fa-user"></i>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger" role="alert">
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}
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
                  />
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger" role="alert">
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}
                <div className="form-group d-flex align-items-center mb-4">
                  <label htmlFor="phone">
                    <i className="fa-solid fa-phone"></i>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alert alert-danger" role="alert">
                    {formik.errors.phone}
                  </div>
                ) : (
                  ""
                )}{" "}
                <div className="form-group d-flex align-items-center mb-4">
                  <label htmlFor="age">
                    <i className="fa-regular fa-calendar-days"></i>
                  </label>
                  <input
                    type="number"
                    id="age"
                    placeholder="Age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.age && formik.touched.age ? (
                  <div className="alert alert-danger" role="alert">
                    {formik.errors.age}
                  </div>
                ) : (
                  ""
                )}
                <button type="submit" className="btn btn-primary">
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                  ) : (
                    " Register"
                  )}
                </button>
                <p className="mt-5 me-3">
                  Have an Account ?
                  <Link to="/login" className="text-primary mx-3">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>

            <div className="signup-image col-md-6 d-flex justify-content-center align-items-center px-5">
              <figure>
                <img
                  className="w-100"
                  src="Images/Add-notes-bro.png"
                  alt="singUp"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

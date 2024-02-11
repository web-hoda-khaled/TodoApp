import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  const [tkn, setTkn] = useState(null);
  useEffect(() => {
    setTkn(localStorage.getItem("token"));
  }, [tkn]);

  function logOut() {
    localStorage.removeItem("token");
    setTkn(null);
    nav("/login");
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light py-3 bg-light">
        <div class="container">
          <Link class="navbar-brand" to={"/"}>
            Note
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
              <li class="nav-item text-center">
                <Link class="nav-link " aria-current="page" to={"/"}>
                  Notes
                </Link>
              </li>
            </ul>

            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              {tkn ? (
                <li class="nav-item" onClick={logOut}>
                  <a class="nav-link">LogOut</a>
                </li>
              ) : (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link class="nav-link" to={"/register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  return (
    <>
      <nav 
        className="navbar navbar-expand-sm navbar-dark" 
        style={{backgroundColor: "black"}}
        >
        {/* App Name/Img */}
        <a
          className="navbar-brand mx-5"
          href="#">
          smolURL
        </a>

        {/* Nav Links*/}
        <ul className="navbar-nav mx-3">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#">
              Contact us
            </a>
          </li>
        </ul>

        {/* Sign In/Out Links*/}
        <ul className="navbar-nav mx-3" id="button-right">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-light mx-2 my-2"
              href="#">
              Sign In
            </button>
          </li>
          <li className="nav-item">
          <button
              type="button"
              className="btn btn-outline-secondary mx-2 my-2"
              href="#">
              Sign Up
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

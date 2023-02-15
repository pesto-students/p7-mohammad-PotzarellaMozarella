import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faCircleCheck,
  faPen,
  faTrashCan,
  faBackspace,
  faFaceSmileBeam,
} from "@fortawesome/free-solid-svg-icons";

export default function PgFooter() {
  return (
    <>
      <footer 
      className="bg-black text-center text-white border-top">
        <div className="container p-">
          <section className="mb-4 d-flex p-2 justify-content-center">
            <div className="pt-4">
              <span href="/////" className="p-4 icon">
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              <span href="/////" className="p-4 icon">
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              <span href="/////" className="p-4 icon" >
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              <span href="/////" className="p-4 icon">
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              <span href="/////" className="p-4 icon">
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              <span href="/////" className="p-4 icon">
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            </div>
          </section>
        </div>

        <div className="container p-4">
          <a href=""
          className="text-white text-decoration-none">
            © 2020 Copyright:</a>
          <a href=""
            className="text-white text-decoration-none">
            smolURL.com
          </a>
        </div>

      </footer>
    </>
  );
}


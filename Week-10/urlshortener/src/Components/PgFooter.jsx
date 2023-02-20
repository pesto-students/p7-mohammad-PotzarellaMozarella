import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)

 {/* Page footer section with social media and copyright info*/}
export default function PgFooter() {
  return (
    <>
      <footer 
      className="bg-black text-center text-white border-top">
        <div className="container">
          <section className="mb-4 d-flex p-4 justify-content-center">
            <div className="icons pt-4">
              <a href="/////" className="btn btn-outline-light rounded-circle btn-floating m-3">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </a>
              <a href="/////" className="btn btn-outline-light btn-floating rounded-circle m-3">
                <FontAwesomeIcon icon={['fab', 'facebook']} />
              </a>
              <a href="/////" className="btn btn-outline-light btn-floating rounded-circle m-3" >
                <FontAwesomeIcon icon={['fab', 'linkedin']} />
              </a>
              <a href="/////" className="btn btn-outline-light btn-floating rounded-circle m-3">
                <FontAwesomeIcon icon={['fab', 'github']} />
              </a>
              <a href="/////" className="btn btn-outline-light btn-floating rounded-circle m-3">
                <FontAwesomeIcon icon={['fab', 'instagram']} />
              </a>
              <a href="/////" className="btn btn-outline-light btn-floating rounded-circle m-3">
                <FontAwesomeIcon icon={['fab', 'google']} />
              </a>
            </div>
          </section>
        </div>

        <div className="container pt-1 pb-5">
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


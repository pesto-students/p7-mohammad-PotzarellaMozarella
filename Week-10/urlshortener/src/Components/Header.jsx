import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import showcase from '../images/smolURL.svg';

export default function Header() {
  return (
    <>
      <div className="card">
        <img
          src={showcase}
          className="card-img-top"
          alt="showcase"
        />
        <div className="card-body">
          <h5 className="card-title">URL shortner</h5>
          <p className="card-text">
          ShortURL allows to reduce long links from Instagram, Facebook, YouTube, Twitter, Linked In and sites with authority on the Internet. Just paste the long URL and click the Shorten URL button. 
          </p>
        </div>
      </div>
    </>
  );
}

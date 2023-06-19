import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

 {/* Header section with text about the app*/}
export default function Header() {
  return (
    <>
      <div className="card rounded-0 text-bg-light">
        <div className="card-body my-5">
          <h5 className="card-title">URL shortner</h5>
          <p className="card-text">
          ShortURL allows to reduce long links from Instagram, Facebook, YouTube, Twitter, Linked In and sites with authority on the Internet. Just paste the long URL and click the Shorten URL button. 
          </p>
        </div>
      </div>
    </>
  );
}


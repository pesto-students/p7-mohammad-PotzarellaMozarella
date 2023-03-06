import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//helps validate URL input
import validator from 'validator'

// handles getting the short-links from the storage
// if none exists from previous sessions it returns []
const getLocalStorage = () => {
  let links = localStorage.getItem("links");
  if (links) return JSON.parse(localStorage.getItem("links"));
  else return [];
};

export default function Shortener() {
  //for URL input by user
  const [userInput, setUserInput] = useState("");
  //for setting new short-link in display and storing them in local storage
  const [links, setLinks] = useState(getLocalStorage());
  //for changing 'Copy' button text to 'Copied' on click
  const [buttonText, setButtonText] = useState("Copy");
  //for loading spinner
  const [loading, setLoading] = useState(false);
  //for URL input error message
  const [errorMessage, setErrorMessage] = useState('')


  // handles submit of long url
  // fetching the short urls using async/await
  // setting the result as new link
  // changing  the urlc input area to blank
  const handleSubmit = e => {
    e.preventDefault()
    //if input is empty throws as alert
    if (!userInput) {
      alert("Input is empty");
    } 
    //if input is invalid throws as alert
    else if (errorMessage == 'Is Not Valid URL') {
      alert("Input is invalid");
    }  
    else {
      const shortenLink = async () => {
        setLoading(true)
        try {
          const res = await fetch(
            `https://api.shrtco.de/v2/shorten?url=${userInput}`
          );
          const data = await res.json();
          console.log(data.result);
          setLinks(data.result);
          setUserInput("");
        }
        catch (error) {
          console.log('Error', error)
        }
        finally {
          setLoading(false);
        }
      }
      shortenLink()
    }
  }

  // handles copying link to clipboard
  // changing text on copy button on click
  const handleCopy = () => {
    navigator.clipboard.writeText(links.full_short_link);
    setButtonText("Copied!");
  };
  // handles storage of new short links in localStorage
  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  //validates uf input is a URL and sends error msg
  const validate = (value) => {
    if (validator.isURL(value)) {
      setErrorMessage('Is Valid URL')
    } else {
      setErrorMessage('Is Not Valid URL')
    }
  }

  return (
    <>
      {/* Uses ternary operator to show loading screen or component */}
      <div>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div
            style={{ backgroundColor: "black" }}
            className="pb-3 bb-1">
            {/* Input link section */}
            <form
              className="row g-3 pt-5 p-2 mx-2 d-flex justify-content-evenly "
              onSubmit={handleSubmit}>
              <div className="col-md-6">
                <input
                  type="url"
                  placeholder="Shorten a link here"
                  className="form-control"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    validate(e.target.value)}}
                />
                <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>
              </div>
              <div className="col-auto">
                <button
                  type="submit"
                  className="btn btn-light  mb-3"
                  onClick={handleSubmit}>
                  Shorten URL
                </button>
              </div>
            </form>

            {/* Shortened links section */}

            <div className="bg-black text-center">
              <article className="text-white my-4">
                <h6>{links.original_link}</h6>
              </article>

              <article>
                <ul className="list-group">
                  <li>
                    <button className="text-info bg-dark ">
                      {links.full_short_link}
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn my-3 btn-outline-light btn-sm"
                      onClick={handleCopy}>
                      {buttonText}
                    </button>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


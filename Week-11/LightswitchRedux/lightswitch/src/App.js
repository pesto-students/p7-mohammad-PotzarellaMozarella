import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Room from './Components/Room'

export default function App() {
  const [toggle, setToggle] = useState(true);
    const lightedness = toggle ? "dark" : "lit";
    const handleFlip = () => {
        setToggle(!toggle)
        }
  return (
    <div className="App">
      <>
                <div className={toggle ? 'bg-dark text-light' : 'bg-light text-dark'}>
                    <p>the room is {lightedness}</p>
                    <br />
                    <button onClick={handleFlip}>flip</button>
                </div>
            </>
    </div>
  );
}


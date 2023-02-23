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
                <div className={toggle ? 'bg-dark text-light h-100' : 'bg-light text-dark h-100'}>
                    <p>the room is {lightedness}</p>
                    <br />
                    <button onClick={handleFlip}>flip</button>
                </div>
            </>
    </div>
  );
}


import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Room() {
    const [toggle, setToggle] = useState(true);
    const lightedness = toggle ? "dark" : "lit";
    const handleFlip = () => {
      setToggle(!toggle)
    }
    return (
      <div className="App">
        
        <div className='container mt-4'>
        <div className={toggle ? 'bg-dark text-light min-vh-100 pt-4' : 'bg-light text-dark min-vh-100 pt-4'}>
            <p>the room is {lightedness}</p>
            <br />
            <button className='mt-10' onClick={handleFlip}>flip</button>
          </div>
        </div>
          
        
      </div>
    );
  }
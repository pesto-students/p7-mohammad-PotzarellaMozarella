import React from 'react';
import spinner from '../images/Spinner.gif';
import '../App.css';

{/* Custom Spinner for display when error boundaries catch error */}
function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        className='rounded-circle spinner'
      />
    </div>
  );
};

export default Spinner;


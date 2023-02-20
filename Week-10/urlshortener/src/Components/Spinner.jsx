import React from 'react';
import spinner from '../images/Spinner.gif';

{/* Custom Spinner for display when error boundaries catch error */}
function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Loading..."
        className='rounded-circle '
      />
    </div>
  );
};

export default Spinner;
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {taskInputForm} from './Components/Form';

function App() {
   return (
    <div className="container App">
      {/* Title */}
      <h1>To-Do List</h1>

       {/* Form to add tasks to-do */}
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter task to do" aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <button className="btn btn-lg btn-success" type="button" id="button-addon2">Add task</button>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {taskInputForm} from './Components/Form';

function App() {
  //Tasks state (to do list)- Main state
  const [toDo, setToDo] = useState([ 
    //status of tasks: false = not completed, true = completed
    {id: 1, title: "Task 1", status: false}, 
    {id: 2, title: "Task 2", status: false}
  ]);

  //Temporary states
  // newTask will hold temporary data to be added in task as new task
  const [newTask, setnewTask] = useState('');
  // updateData will hold task that is being edited
  const [updateData, setupdateData] = useState('');


   return (
    <div className="container App">
  {/* Title */}
      <h1>To-Do List</h1>

  {/* Form to add tasks to-do */}
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter task to do" aria-label="Enter task to do" aria-describedby="button-addon2"/>
        <button className="btn btn-lg btn-success" type="button" id="button-addon2">Add task</button>
      </div>

  {/*To display message if to do list is empty */}
      { toDo && toDo.length ? '' : 'No tasks added yet'} 

  {/*To sort the tasks by index and display */}
      { toDo && toDo
        .sort((a,b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key= {task.id}>
              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskDetails'>{task.title}</span>
                </div>
                <div className='iconsWrapper'>
                  <span title='Mark done'>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  <span title='Edit'>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                  <span title='Delete'>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }




    </div>
  );
}

export default App;

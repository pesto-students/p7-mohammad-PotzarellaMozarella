import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faL, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {taskInputForm} from './Components/Form';

function App() {
  //Tasks state (to do list)- Main state
  const [toDo, setToDo] = useState([ 
    //status of tasks: false = not completed, true = completed
    // {id: 1, title: "Task 1", status: false}, 
    // {id: 2, title: "Task 2", status: false}
  ]);

  //Temporary states
  // newTask will hold temporary data to be added in task as new task
  const [newTask, setnewTask] = useState('');
  // updateData will hold task that is being edited
  const [updateData, setupdateData] = useState('');

  //Add task function
  const addTask = () => {
    //if there is a newTask we create 1) a newEntry object 2) setToDo with it 3) reset the newTask element
    if(newTask){
      let num = toDo.length + 1;
      let newEntry = {id: num, title: newTask, status: false}
      setToDo([...toDo, newEntry]);
      setnewTask('');
    }
  }

  //Delete task function
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id != id)
    setToDo(newTasks);
  }

  //Mark completed task function
  const markDone = (id) => {
    //toggle the status between true and false
    let newTask = toDo.map(task => {
      if(task.id === id) {
        return (
          {...task, status: !task.status}
        )
      }
    return task;  
    })
    setToDo(newTask);
  }

  //Update task function
  const updateTask = () => {
    //filters out the task with the same ID as coming via updateData 
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    //create a new object with all updated records
    let updatedObject = [...filterRecords, updateData];
    //change the previous ToDo state to new updated object of records
    setToDo(updatedObject);
    //clear temp state
    setupdateData('');
  }

  //Cancel update task function
  const cancelUpdate = () => {
    //clears the temp state 
    setupdateData('');
  }

  //Change task for update function
  const changeTask = (e) => {
    //takes the task as event from edit icon and updates the value to input form for update
    //updateData input used to extract id and event target value for title
    //status updated depending on its given status
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    //updated entru added to setUpdateData
    setupdateData(newEntry);
  }

  return (
    <div className="container App">
  {/* Title */}
      <h1>To-Do List</h1>

  

  {/* Based on updateData existing, i.e edit icon being clicked either of the Forms will render */}
   {updateData ? (
    <>
    {/* Forms to add & update tasks to-do */}
      <div className="input-group mb-3">
        <input 
        type="text"
          className="form-control mx-2"
          placeholder="Pick a task to edit"
          value= { updateData && updateData.title }
          onChange={ (e) => changeTask(e)}
        />
        <div className="col-auto">
          <button 
            className="btn btn-lg btn-success mr-20" 
            onClick={updateTask}
            >
            Update task
          </button>
          <button 
            className="btn btn-lg btn-warning mx-2" 
            onClick={cancelUpdate}
            type="button" >
            Cancel
          </button>
        </div>
      </div>
    </>
   ) : (
    <>
      {/* Form to add tasks to-do */}
      <div className="input-group mb-3">
        <input type="text" 
          className="form-control" 
          placeholder="Enter task to do"
          value= {newTask}
          onChange= {(e) => {setnewTask(e.target.value)}}
        />
        <button className="btn btn-lg btn-success" 
          type="button" 
          id="button-addon2"
          onClick={addTask}>
          Add task
        </button>
      </div>
    </>
   )}
   

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
                  <span title='Mark done' 
                    onClick={() => {markDone(task.id)}}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  {/* If the task status is false (not completed) only then show edit option */}
                  {task.status ? null : ( 
                    <span title='Edit'
                      onClick={() => {setupdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>)}
                 
                  <span title='Delete' 
                    onClick={() => {deleteTask(task.id)}}>
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

import './App.css'
//react
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
//components
import AddTaskForm from './Components/AddTaskForm'
import UpdateForm from './Components/UpdateForm'
import ToDo from './Components/ToDo'

function App() {
  //Tasks state (to do list)- Main state
  const [toDo, setToDo] = useState([ 
    //status of tasks: false = not completed, true = completed
    // {id: 1, title: "Task 1", status: false}, 
  ])

  //Temporary states
  // newTask will hold temporary data to be added in task as new task
  const [newTask, setnewTask] = useState('')
  // updateData will hold task that is being edited
  const [updateData, setupdateData] = useState('')

  useEffect(() => { 
    setTasksRemaining(tasks.filter(task => !task.completed).length) 
  });

  //Add task function
  ///////////////////////////
  const addTask = () => {
    //if there is a newTask we create 1) a new entry object 2) setToDo with it 3) reset the newTask element
    if(newTask){
      let num = toDo.length + 1
      setToDo([...toDo, {id: num, title: newTask, status: false}])
      setnewTask('')
    }
  }

  //Delete task function
   ///////////////////////////
  const deleteTask = (id) => {
    // filtering out the record with id to be deleted in todos
    setToDo(toDo.filter(task => task.id != id))
  }

  //Mark completed task function
   ///////////////////////////
  const markDone = (id) => {
    //toggle the status between true and false status if the id is found in the todos list
    setToDo(toDo.map(
      task => task.id === id 
      ? ({...task, status: !task.status}) 
      : (task)   
      )
    )
  }

  //Change holder for update function
   ///////////////////////////
  const changeHolder = (e) => {
    //takes the task as event from edit icon and updates the value to input form for update
    //updateData input used to extract event target value for title for change
    //task object updated
    setupdateData({
      ...updateData,
      title: e.target.value
    })
  }

    //Update task function
   ///////////////////////////
   const updateTask = () => {
    //filters out the task with the same ID as coming via updateData 
    let removeOldRecord = [...toDo].filter(task => task.id !== updateData.id)
    ////change the previous ToDo state to new updated object of records
    setToDo([
        ...removeOldRecord, 
        updateData
    ])
    //clear temp state
    setupdateData('')
  }


  //Cancel update task function
   ///////////////////////////
   const cancelUpdate = () => {
    //clears the temp state 
    setupdateData('')
  }

  return (
    <div className="container App">

      {/* Title */}
      <h1 className='page-header'>To-Do List</h1>

      <div className="header">Pending tasks ({tasksRemaining})</div>

      {/* Based on updateData existing, i.e edit icon being clicked either of the Forms will render */}
      {updateData ? (
      <UpdateForm 
          updateData={updateData}
          changeHolder={changeHolder}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm 
          newTask={newTask}
          setnewTask={setnewTask}
          addTask={addTask}
        />
      )}

      {/*To display message if to do list is empty */}
      { toDo && toDo.length ? '' : 'No tasks added yet'} 

      {/*To sort the tasks by index and display */}
      <ToDo
        toDo= {toDo}
        markDone= {markDone}
        setupdateData= {setupdateData}
        deleteTask= {deleteTask}
      />
    </div>
    )
  }

export default App

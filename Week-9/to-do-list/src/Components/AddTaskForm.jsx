function AddTaskForm({newTask, setnewTask, addTask}) {
  return (
    <>
    {/* Add new tasks */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter task to do"
          value= {newTask}
          onChange= {(e) => { setnewTask(e.target.value)}}
        />
        <button
          className="btn btn-lg btn-success"
          type="button"
          id="button-addon2"
          onClick={addTask}>
          Add task
        </button>
      </div>
    </>
    
  )
}

export default AddTaskForm
function updateForm({updateData, changeHolder, updateTask, cancelUpdate}) {
    return (
        <>
        {/* Update Tasks- edit, update edit and cancel edit */}
        <div className="input-group mb-3">
            <input 
            type="text"
              className="form-control mx-2"
              placeholder="Pick a task to edit"
              value= { updateData && updateData.title }
              onChange={ (e) => changeHolder(e)}
            />
            <div className="col-auto">
              <button 
                className="btn btn-lg btn-success mr-20" 
                id= "btnUpdate"
                onClick={updateTask}
                >
                Update task
              </button>
              <button 
                className="btn btn-lg btn-warning mx-2" 
                id= "btnCancel"
                onClick={cancelUpdate}
                type="button" >
                Cancel
              </button>
            </div>
          </div>
        </>
    )
}


export default updateForm
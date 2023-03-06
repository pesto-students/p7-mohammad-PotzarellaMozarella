import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function ToDo({toDo, markDone, setupdateData, deleteTask}) {

  const todoslist = toDo
  .sort((a,b) => a.id > b.id ? 1 : -1)
  return (
        <>
        {/* Adds To Dos by sorting them in order of index, displays id and title, and shows icons for marking done, edit or deleting todos */}
            { todoslist.map((task, index) => {
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
                          onClick={() => {setupdateData(task)}}
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
        </>
    )
}

export default ToDo
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from "react-redux";
//imports the reducers for actions 
import { addStep, resetSteps } from '../Store/stepReducer.js';


export default function Steps(props) {
    //helps access data/switch status from the global store using callback function
    const stepsValue = useSelector((state) => state.steps.count);
    const dispatch = useDispatch();

    //uses useDispatch hook to call action creators on click
    function AddStepsHandler() {
        dispatch(addStep());
    }
    function ResetStepsHandler() {
        dispatch(resetSteps());
    }
    return (
        <div className="App">
            <div className='container mt-4 p-5 my-5 border border-dark border-3 rounded w-50 bg-secondary text-white'>
                <div className='w-100 my-3'>You've walked {stepsValue} steps today!</div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <Button variant="dark" size="sm" className='w-100 my-2' 
                            onClick={() => { AddStepsHandler() }}>
                                Add a Step
                            </Button>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <Button variant="light" size="sm" className='w-100 my-2'
                            onClick={() => { ResetStepsHandler() }}>
                                Reset Steps
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}


{/* <div className='container mt-4'>
          <div className={switchValue ? 'bg-dark text-light min-vh-100 pt-4' : 'bg-light text-dark min-vh-100 pt-4'}>
            <p>the room is {switchValue ? "dark" : "lit"}</p>
            <br />
            <button className='mt-10' onClick={() => { ToggleSwitchHandler() }}>flip</button>
          </div>
        </div> */}
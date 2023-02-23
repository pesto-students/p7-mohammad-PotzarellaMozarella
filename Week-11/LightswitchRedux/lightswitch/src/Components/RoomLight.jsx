import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
//imports the reducers for actions 
import { toggleLight, toggleDark } from '../Store/switchReducer.jsx';

export default function RoomLight(props) {
  //helps access data/switch status from the global store using callback function
  const switchValue = useSelector((state) => state.light.status);
  const dispatch = useDispatch();

  //uses useDispatch hook to call action creators on click
  function ToggleSwitchHandler() {
    if (switchValue == true) {
      dispatch(toggleLight());
    } else {
      dispatch(toggleDark());
    }
  }
  return (
    <div className="App">
      <div className='container mt-4'>
        <div className={switchValue ? 'bg-dark text-light min-vh-100 pt-4' : 'bg-light text-dark min-vh-100 pt-4'}>
          <p>the room is {switchValue ? "dark" : "lit"}</p>
          <br />
          <button className='mt-10' onClick={() => { ToggleSwitchHandler() }}>flip</button>
        </div>
      </div>
    </div>
  );
}
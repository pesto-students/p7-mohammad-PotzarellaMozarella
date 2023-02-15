import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Components/Header';
import Navbar from './Components/Navbar'
import Shortener from './Components/Shortener';
import './App.css'


export default function App() {
  return (
    <div className="App">  
      <Navbar></Navbar>
      <Header></Header>
      <Shortener></Shortener>
      {/* <Output links/>  */}
      {/* <PgFooter></PgFooter> */}
    </div>
  );
}



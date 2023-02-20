import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Components/Header';
import Navbar from './Components/Navbar'
import Shortener from './Components/Shortener';
import PgFooter from './Components/PgFooter';
import ErrorBoundary from './Components/ErrorBoundary';

export default function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Header></Header>
      <ErrorBoundary>
        <Shortener></Shortener>
      </ErrorBoundary>
      <Shortener></Shortener>
      <PgFooter></PgFooter>
    </div>
  );
}



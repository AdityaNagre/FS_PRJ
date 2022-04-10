import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from "./context/Notes/noteStates"

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <div className="container">
    <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    <Route exact path="/about" element={<About/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>

    </>
  );
}

export default App;

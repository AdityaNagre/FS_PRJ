import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App=()=>{
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setprogress] = useState(0)

  const setP=(prg)=>{
    setprogress(prg)
  }
    return (
      <div>
        <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={progress}
        />
        <NavBar/>
            <Routes>
                <Route exact path="/" element={<News setProgress={setP} apiKey={apiKey} headline="TOP HEADLINES" key="general" pageSize={12} category="general"/>}></Route>
                <Route exact path="/business" element={<News setProgress={setP} apiKey={apiKey} headline="BUSINESS" key="business" pageSize={12} category="business"/>}></Route>
                <Route exact path="/entertainment" element={<News setProgress={setP} apiKey={apiKey} headline="ENTERTAINMENT" key="entertainment" pageSize={12} category="entertainment"/>}></Route>
                <Route exact path="/health" element={<News setProgress={setP} apiKey={apiKey} headline="HEALTH" key="health" pageSize={12} category="health"/>}></Route>
                <Route exact path="/science" element={<News setProgress={setP} apiKey={apiKey} headline="SCIENCE" key="science" pageSize={12} category="science"/>}></Route>
                <Route exact path="/sports" element={<News setProgress={setP} apiKey={apiKey} headline="SPORTS" key="sports" pageSize={12} category="sports"/>}></Route>
                <Route exact path="/technology" element={<News setProgress={setP} apiKey={apiKey} headline="TECHNOLOGY" key="technology" pageSize={12} category="technology"/>}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;

import './App.css';
import React, {useState} from 'react';
import HomeComponent from "./components/HomeComponent";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SingleUserData from "./components/SingleUserData";
import {Button} from "@mui/material";




function App() {
    const [currUserId, setCurrUserId] = useState('')
    return(
        <div className={'App'}>
            <BrowserRouter>
                <Button href={'/'}>
                    Home
                </Button>
                <Routes>
                    <Route exact path='*' element={< HomeComponent numData={100} setCurrUserId={setCurrUserId}/>}></Route>
                    <Route exact path={`/id=${currUserId}`} element={< SingleUserData id={currUserId}/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;

import './App.css';
import React, { useState } from 'react';
import HomeComponent from "./components/HomeComponent";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SingleUserData from "./components/SingleUserData";
import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from '@mui/system';




function App() {
    const [currUserId, setCurrUserId] = useState('')
    return (
        <div className={'App'}>
            <BrowserRouter>
            <Box sx={{ flexGrow: 1 }}>  
                <AppBar position="static" elevation="0">
                    <Toolbar>
                        <Button href={'/'} color="inherit">
                            Home
                        </Button>
                    </Toolbar>

                </AppBar>
                </Box>
                <Routes>
                        <Route exact path={`/id=${currUserId}`} element={< SingleUserData id={currUserId} setCurrUserId={setCurrUserId} />}></Route>
                        <Route exact path='*' element={< HomeComponent numData={100} setCurrUserId={setCurrUserId} />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;

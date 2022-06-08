import './App.css';
import React, { useState, useEffect } from 'react';
import HomeComponent from "./components/HomeComponent";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SingleUserData from "./components/SingleUserData";
import ExperimentSelector from './components/ExperimentSelector'
import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {main:'#455A64'},
    secondary:{main: '#4527a0'}
  },
});



function App() {
    const [currUserId, setCurrUserId] = useState('')
    const [experiment_num, set_experiment_num] = useState('')
    return (
        <div className="App">
    <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" elevation="0" color="primary">
                        <Toolbar>
                            <Button href={'/'} className="button" sx={{color: "white"}}>
                                Home
                            </Button>
                        </Toolbar>

                    </AppBar>
                </Box>
                <div>
                </div>
                <Routes>    
                    <Route exact path='/' element={< HomeComponent numData={100} setCurrUserId={setCurrUserId} set_experiment_num={set_experiment_num}/>}></Route>
                    <Route exact path={`/user/:id`} element={< SingleUserData id={currUserId} setCurrUserId={setCurrUserId} experiment_number={experiment_num} />}></Route>
                </Routes>
            </BrowserRouter>
            </ThemeProvider>
        </div>
    )
}

export default App;

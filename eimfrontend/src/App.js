import './App.css';
import React, { useState, useEffect } from 'react';
import HomeComponent from "./components/HomeComponent";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SingleUserData from "./components/SingleUserData";
import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: {main:'#455A64'},
    secondary:{main: '#4527a0'}
  },
});



function App() {
    const [currUserId, setCurrUserId] = useState('')

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
                <Routes>    
                    <Route exact path={`/user/:id`} element={< SingleUserData id={currUserId} setCurrUserId={setCurrUserId} />}></Route>
                    <Route exact path='/' element={< HomeComponent numData={100} setCurrUserId={setCurrUserId} />}></Route>
                </Routes>
            </BrowserRouter>
            </ThemeProvider>
        </div>
    )
}

export default App;

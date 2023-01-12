import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/userComponents/Login';
import SignUp from './components/userComponents/SignUp';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function App () {
  return ( 
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<SignUp/>} />
            </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}



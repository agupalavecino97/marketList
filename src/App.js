import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import CrudApp from "./components/CrudApp";

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

// function App() {
//   return (
//     <>
//       <h1> REACT </h1>
//       <hr/>
//       <CrudApp/>
//     </>
//   );
// }

// export default App;
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



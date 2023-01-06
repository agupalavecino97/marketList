import React, { useState, useEffect } from 'react';
// import Footer from "./components/Footer";
import Header from "./Header";
import NewList from "./NewList";
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';

const Home = () => {

    const styles = {
        BtnFloat: {
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 16,
            padding: '6px 12px',
            border: '1px solid',
            lineHeight: 1.5,
            color: '#eee',
            backgroundColor: '#064851',
            borderColor: '#064851',
            fontFamily: [
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
              backgroundColor: '#043238',
              borderColor: '#043238',
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
              backgroundColor: '#1e5a62',
              borderColor: '#1e5a62',
            },
            '&:focus': {
              boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
            }
        }
    };
    
    const [currentList, setCurrentList] = useState([]);
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        let authToken = localStorage.getItem('token');
        if (authToken !== null && authToken !== undefined) {
            // const expiration = localStorage.getItem("EXPIRES_IN");
            // const expiresAt = JSON.parse(expiration);
            // if (moment().isBefore(moment(expiresAt))) {
                setCurrentUser(localStorage.getItem('user'))
            // } else {
                // setCurrentUser("")
            // }
        } else {
            setCurrentUser("")
        }
    }); // cuando tenemos este segundo parametro vacio el useEfffect se ejecuta solo una vez 

    return (
        <main style={{height: '100vh', background: '#F5F2EB'}}>
            <Header currentUser={currentUser} />
            <NewList list={currentList} setCurrentList={setCurrentList}/>
            <Grid item xs={12}>
                {
                    (currentList.length > 0 && currentUser !== '') &&
                    <Fab sx={{ position: 'absolute', bottom: 16, right: 16}} variant="extended" aria-label='Add' style={styles.BtnFloat}>
                        Guardar Lista <LibraryAddIcon sx={{ ml: 1 }}/>
                    </Fab>
                }
                { 
                    currentUser !== '' && 
                    <Fab sx={{ position: 'absolute', bottom: 16, left: 16}} variant="extended" aria-label='Add' style={styles.BtnFloat}>
                        Mis listas <ListAltSharpIcon sx={{ ml: 1 }}/>
                    </Fab>
                }
               
            </Grid>
        </main>
    );
}

export default Home
import React, { useState, useEffect } from 'react';
// import Footer from "./components/Footer";
import Header from "./Header";
import NewList from "./NewList";
import SaveList from './SaveList';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import { APIs } from '../helpers/apis';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const initialListData = {
    id: null,
    nombre: "",
    precio: 100,
    estado: 0
}

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
    const [openModal, setOpenModal] = useState(false);
    const [listData, setlistData ] = useState(initialListData);
    const [showLists, setShowLists] = useState(false);
    const [open, setOpen] = useState(false);
    const [typeAlert, setTypeAlert] = useState("");
    const [message, setMessage] = useState("");

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

    const handleOpenAlert = (type, message) => {
        setTypeAlert(type);
        setMessage(message);
        setOpen(true);
      };
    
      const handleCloseAlert = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
      };

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

     const onSaveList = async () => {
        handleCloseModal();
        try {
            let data = {
                lista: listData,
                items: currentList
            }
            axios.defaults.headers.common.Authorization = localStorage.getItem('token');
            const res = await axios.post(APIs.LISTA, data);
            if (res.data.error) {
              handleOpenAlert('error', res.data.error);
            } else {
              if (res.data.message) {
                handleOpenAlert('warning', res.data.message);
              } else {
                if (res.data.data) {
                    handleOpenAlert('success', 'Lista guardada correctamente');
                    setlistData({ ...currentList, id: res.data.data})

                } else {
                    handleOpenAlert('error', 'Error en el servidor');                    
                }
              }
            }
          } catch (err) {
              console.error(err);
          }
    }
    return (
        <main style={{height: '100vh', background: '#F5F2EB'}}>
            <Header currentUser={currentUser} />
            {
                !showLists &&
                <NewList list={currentList} setCurrentList={setCurrentList}/>
            }
            <Grid item xs={12}>
                {
                    (currentList.length > 0 && currentUser !== '') &&
                    <Fab sx={{ position: 'absolute', bottom: 16, right: 16}} variant="extended" aria-label='Add' style={styles.BtnFloat} onClick={handleOpenModal}>
                        Guardar Lista <LibraryAddIcon sx={{ ml: 1 }}/>
                    </Fab>
                }
                { 
                    currentUser !== '' && 
                    <Fab sx={{ position: 'absolute', bottom: 16, left: 16}} variant="extended" aria-label='Add' style={styles.BtnFloat}>
                        Mis listas <ListAltSharpIcon sx={{ ml: 1 }}/>
                    </Fab>
                }
                <SaveList open={openModal} handleSaveList={onSaveList} handleClose={handleCloseModal} listData={listData} setlistData={setlistData}/>
                 <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeAlert} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Grid>
        </main>
    );
}

export default Home
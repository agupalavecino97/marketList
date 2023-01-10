import React, { useState, useEffect } from 'react';
// import Footer from "./components/Footer";
import Header from "./Header";
import NewList from "./NewList";
import SaveList from './SaveList';
import ShowLists from './ShowLists'
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
    const [lists, setLists] = useState(null);
    const [open, setOpen] = useState(false);
    const [typeAlert, setTypeAlert] = useState("warning");
    const [message, setMessage] = useState("");
    const [idIemsDelete, setIdIemsDelete] = useState([]);

    
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

    const handleGetLists = async () => {
        setShowLists(true);
        try {
            axios.defaults.headers.common.Authorization = localStorage.getItem('token');
            const res = await axios.get(APIs.LISTA);
            if (res.data.error) {
              handleOpenAlert('error', res.data.error);
            } else {
                if (res.data.data) {
                    // let lists = .data;
                    setLists( res.data.data );
                } else {
                    handleOpenAlert('error', 'Error en el servidor');                    
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSelectList = async (list) => {
        try {
            setlistData(list);
            axios.defaults.headers.common.Authorization = localStorage.getItem('token');
            const res = await axios.get(APIs.LISTA_DETALLE + '/'+ list.id);
            if (res.data.error) {
              handleOpenAlert('error', res.data.error);
            } else {
                if (res.data.data) {
                    console.log(res.data.data);
                    setCurrentList(res.data.data);       
                    setShowLists(false);

                } else {
                    handleOpenAlert('error', 'Error en el servidor');                    
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteList = async (id) => {
        // setShowLists(false);
        try {
            axios.defaults.headers.common.Authorization = localStorage.getItem('token');
            const res = await axios.delete(APIs.LISTA + '/'+ id);
            if (res.data.error) {
              handleOpenAlert('error', res.data.error);
            } else {
                if (res.data.message) {
                    handleOpenAlert('success', res.data.message);                    
                    let newData = lists.filter( el => el.id !== id);
                    setLists( newData );
                } else {
                    handleOpenAlert('error', 'Error en el servidor');                    
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSaveList = async () => {
        if (listData.id != null) {
            try {
                axios.defaults.headers.common.Authorization = localStorage.getItem('token');
                let data = {
                    items: currentList,
                    idItemasDelete: idIemsDelete,
                }
                console.log(data)
                const res = await axios.put(APIs.LISTA + '/' + listData.id, data);
                if (res.data.error) {
                  handleOpenAlert('error', res.data.error);
                } else {
                    if (res.data.message) {
                        setIdIemsDelete([]);
                        handleOpenAlert('success', res.data.message);                    
                    } else {
                        handleOpenAlert('error', 'Error en el servidor');                    
                    }
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            handleOpenModal();
        }
    }
 
    return (
        <main style={{height: '100vh', background: '#F5F2EB'}}>
            <Header currentUser={currentUser} />
            {
                !showLists &&
                <NewList list={currentList} setCurrentList={setCurrentList} id_list={listData.id} idIemsDelete={idIemsDelete} setIdIemsDelete={setIdIemsDelete}/>
            }
            {
                showLists &&
                <ShowLists lists={lists} handleSelectList={handleSelectList} handleDeleteList={handleDeleteList}/>
            }
            <Grid item xs={12}>
                {
                    ((currentList.length > 0 || listData.id != null) && currentUser !== '' && !showLists) &&
                    <Fab sx={{ position: 'absolute', bottom: 16, right: 16}} variant="extended" aria-label='Add' style={styles.BtnFloat} onClick={handleSaveList}>
                        Guardar Lista <LibraryAddIcon sx={{ ml: 1 }}/>
                    </Fab>
                }
                { 
                    (currentUser !== '' && !showLists) && 
                    <Fab sx={{ position: 'absolute', bottom: 16, left: 16}} variant="extended" aria-label='Add' style={styles.BtnFloat} onClick={handleGetLists}>
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
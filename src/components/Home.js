import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
// components
import Header from "./Header";
import NewList from "./listComponents/NewList";
import SaveList from "./listComponents/SaveList";
import ShowLists from "./listComponents/ShowLists";
import Loader from "../utils/Loader";
// helpers
import { APIs } from "../helpers/apis";
import axios from "axios";
// MUI
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
// MUI Icons
import SaveIcon from "@mui/icons-material/Save";
import ListAltSharpIcon from "@mui/icons-material/ListAltSharp";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const initialListData = {
  id: null,
  nombre: "",
  precio: 100,
  estado: 0,
};

const Home = () => {
  const styles = {
    BtnFloat: {
      boxShadow: "none",
      textTransform: "none",
      fontSize: 14,
      padding: "6px 10px",
      border: "1px solid",
      lineHeight: 1.5,
      color: "#eee",
      backgroundColor: "#064851",
      borderColor: "#064851",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        backgroundColor: "#043238",
        borderColor: "#043238",
        boxShadow: "none",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#1e5a62",
        borderColor: "#1e5a62",
      },
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
      },
    },
  };

  const [currentList, setCurrentList] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [listData, setlistData] = useState(initialListData);
  const [showLists, setShowLists] = useState(false);
  const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [idIemsDelete, setIdIemsDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMain, setLoadingMain] = useState(true);
  const [loadingSecondary, setLoadingSecondary] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingSelect, setLoadingSelect] = useState(false);

  const [typeAlert, setTypeAlert] = useState("warning");
  const [message, setMessage] = useState("");

  const startLoading = useCallback(() => {
    setLoadingMain(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingMain(false);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    startLoading();
    let authToken = localStorage.getItem("token");
    if (authToken !== null && authToken !== undefined) {
      // const expiration = localStorage.getItem("EXPIRES_IN");
      // const expiresAt = JSON.parse(expiration);
      // if (moment().isBefore(moment(expiresAt))) {
      setCurrentUser(localStorage.getItem("user"));
      // } else {
      // setCurrentUser("")
      // }
    } else {
      setCurrentUser("");
    }
    setTimeout(() => {
      stopLoading();
    }, 2000);
  }, [startLoading, stopLoading]); // cuando tenemos este segundo parametro vacio el useEfffect se ejecuta solo una vez

  const handleOpenAlert = (type, message) => {
    setTypeAlert(type);
    setMessage(message);
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onSaveList = async () => {
    handleCloseModal();
    setLoading(true);
    try {
      let data = {
        lista: listData,
        items: currentList,
      };
      axios.defaults.headers.common.Authorization =
        localStorage.getItem("token");
      const res = await axios.post(APIs.LISTA, data);
      if (res.data.error) {
        handleOpenAlert("error", res.data.error);
      } else {
        if (res.data.message) {
          handleOpenAlert("warning", res.data.message);
        } else {
          if (res.data.data) {
            handleOpenAlert("success", "Lista guardada correctamente");
            listData.id = res.data.data;
            setlistData({ ...listData, id: res.data.data });
          } else {
            handleOpenAlert("error", "Error en el servidor");
          }
        }
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      handleOpenAlert('error', err);
      navigate('/');
    }
  };

  const handleGetLists = async () => {
    setShowLists(true);
    setLoadingSecondary(true);
    try {
      axios.defaults.headers.common.Authorization =
        localStorage.getItem("token");
      const res = await axios.get(APIs.LISTA);
      if (res.data.error) {
        handleOpenAlert("error", res.data.error);
      } else {
        if (res.data.data) {
          setLists(res.data.data);
        } else {
          handleOpenAlert("error", "Error en el servidor");
        }
        setTimeout(() => {
          setLoadingSecondary(false);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      handleOpenAlert('error', error);
      navigate('/');
    }
  };

  const handleSelectList = async (list) => {
    setLoadingSelect(true);
    try {
      setlistData(list);
      axios.defaults.headers.common.Authorization =
        localStorage.getItem("token");
      const res = await axios.get(APIs.LISTA_DETALLE + "/" + list.id);
      if (res.data.error) {
        handleOpenAlert("error", res.data.error);
      } else {
        if (res.data.data) {
          setCurrentList(res.data.data);
          setShowLists(false);
        } else {
          handleOpenAlert("error", "Error en el servidor");
        }
      }
      setLoadingSelect(false);
    } catch (error) {
      console.error(error);
      handleOpenAlert('error', error);
      navigate('/');
    }
  };

  const handleDeleteList = async (id) => {
    setLoadingDelete(true);
    try {
      axios.defaults.headers.common.Authorization =
        localStorage.getItem("token");
      const res = await axios.delete(APIs.LISTA + "/" + id);
      if (res.data.error) {
        handleOpenAlert("error", res.data.error);
      } else {
        if (res.data.message) {
          handleOpenAlert("success", res.data.message);
          let newData = lists.filter((el) => el.id !== id);
          setLists(newData);
          if (listData.id === id) {
            setlistData(initialListData);
            setCurrentList([]);
          }
        } else {
          handleOpenAlert("error", "Error en el servidor");
        }
      }
      setLoadingDelete(false);
    } catch (error) {
      console.error(error);
      handleOpenAlert('error', error);
      navigate('/');
    }
  };

  const handleSaveList = async () => {
    if (listData.id != null) {
      setLoading(true);
      try {
        axios.defaults.headers.common.Authorization =
          localStorage.getItem("token");
        let data = {
          items: currentList,
          idItemasDelete: idIemsDelete,
        };
        const res = await axios.put(APIs.LISTA + "/" + listData.id, data);
        if (res.data.error) {
          handleOpenAlert("error", res.data.error);
        } else {
          if (res.data.message) {
            setIdIemsDelete([]);
            handleOpenAlert("success", res.data.message);
          } else {
            handleOpenAlert("error", "Error en el servidor");
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        handleOpenAlert('error', error);
        navigate('/');
      }
    } else {
      handleOpenModal();
    }
  };

  const handleNewList = () => {
    setlistData(initialListData);
    setCurrentList([]);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setlistData(initialListData);
    setCurrentList([]);
    setCurrentUser("");
    setShowLists(false);
    setLists([]);
    setOpen(false);
    setIdIemsDelete([]);
    setLoading(false);
    setLoadingMain(false);
    setLoadingSecondary(false);
    setLoadingDelete(false);
    setLoadingSelect(false);
    window.location.reload(false);
  };

  return (
    <main
      style={{
        height: "100vh",
        background: loadingMain ? "#064851" : "#F5F2EB",
        overflow: 'scroll',
      }}
    >
      <Loader when={loadingMain} />
      {!loadingMain && (
        <React.Fragment>
          <Header currentUser={currentUser} logOut={logOut} />
          <Grid container>
            <Grid item xs={12}>
              {!showLists && (
                <NewList
                  list={currentList}
                  setCurrentList={setCurrentList}
                  listData={listData}
                  idIemsDelete={idIemsDelete}
                  setIdIemsDelete={setIdIemsDelete}
                  loading={loading}
                />
              )}
              {showLists && (
                <ShowLists
                  lists={lists}
                  handleSelectList={handleSelectList}
                  listData={listData}
                  handleDeleteList={handleDeleteList}
                  setShowLists={setShowLists}
                  loading={loadingSecondary}
                  loadingDelete={loadingDelete}
                  loadingSelect={loadingSelect}
                />
              )}
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              xs={12}
              item
              component="footer"
              sx={{ position: "fixed", bottom: "1em" }}
            >
              {currentUser !== "" && !showLists && (
                <Box>
                  <Fab
                    variant="extended"
                    aria-label="Add"
                    style={styles.BtnFloat}
                    onClick={handleGetLists}
                    disabled={loading}
                  >
                    Mis listas <ListAltSharpIcon sx={{ ml: 1 }} />
                  </Fab>
                </Box>
              )}
              {currentUser !== "" && !showLists && listData.id != null && (
                <Box>
                  <Fab
                    variant="extended"
                    aria-label="Add"
                    style={styles.BtnFloat}
                    onClick={handleNewList}
                    disabled={loading}
                  >
                    Nueva lista <NoteAddIcon sx={{ ml: 1 }} />
                  </Fab>
                </Box>
              )}
              {(currentList.length > 0 || listData.id != null) &&
                currentUser !== "" &&
                !showLists && (
                  <Box>
                    <Fab
                      variant="extended"
                      aria-label="Add"
                      style={styles.BtnFloat}
                      onClick={handleSaveList}
                      disabled={loading}
                    >
                      {!loading && "Guardar"}
                      {loading ? (
                        <CircularProgress
                          sx={{
                            color: "#eee",
                            position: "absolute",
                            top: 3,
                            left: 2,
                            zIndex: 1,
                          }}
                        />
                      ) : (
                        <SaveIcon sx={{ ml: 1 }} />
                      )}
                    </Fab>
                  </Box>
                )}
            </Grid>
            <SaveList
              open={openModal}
              handleSaveList={onSaveList}
              handleClose={handleCloseModal}
              listData={listData}
              setlistData={setlistData}
            />
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert
                onClose={handleCloseAlert}
                severity={typeAlert}
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </Grid>
        </React.Fragment>
      )}
    </main>
  );
};

export default Home;

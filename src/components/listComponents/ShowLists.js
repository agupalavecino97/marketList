import React from "react";
import { useState } from "react";

import LoaderSecondary from "../../utils/LoaderSecondary";
import ConfirmDialog from "../../utils/ConfirmDialog";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import img from "../../empty-folder.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "80%",
}));

const styles = {
  btn: {
    color: "#064851",
    backgroundColor: "transparent",
    borderColor: "#064851",
    "&:hover": {
      color: "#eee",
      borderColor: "#064851",
      boxShadow: "none",
    },
    "&:active": {
      color: "#eee",
      boxShadow: "none",
      borderColor: "#064851",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
  btn2: {
    ml: 5,
    mt: 3,
    color: "#757575",
    backgroundColor: "transparent",
    borderColor: "#757575",
    "&:hover": {
      color: "#eee",
      borderColor: "#757575",
      boxShadow: "none",
    },
    "&:active": {
      color: "#eee",
      boxShadow: "none",
      borderColor: "#757575",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
};
const ShowLists = ({
  lists,
  handleSelectList,
  handleDeleteList,
  listData,
  setShowLists,
  loading,
  loadingDelete,
  loadingSelect,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  const handleOpenDialog = (id) => {
    setIdSeleccionado(id);
    setOpenDialog(true);
  };

  const deleteList = () => {
    handleDeleteList(idSeleccionado);
    setIdSeleccionado(null);
  };

  const formatDate = (date) => {
    let d = date.split("T")[0].split("-");
    return d[2] + "/" + d[1] + "/" + d[0];
  };

  return (
    <Grid container>
      <LoaderSecondary when={loading} />
      {!loading && (
        <React.Fragment>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackOutlinedIcon />}
              sx={styles.btn2}
              onClick={() => setShowLists(false)}
            >
              Volver
            </Button>
          </Grid>
          <Grid item xs={12}>
            {lists.length > 0 ? (
              <Box sx={{ width: "100%" }}>
                <Stack
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    marginTop: "2em",
                  }}
                  spacing={2}
                >
                  {lists.map((list) => (
                    <Item key={list.id} id={list.id}>
                      <Typography
                        sx={{ fontSize: 28 }}
                        color="text.primary"
                        gutterBottom
                      >
                        {list.nombre}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {formatDate(list.fecha)}
                      </Typography>
                      <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenDialog(list.id)}
                        >
                          {" "}
                          Eliminar
                          {loadingDelete && idSeleccionado === list.id ? (
                            <CircularProgress
                              sx={{
                                width: "1.6em !important",
                                height: "1.6em !important",
                              }}
                            />
                          ) : (
                              <DeleteIcon sx={{ ml: 1 }} />
                          )}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={styles.btn}
                          onClick={() => handleSelectList(list)}
                        >
                          {" "}
                          Usar
                          {(loadingSelect && listData.id) === list.id ? (
                              <CircularProgress
                                sx={{
                                  width: "1.6em !important",
                                  height: "1.6em !important",
                                }}
                              />
                          ) : (
                            <TaskAltIcon sx={{ ml: 1 }} />
                          )}
                        </Button>
                      </CardActions>
                    </Item>
                  ))}
                </Stack>
                <ConfirmDialog
                  title="¿Eliminar lista?"
                  open={openDialog}
                  setOpen={setOpenDialog}
                  onConfirm={deleteList}
                />
              </Box>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  position: "relative",
                  top: "50%",
                }}
              >
                <img
                  alt="Sin elementos"
                  src={img}
                  style={{ maxWidth: "8em" }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    textTransform: "none",
                    padding: "6px 12px",
                    lineHeight: 1.5,
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
                  }}
                >
                  Sin listas guardadas
                </Typography>
              </div>
            )}
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
};

export default ShowLists;

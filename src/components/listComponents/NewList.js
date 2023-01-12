import React, { Fragment } from "react";
import AddElement from "./AddElement";
import ElementList from "./ElementList";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

export default function NewList({
  list,
  setCurrentList,
  listData,
  idIemsDelete,
  setIdIemsDelete,
}) {
  const styles = {
    Paper: {
      padding: 8,
      margin: "auto",
      textAlign: "center",
      width: "90%",
    },
    Chip: {
      float: "right",
      mt: 2,
      mb: 2,
      mr: 2,
      backgroundColor: "#fee393",
      borderColor: "#fee393",
    },
    Avatar: {
      color: "#000",
      backgroundColor: "#FDC727",
    },
    Chip2: {
      float: "left",
      mt: 2,
      mb: 2,
      ml: 2,
      backgroundColor: "#FDC727",
      borderColor: "#fee393",
    },
  };

  const handleAddElement = (data) => {
    setCurrentList([...list, data]);
  };

  const handleToggle = (newItem) => {
    newItem.estado === 0 ? (newItem.estado = 1) : (newItem.estado = 0);
    let newItems = list.map((item) =>
      item.id === newItem.id ? newItem : item
    );
    setCurrentList(newItems);
  };

  const handleDelete = (id) => {
    if (listData.id != null) {
      setIdIemsDelete((idIemsDelete) => [...idIemsDelete, id]);
    }
    let newData = list.filter((el) => el.id !== id);
    setCurrentList(newData);
  };

  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {listData.id != null && (
            <Chip sx={styles.Chip2} label={listData.nombre} />
          )}
          {list.length > 0 && (
            <Chip
              sx={styles.Chip}
              avatar={<Avatar style={styles.Avatar}>{list.length}</Avatar>}
              label="Elementos en la lista"
            />
          )}
          {list.length === 0 && (
            <Chip sx={styles.Chip} label="Lista Vacia" variant="outlined" />
          )}
        </Grid>
        <Grid item xs={12}>
          <Paper style={styles.Paper}>
            <AddElement handleAddElement={handleAddElement} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ElementList
            items={list}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

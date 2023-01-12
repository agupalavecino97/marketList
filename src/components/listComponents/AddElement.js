import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const initialForm = {
  id: null,
  valor: "",
  estado: 0,
  id_lista: null,
};

const AddElement = ({ handleAddElement }) => {
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleOpenAlert = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAdd = (e) => {
    e.preventDefault(); //para que no se autoprocese el formulario

    if (form.valor === "") {
      handleOpenAlert();
      return;
    }

    form.id = Date.now();
    handleAddElement(form);

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  return (
    <form style={{ display: "flex", height: "3em" }}>
      <Input
        placeholder="Agregar un elemento"
        inputProps={{ "aria-label": "Description" }}
        value={form.valor}
        name="valor"
        onChange={handleChange}
        style={{ width: "90%", height: "4em" }}
      />
      <Button
        size="small"
        variant="contained"
        onClick={handleAdd}
        style={{ width: "10%", background: "#064851" }}
        startIcon={<AddIcon sx={{ ml: 1, fontSize: "5em" }} />}
      >
        {" "}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          ¡Datos incompletos!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AddElement;

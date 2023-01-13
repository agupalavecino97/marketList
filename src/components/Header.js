import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../utils/ConfirmDialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LoginIcon from "@mui/icons-material/Login";

export default function Header({ currentUser, logOut }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const styles = {
    btn: {
      position: "absolute",
      right: "10px",
      boxShadow: "none",
      textTransform: "none",
      fontSize: 16,
      padding: "6px 12px",
      border: "1px solid",
      lineHeight: 1.5,
      color: "#eee",
      backgroundColor: "#032b30",
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
    chip: {
      position: "absolute",
      right: "50px",
      boxShadow: "none",
      textTransform: "none",
      fontSize: 16,
      padding: "6px 12px",
      border: "1px solid",
      lineHeight: 1.5,
      color: "#eee",
      backgroundColor: "#032b30",
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
    icon: {
      color: "#eee",
      position: "absolute",
      right: "10px",
      fontSize: 16,
    },
  };

  const toLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#064851" }}>
      <Toolbar>
        <ListAltIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Listapp
        </Typography>
        {currentUser === "" ? (
          <Button
            onClick={toLogin}
            sx={styles.btn}
            variant="contained"
            endIcon={<LoginIcon />}
          >
            {" "}
            Login{" "}
          </Button>
        ) : (
          <React.Fragment>
            <Chip
              sx={styles.chip}
              label={currentUser}
              avatar={<AccountCircleIcon sx={{ color: "#eee !important" }} />}
            />
            <IconButton
              sx={styles.icon}
              aria-label="logout"
              component="label"
              onClick={() => setOpenDialog(true)}
            >
              <LogoutIcon />
            </IconButton>
          </React.Fragment>
        )}
        <ConfirmDialog
          title="¿Salir de la cuenta?"
          open={openDialog}
          setOpen={setOpenDialog}
          onConfirm={logOut}
        />
      </Toolbar>
    </AppBar>
  );
}

import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDialog = (props) => {
  const { title, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="error"
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="success"
        >
          Si
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

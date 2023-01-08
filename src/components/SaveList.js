import React from 'react';
// import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    btn: {
        mt: 3, mb: 2,
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


const SaveList = ({open, handleSaveList, handleClose, listData, setlistData}) => {

    const handleChange = (e) => { 
        setlistData({
            ...listData,
            [e.target.name]:e.target.value 
        });
      };
      
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Guardar Lista
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        autoComplete="nombre"
                        autoFocus
                        // value={form.name}
                        onChange={handleChange}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={styles.btn}
                        // disabled
                        onClick={handleSaveList}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
      </Modal>
    );
}

export default SaveList
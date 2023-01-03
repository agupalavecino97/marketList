import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Header () {
  const navigate = useNavigate();
  
  const styles = {
    btn: {
      position: 'absolute',
      right: '10px',
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      color: '#eee',
      backgroundColor: '#032b30',
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
  }

  const toLogin = () => {
    navigate('/login');
  }

  return ( 
      <AppBar position="static" sx={{background: '#064851'}}>
        <Toolbar>
          <LocalGroceryStoreIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Lista de Super
          </Typography>
          <Button onClick={toLogin} sx={styles.btn} variant="contained" endIcon={<LoginIcon/>}> Login </Button>
        </Toolbar>
      </AppBar>
    );
}
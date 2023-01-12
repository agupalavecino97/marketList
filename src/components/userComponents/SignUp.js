import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { APIs } from '../../helpers/apis';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const theme = createTheme();
const initialForm = {
  name: "",
  email: "",
  password: "",
}

export default function SignUp() {
    const navigate = useNavigate();
    const [form, setForm ] = useState(initialForm);
    const [open, setOpen] = useState(false);
    const [typeAlert, setTypeAlert] = useState("warning");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async () => {
      setLoading(true);
      if (!form.email || !form.password || !form.name) {
        handleOpenAlert('error', 'Datos incompletos');
        return;
      }
      try {
        const res = await axios.post(APIs.REGISTRO, form);
        if (res.data.error) {
          handleOpenAlert('error', res.data.error);
        } else {
          if (res.data.data) {
            handleOpenAlert('success', 'Registro exitoso');
            localStorage.setItem("token", res.data.data.accessToken);
            localStorage.setItem("user", res.data.data.user);
            setTimeout(() => {
              setLoading(false);
              navigate('/');
            }, 1000);
          } else {
            handleOpenAlert('error', 'Error en el servidor');
          }
        }
        // if (res.data.token) {
        //     axios.defaults.headers.common.Authorization = 'bearer ' + res.data.token;
        //     localStorage.setItem('token', res.data.token);
        //     this.setState({ redirectToDashboard: true });
        // } else {
        //     this.setState({ error: true });
        // }
      } catch (err) {
          console.error(err);
      }
    };

    const styles = {
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
      },
    }

  const toLogin = () => {
    navigate('/login');
  }

  const toHome = () => {
    navigate('/');
  }

  const handleChange = (e) => { 
    setForm({ 
        ...form,
        [e.target.name]:e.target.value 
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Link sx={{
            position: 'absolute',
            top: '5em'
          }}
          onClick={toHome} variant="body2">
            Volver al inicio
        </Link>
        <Box
          sx={{
            marginTop: '4em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1,  bgcolor: '#064851'}}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>  
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nombre y Apellido"
                    autoFocus
                    value={form.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type="button"
                fullWidth
                variant="contained"
                sx={styles.btn}
                onClick={handleSubmit}
                endIcon={<LockOpenIcon />}
                loading={loading}
              >
                <span>Registro</span>
              </LoadingButton>
            <Grid container justifyContent="center">
                <Link onClick={toLogin} variant="body2">
                  ¿Ya tienes una cuenta? Ingresar
                </Link>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={typeAlert} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
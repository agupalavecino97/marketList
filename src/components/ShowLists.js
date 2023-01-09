import React from 'react';
import { useState} from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import ConfirmDialog from './ConfirmDialog';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '80%'
}));

const styles = {
    btn: {
    //   boxShadow: 'none',
    //   textTransform: 'none',
    //   fontSize: 16,
    //   padding: '6px 12px',
    //   border: '1px solid',
    //   lineHeight: 1.5,
      color: '#064851',
      backgroundColor: 'transparent',
      borderColor: '#064851',
      '&:hover': {
        color: '#eee',
        backgroundColor: '#064851',
        borderColor: '#064851',
        boxShadow: 'none',
      },
      '&:active': {
        color: '#eee',
        boxShadow: 'none',
        backgroundColor: '#064851',
        borderColor: '#064851',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      }
  },
  }
const ShowLists = ({lists, handleSelectList, handleDeleteList}) => {  
    const [openDialog, setOpenDialog] = useState(false);
    const [idSeleccionado, setIdSeleccionado] = useState(null);

    const handleOpenDialog = (id) => {
        setIdSeleccionado(id);
        setOpenDialog(true);
    }

    const deleteList = () => {
        handleDeleteList(idSeleccionado);
        setIdSeleccionado(null);
    }
    return (
        <div>
        {   lists != null ? (
                <Box sx={{ width: '100%' }}>
                    <Stack sx={{ display: 'flex', alignContent: 'center', alignItems: 'center', marginTop: '2em'}} spacing={2}>
                        {
                        lists.map( (list) => (
                            <Item id={list.id}>
                                <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                                    {list.nombre}
                                </Typography>
                                <Typography sx={{ fontSize: 14}} color="text.secondary">
                                    {list.fecha}
                                </Typography>
                                <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Button variant="outlined" color="error" onClick={ () => handleOpenDialog(list.id) }> Eliminar</Button>
                                    <Button variant="outlined" sx={styles.btn} onClick={ () => handleSelectList(list.id)}> Usar</Button>
                                </CardActions>
                            </Item>
                            )
                        ) 
                        }
                    </Stack>
                    <ConfirmDialog 
                        title="¿Eliminar lista?"
                        open={openDialog}
                        setOpen={setOpenDialog}
                        onConfirm={deleteList}/>
                </Box>
                
            )
            : (
                <h2> no hay listas</h2>

            )
        }
        </div>
    );
}

export default ShowLists
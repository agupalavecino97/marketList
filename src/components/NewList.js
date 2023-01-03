import React, {useState, useEffect, Fragment} from 'react';
import AddElement from './AddElement';
import ElementList from './ElementList';

import { helpHttp } from '../helpers/helpHttp';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';

import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';


export default function NewList ({list, setCurrentList}) {
    
   
    // const [items, setItems] = useState([]);
    // let api = helpHttp();
    // let url = "http://localhost:5000/items";

    const styles = {
        Paper: {
          padding: 8,
          margin: "auto",
          textAlign: "center",
          width: "90%"
        },
        Chip: {
            float: 'right', 
            mt: 2, 
            mb: 2, 
            mr:2,
            backgroundColor: '#fee393',
            borderColor: '#fee393',
        },
        Avatar: {
            color: '#000',
            backgroundColor: '#FDC727',
        }
    };

    useEffect(() => {
        // if (list.length > 0) {
        //     setItems(list);
        //     // setError(null);
        // } else {
        //     setItems([]);
        //     // setError(res.err.statusText);
        // }
        // setLoading(false)
    }, [list]); 

    
    const handleAddElement = (data) => {
        // setItems([...items, data]);
        setCurrentList([...list, data]);
        // setCurrentList(data);
    }
    
    const handleToggle = (newItem) => {
        newItem.checked = !newItem.checked;
        // let newItems = items.map( item => item.id === newItem.id ? newItem : item);
        // setItems(newItems);
        let newItems = list.map( item => item.id === newItem.id ? newItem : item);
        setCurrentList(newItems);
        // setCurrentList(items);
    };

    const handleDelete = (id) => {
        // let newData = items.filter( el => el.id !== id);
        // setItems(newData);
        let newData = list.filter( el => el.id !== id);
        setCurrentList(newData);
    }

    return (
        <Fragment>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                        {list.length > 0 && <Chip sx={styles.Chip} avatar={<Avatar style={styles.Avatar} >{list.length}</Avatar>} label="Elementos en la lista" />}
                        {list.length === 0 && <Chip sx={styles.Chip} label="Lista Vacia" variant="outlined" />}
                </Grid>
                <Grid item xs={12}>
                    <Paper style={styles.Paper}>
                        <AddElement handleAddElement={handleAddElement}/>
                        {/* <TextField id="standard-basic" name="value" label="Agregar un elemento" variant="standard" value={form.value} onChange={handleChange}/> */}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <ElementList items={list} handleDelete={handleDelete} handleToggle={handleToggle}/>
            </Grid>
            </Grid>
        </Fragment>
    )
}
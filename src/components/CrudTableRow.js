import React from 'react';

const CrudTableRow = ({elem, setDataToEdit, deleteData}) => {
    let {id, name, constellation} = elem;
    return (
        <tr>
            <td> {name} </td>
            <td> {constellation} </td>
            <td> 
                <button onClick={() => setDataToEdit(elem)}> Editar</button>
                <button onClick={() => deleteData(id)}> Eliminar</button>
            </td>
        </tr>
    );
}

export default CrudTableRow
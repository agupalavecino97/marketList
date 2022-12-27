import React, {useState, useEffect} from 'react';
import { helpHttp } from '../helpers/helpHttp';
import CrudForm from './CrudFrom';
import CrudTable from './CrudTable';


const CrudApp = () => {
    const [db, setDb] = useState([]);
    const [dataToEdit, setDataToEdit] = useState(null);

    let api = helpHttp();
    let url = "http://localhost:5000/santos";

    useEffect(() => {
        api.get(url).then( res => {
            if (!res.err) {
                setDb(res)
            } else {
                setDb([])
            }
        });
    }, []); // cuando tenemos este segundo parametro vacio el useEfffect se ejecuta solo una vez 


    const createData = (data) => {
        data.id = Date.now();
        setDb([...db , data]);
    }; 
    
    const updateData = (data) => {
        let newData = db.map(el => el.id === data.id ? data : el);
        setDb(newData);
    };

    const deleteData = (id) => {
        let isDelete = window.confirm('¿Estas seguro de eliminar el registro con el id: '+id+'?');
        if (isDelete) {
            let newData = db.filter( el => el.id !== id);
            setDb(newData);
        } else {
            return;
        }
    };

    return(
        <div>
            <h2> CRUD APP</h2>
            <article className='grid-1-2'>
                <CrudForm 
                    createData={createData} 
                    updateData={updateData}
                    dataToEdit={dataToEdit} 
                    setDataToEdit={setDataToEdit}
                />
                <CrudTable 
                    data={db} 
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />
            </article> 
        </div>
    );
}

export default CrudApp
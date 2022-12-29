import React, {useState, useEffect} from 'react';
import { helpHttp } from '../helpers/helpHttp';
import CrudForm from './CrudFrom';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Message from './Message';

const CrudApp = () => {
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:5000/santos";

    useEffect(() => {
        setLoading(true)
        api.get(url).then( res => {
            if (!res.err) {
                setDb(res);
                setError(null);
            } else {
                setDb(null);
                setError(res.err.statusText);
            }
            setLoading(false)
        });
    }, [url     ]); // cuando tenemos este segundo parametro vacio el useEfffect se ejecuta solo una vez 


    const createData = (data) => {
        // data.id = Date.now();
        let options = {body: data, headers: {"content-type":"application/json"}}
        api.post(url, options).then((res) => {
            if (!res.err) {
                setDb([...db, res]);
                setError(null);
            } else {
                setDb(null);
                setError(res.err.statusText);
            }
        })
        setDb([...db , data]);
    }; 
    
    const updateData = (data) => {
        let options = {body: data, headers: {"content-type":"application/json"}}
        let endpoint = url + '/' + data.id
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                let newData = db.map(el => el.id === data.id ? data : el);
                setDb(newData);
                setError(null);
            } else {
                setDb(null);
                setError(res.err.statusText);
            }
        })
    };

    const deleteData = (id) => {
        let isDelete = window.confirm('¿Estas seguro de eliminar el registro con el id: '+id+'?');
        if (isDelete) {
            let options = { headers: {"content-type":"application/json"}}
            let endpoint = url + '/' + id
            api.del(endpoint, options).then((res) => {
                if (!res.err) {
                    let newData = db.filter( el => el.id !== id);
                    setDb(newData);
                    setError(null);
                } else {
                    setDb(null);
                    setError(res.err.statusText);
                }
            })
           
        } else {
            return;
        }
    };

    return(
        <div>
            <h2> CRUD APP</h2>
            <article className='grid-1-2'>
                { !(loading && !error) && 
                    <CrudForm 
                    createData={createData} 
                    updateData={updateData}
                    dataToEdit={dataToEdit} 
                    setDataToEdit={setDataToEdit}
                    />
                }
                { loading && <Loader/> }
                { error && <Message msg={'Error: '+ {error}} bgColor="#dc3545"/> }
                { (db && !loading) && 
                    <CrudTable 
                        data={db} 
                        setDataToEdit={setDataToEdit}
                        deleteData={deleteData}
                    />
                }
               
            </article> 
        </div>
    );
}

export default CrudApp
import SongSelector from './SongSelector'
import DataTable from "./DataTable";
import React, { useState, useEffect } from 'react';
import {createFakeData, flattenArrayOfJson, songList} from "../data/data";



function HomeComponent({numData, setCurrUserId}) {

    const data = createFakeData(5);
    const [subject_data, set_subject_data] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:5000/api/trials")
        .then(res => res.json())
        .then(subject_data =>set_subject_data(subject_data))
    }, [])
    const [json_data, set_json_data] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:5000/api/main")
        .then(res => res.json())
        .then(json_data =>set_json_data(json_data))
    }, [])

    console.log(json_data);


    const [rows, setRows] = useState(flattenArrayOfJson(data))
    

    let temp_var = flattenArrayOfJson(subject_data);

    //const [rows, setRows] = useState(temp_var);
    console.log(temp_var);
    /*console.log(subject_data)
    console.log(rows1)   
    console.log(rows) */  
    return (
        <div className="App">
            <div> {json_data.length == 0 ? "" : json_data[2].title}</div> 
            <SongSelector songList={json_data} setRows={setRows} rows={flattenArrayOfJson(subject_data)} />
            <DataTable rows={rows} setCurrUserId={setCurrUserId} />
        </div>

    );
}

export default HomeComponent;

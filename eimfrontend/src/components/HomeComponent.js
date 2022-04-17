import SongSelector from './SongSelector'
import DataTable from "./DataTable";
import React, { useState, useEffect } from 'react';
import {flattenArrayOfJson, songList} from "../data/data";

function HomeComponent({numData, setCurrUserId}) {

    const [subject_data, set_subject_data] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:5000/api/trials")
        .then(res => res.json())
        .then(subject_data =>{set_subject_data(subject_data); return subject_data;})
        .then(initialData => setRows(flattenArrayOfJson(initialData)))
    }, [])
    const [json_data, set_json_data] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:5000/api/main")
        .then(res => res.json())
        .then(json_data =>set_json_data(json_data))
    }, []) 

   return (
        <div className="App">
            <SongSelector songList={json_data} setRows={setRows} rows={flattenArrayOfJson(subject_data)} />
            <DataTable rows={rows} setCurrUserId={setCurrUserId} tableHeight={800} />
        </div>

    );
}

export default HomeComponent;
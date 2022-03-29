import SongSelector from './SongSelector'
import DataTable from "./DataTable";
import React, { useState, useEffect } from 'react';
import {createFakeData, flattenArrayOfJson, songList} from "../data/data";
import { setColumnsState } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils';



function HomeComponent({numData, setCurrUserId}) {

    const data = createFakeData(8);
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

    // console.log(json_data);


    // const [rows, setRows] = useState(flattenArrayOfJson(data))
    console.log(flattenArrayOfJson(data))

    console.log(rows);
    return (
        <div className="App">
            <div> {json_data.length == 0 ? "" : json_data[2].title}</div> 
            <SongSelector songList={json_data} setRows={setRows} rows={flattenArrayOfJson(subject_data)} />
            <DataTable rows={rows} setCurrUserId={setCurrUserId} />
        </div>

    );
}

export default HomeComponent;
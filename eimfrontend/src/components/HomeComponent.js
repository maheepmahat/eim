import SongSelector from './SongSelector'
import DataTable from "./DataTable";
import React, { useState, useEffect } from 'react';
import {createFakeData, flattenArrayOfJson, songList} from "../data/data";



function HomeComponent({numData, setCurrUserId}) {

    const data = createFakeData(numData);
    const [json_data, set_json_data] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:5000/api/main")
        .then(res => res.json())
        .then(json_data =>set_json_data(json_data))
    }, [])

    let songs = [];
    for (let i = 0; i < 4; i++) {
        if (json_data.length!= 0) { 
            songs[i] = json_data[i].title;
        }
    }
    console.log(json_data);

    const [rows, setRows] = useState(flattenArrayOfJson(data))
    return (
        <div className="App">
            <div> {json_data.length == 0 ? "" : json_data[2].title}</div>
            <SongSelector songList={json_data} setRows={setRows} rows={flattenArrayOfJson(data) } />
            <DataTable rows={rows} setCurrUserId={setCurrUserId} />
        </div>

    );
}

export default HomeComponent;

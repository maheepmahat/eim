import SongSelector from './SongSelector'
import DataTable from "./DataTable";
import React, { useState } from 'react';
import {createFakeData, flattenArrayOfJson, songList} from "../data/data";



function HomeComponent({numData, setCurrUserId}) {

    const data = createFakeData(numData);
    const [rows, setRows] = useState(flattenArrayOfJson(data))
    return (
        <div className="Home">
            <SongSelector songList={songList} setRows={setRows} rows={flattenArrayOfJson(data) } />
            <DataTable rows={rows} setCurrUserId={setCurrUserId} />
        </div>
    );
}

export default HomeComponent;

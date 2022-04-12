import React, { useState, useEffect } from 'react';
import {createFakeData, flattenArrayOfJson, songList} from "../data/data";
import DataTable from "./DataTable";


function SingleUserData(props){

    const [subject_data, set_subject_data] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:5000/api/trials")
        .then(res => res.json())
        .then(subject_data =>{set_subject_data(subject_data); return subject_data;})
        .then(initialData => setRows(flattenArrayOfJson(initialData)))
    }, [])

    let found = subject_data.filter(function(item) { return item._id === props.id; });
    //console.log('found', found[0]);

    const [csv_file, set_csv_file] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:5000/api/trials/media")
        .then(csv_file =>{set_csv_file(csv_file)}); 
    },[])

    console.log("csv_file var" + csv_file);
    console.log("type of " + typeof csv_file);

    return (
        <div className="App">
            <h1> User with id of {props.id} </h1> 
            <DataTable rows={flattenArrayOfJson(found)} setCurrUserId={props.setCurrUserId} />
        </div>
    )
}

export default SingleUserData;

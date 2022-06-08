import SongSelector from './SongSelector'
import ExperimentSelector from './ExperimentSelector'
import DataTable from "./DataTable";
import React, { useState, useEffect } from 'react';
import {flattenArrayOfJson, songList} from "../data/data";
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

let default_experiment = ""
function HomeComponent({numData, setCurrUserId, set_experiment_num}) {

    //getting the data to fill the home table
    const [subject_data, set_subject_data] = useState([]);
    const [rows, setRows] = useState([]); 
    const [experiment_number, set_experiment_number] = useState([]);

    if(experiment_number != undefined){
        default_experiment = experiment_number._id
        console.log("default exp , experiment number = " + default_experiment+" "+experiment_number._id)
        set_experiment_num(experiment_number._id)
    }
    useEffect(() =>{
        document.title = "Welcome to EiM!"

        //fetch("http://gan.cs.vt.edu:5000/api/trials")
        fetch("http://localhost:5000/api/trials/"+experiment_number._id)
        .then(res => res.json())
        .then(subject_data =>{set_subject_data(subject_data); return subject_data;})
        .then(initialData => setRows(flattenArrayOfJson(initialData)))
    }, [experiment_number])
    //getting the song list
    const [json_data, set_json_data] = useState([]);
    useEffect(() =>{
        //fetch("http://gan.cs.vt.edu:5000/api/main")
        fetch("http://localhost:5000/api/main")
        .then(res => res.json())
        .then(json_data =>set_json_data(json_data))
    }, [])  

   return (
        <div className="App">
            <Box sx={{margin: "2%", padding:10, border: '1px solid lightgrey', borderRadius: 2}}>
                <Typography color="primary.dark" variant="h3">Welcome to EiM!</Typography>
                <Typography paragraph variant="body">
                        Emotion in Motion is the largest database with psychophysiological data in response to music to date! 
                        It was collected over the course of 5 years and has amassed data from various locations like New York, Ireland, Dublin, Norway, Singapore, Philippines, and Taiwan.
                        We've created this website so you may explore this data on your own and discover new insights!
                </Typography>
            </Box>
            <ExperimentSelector set_experiment_number={set_experiment_number}/>
            <SongSelector songList={json_data} setRows={setRows} rows={flattenArrayOfJson(subject_data)} />
            <DataTable rows={rows} setCurrUserId={setCurrUserId} experiment_number={experiment_number} tableHeight={800}/>
        </div>

    );
}

export default HomeComponent;
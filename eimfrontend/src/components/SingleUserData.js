import React, { useState, useEffect} from 'react';
import { createFakeData, flattenArrayOfJson, songList } from "../data/data";
import DataTable from "./DataTable";
import { usePapaParse } from 'react-papaparse';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts'
import "./table.css"
import { useParams } from 'react-router-dom'
import Ratings from './Ratings';
import { Chip, Divider, Typography } from '@mui/material';
import GraphAudio from './GraphAudio';
import SmallDataTable from './SmallDataTable';
//placeholders 
var file_id = ["", "", ""];
var media_label = ["", "", ""];
var derived_eda_file = ["", "", ""];
var derived_pox_file = ["", "", ""];
var song1, song2, song3;
var songMetadata = "";

function SingleUserData(props) {
    const {id} = useParams();
    const { readRemoteFile } = usePapaParse();    
    const [subject_data, set_subject_data] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/api/trials")
            .then(res => res.json())
            .then(subject_data => { set_subject_data(subject_data); return subject_data; })
            .then(initialData => setRows(flattenArrayOfJson(initialData)))
    }, [])

    const found = subject_data.filter(function (item) { return item._id === props.id; });
    
    const [signal_id, setSignal_Id] = useState();
    useEffect(() => {
        fetch("http://localhost:5000/api/signalData/"+props.id)
        .then(res => res.json())
        .then(signal_id =>setSignal_Id(signal_id))
    },[])
      
    /**
     *  Format for each array object
     * {
     * eda_filtered: 135
     * eda_raw: 134 -- use this for y2 values
     * eda_status: 1
     * hr: 88.235 -- use this y1 values
     * hr_status: 0
     * pox_raw: 0
     * timestamps: 47982 -- x axis
     * }
     */
    if(signal_id !== undefined) {
        file_id[0] = signal_id[0]['_id'];
        file_id[1] = signal_id[1]['_id'];
        file_id[2] = signal_id[2]['_id'];
        media_label[0] = signal_id[0]['label'];
        media_label[1] = signal_id[1]['label'];
        media_label[2] = signal_id[2]['label'];
        derived_eda_file[0] = signal_id[0]['derived_eda_data_file'];
        derived_eda_file[1] = signal_id[1]['derived_eda_data_file'];
        derived_eda_file[2] = signal_id[2]['derived_eda_data_file'];
        derived_pox_file[0] = signal_id[2]['derived_pox_data_file'];
        derived_pox_file[1] = signal_id[2]['derived_pox_data_file'];
        derived_pox_file[2] = signal_id[2]['derived_pox_data_file'];
        //songMetadata = songInfo[0]['title'];
    }
    /* const [songInfo, set_songInfo] = useState();
    useEffect(() => {
        fetch("http://localhost:5000/api/songname/"+songMetadata)
        .then(res => res.json())
        .then(songInfo =>set_songInfo(songInfo))
    },[songMetadata]) */

    song1 = "http://localhost:5000/api/song/" + media_label[0];
    song2 = "http://localhost:5000/api/song/" + media_label[1];
    song3 = "http://localhost:5000/api/song/" + media_label[2];
    
    var csv_file_small1=[];
    var csv_file_small2=[];
    var csv_file_small3=[];
    var pox_csv_file_small1=[];
    var pox_csv_file_small2=[];
    var pox_csv_file_small3=[];
    const [csv_file1, set_csv_file1] = useState([]);
    useEffect(() => {
        if(file_id[0] !== "") 
        readRemoteFile("http://localhost:5000/api/signals/"+derived_eda_file[0], {
            worker: true,
            complete: (results) => {
                set_csv_file1(results.data);
            },
            dynamicTyping: true,
            header: true 
        });
    },[signal_id])
    //dividing the file to 500 parts and choosing 1 datapoint from each part.
    if(signal_id !== undefined && csv_file1.length > 0) {
        
        var subset_size = Math.floor(csv_file1.length / 800);
        for(var i=0; i<800; i++)
            {
                csv_file_small1[i] = csv_file1[i*subset_size];
            }
    }
    const [csv_file2, set_csv_file2] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_eda_file[1], {
            worker: true,
            complete: (results) => {
                set_csv_file2(results.data);
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    if(signal_id !== undefined && csv_file2.length > 0) {
        
        var subset_size = Math.floor(csv_file2.length / 800);
        for(var i=0; i<800; i++)
            {
                csv_file_small2[i] = csv_file2[i*subset_size];
            }
    }
    const [csv_file3, set_csv_file3] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_eda_file[2], {
            worker: true,
            complete: (results) => {
                set_csv_file3(results.data);
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    if(signal_id !== undefined && csv_file3.length > 0) {
        
        var subset_size = Math.floor(csv_file3.length / 800);
        for(var i=0; i<800; i++)
            {
                csv_file_small3[i] = csv_file3[i*subset_size];
            }
    }
    const [pox_csv_file1, set_pox_csv_file1] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_pox_file[0], {
            worker: true,
            complete: (results) => {
                set_pox_csv_file1(results.data);
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    if(signal_id !== undefined && pox_csv_file1.length > 0) {
        
        var subset_size = Math.floor(pox_csv_file1.length / 800);
        for(var i=0; i<800; i++)
            {
                pox_csv_file_small1[i] = pox_csv_file1[i*subset_size];
            }
    }
    const [pox_csv_file2, set_pox_csv_file2] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_pox_file[1], {
            worker: true,
            complete: (results) => {
                set_pox_csv_file2(results.data);
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    if(signal_id !== undefined && pox_csv_file2.length > 0) {
        
        var subset_size = Math.floor(pox_csv_file2.length / 800);
        for(var i=0; i<800; i++)
            {
                pox_csv_file_small2[i] = pox_csv_file2[i*subset_size];
            }
    }
    const [pox_csv_file3, set_pox_csv_file3] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_pox_file[2], {
            worker: true,
            complete: (results) => {
                set_pox_csv_file3(results.data);
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    if(signal_id !== undefined && pox_csv_file3.length > 0) {
        
        var subset_size = Math.floor(pox_csv_file3.length / 800);
        for(var i=0; i<800; i++)
            {
                pox_csv_file_small3[i] = pox_csv_file3[i*subset_size];
            }
    }

    return (
        <div className="App">
           
            <Typography variant="h4" style={{margin: '20px'}}>User with id of {id}</Typography>

            <DataTable rows={flattenArrayOfJson(found)} setCurrUserId={props.setCurrUserId} tableHeight={160} />

            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', padding: '20px 0px'}}>
            <Ratings found={found}/>
            </div>
            <Typography variant="h4" style={{margin: '10px'}}>Signal Information</Typography>

            <GraphAudio title="First Song" eda_file={csv_file1} pox_file={pox_csv_file_small1} media_label={media_label} song={song1}/>
            <GraphAudio title="Second Song" eda_file={csv_file2} pox_file={pox_csv_file_small2} media_label={media_label} song={song2}/>
            <GraphAudio title="Third Song" eda_file={csv_file3} pox_file={pox_csv_file_small3} media_label={media_label} song={song3}/>
    
        </div>

    );
}

export default SingleUserData;

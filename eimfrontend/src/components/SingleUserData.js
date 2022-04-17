import React, { useState, useEffect } from 'react';
import { createFakeData, flattenArrayOfJson, songList } from "../data/data";
import DataTable from "./DataTable";
import { usePapaParse } from 'react-papaparse';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts'
import axios from 'axios';

//placeholders 
var file_id = ["", "", ""];
var media_label = ["", "", ""];
var song1, song2, song3;


function SingleUserData(props) {

    const { readRemoteFile } = usePapaParse();

    
    const [subject_data, set_subject_data] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/api/trials")
            .then(res => res.json())
            .then(subject_data => { set_subject_data(subject_data); return subject_data; })
            .then(initialData => setRows(flattenArrayOfJson(initialData)))
    }, [])

    let found = subject_data.filter(function (item) { return item._id === props.id; });
    
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
    }
   
    song1 = "http://localhost:5000/api/song/" + media_label[0];
        song2 = "http://localhost:5000/api/song/" + media_label[1];
        song3 = "http://localhost:5000/api/song/" + media_label[2];
    
    console.log("media labels "+media_label[0]+" "+media_label[1]+" "+media_label[2])
 
    const [csv_file1, set_csv_file1] = useState([]);
    useEffect(() => {
        if(file_id[0] !== "") 
        readRemoteFile("http://localhost:5000/api/signals/"+file_id[0], {
            worker: true,
            complete: (results) => {
                set_csv_file1(results.data.slice(0, 100));
            },
            dynamicTyping: true,
            header: true 
        });
    },[signal_id])
    const [csv_file2, set_csv_file2] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+file_id[1], {
            worker: true,
            complete: (results) => {
                set_csv_file2(results.data.slice(0, 100));
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    const [csv_file3, set_csv_file3] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+file_id[2], {
            worker: true,
            complete: (results) => {
                set_csv_file3(results.data.slice(0, 100));
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])

    /* const [audio_file1, set_audio_file1] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/song/"+media_label[0], {
            worker: true,
            complete: (results) => {
                set_audio_file1(results.data);     
            },
        });
    })
     */

    return (
        <div className="App">
            { <h1> User with id of {props.id} </h1>  }

            <DataTable rows={flattenArrayOfJson(found)} setCurrUserId={props.setCurrUserId} tableHeight={200} />
            <br />
            <br />
            <br />
            <h1>User's EDA and HR data against Time is shown below</h1> <br />
            <LineChart width={1400} height={300} data={csv_file1}>
                <XAxis dataKey="timestamps" /> 
                abc
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="eda_raw" stroke="#8884d8" />
                <Line type="monotone" dataKey="hr" stroke="#82ca9d" />
            </LineChart>
            <br />
            <div>
            {media_label[0] !== "" &&
                <audio controls>
                <source src= {song1} type="audio/wav" />
                </audio>
            }
            </div>
            <br />
            <LineChart width={1400} height={300} data={csv_file2}>
                <XAxis dataKey="timestamps" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="eda_raw" stroke="#8884d8" />
                <Line type="monotone" dataKey="hr" stroke="#82ca9d" />
            </LineChart>
            <br />
            <div>
            {media_label[1] !== "" &&
                <audio controls>
                <source src= {song2} type="audio/wav" />
                </audio>
            }
            </div>
            <br />
            <LineChart width={1400} height={300} data={csv_file3}>
                <XAxis dataKey="timestamps" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="eda_raw" stroke="#8884d8" />
                <Line type="monotone" dataKey="hr" stroke="#82ca9d" />
            </LineChart>
            <br /><br />
            <div>
            {media_label[2] !== "" &&
                <audio controls>
                <source src= {song3} type="audio/wav" />
                </audio>
            }
            </div>        
        </div>

    );
}

export default SingleUserData;

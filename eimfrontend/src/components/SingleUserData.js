import React, { useState, useEffect } from 'react';
import { createFakeData, flattenArrayOfJson, songList } from "../data/data";
import DataTable from "./DataTable";
import { usePapaParse } from 'react-papaparse';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'

var file_id = ["5410edbd08ad6ee3090e20c6", "5410edbd08ad6ee3090e20c6", "5410edbd08ad6ee3090e20c6"];
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
    }, [])
    if(signal_id !== undefined) {
    console.log("signal id is = " + signal_id[0]['_id']);
    file_id[0] = signal_id[0]['_id'];
    file_id[1] = signal_id[1]['_id'];
    file_id[2] = signal_id[2]['_id'];
    }
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
    //console.log("file_id is " + file_id);
    const [csv_file1, set_csv_file1] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+file_id[0], {
            worker: true,
            complete: (results) => {
                console.log(Object.keys(results.data))
                set_csv_file1(results.data.slice(0, 200));
            },
            dynamicTyping: true,
            header: true
        });
    }, [])
    const [csv_file2, set_csv_file2] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+file_id[1], {
            worker: true,
            complete: (results) => {
                console.log(Object.keys(results.data))
                set_csv_file2(results.data.slice(0, 200));
            },
            dynamicTyping: true,
            header: true
        });
    }, [])
    const [csv_file3, set_csv_file3] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+file_id[2], {
            worker: true,
            complete: (results) => {
                console.log(Object.keys(results.data))
                set_csv_file3(results.data.slice(0, 200));
            },
            dynamicTyping: true,
            header: true
        });
    }, [])

    const [audio_file, set_audio_file] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/song", {
            worker: true,
            complete: (results) => {
                console.log(Object.keys(results.data))
                set_audio_file(results.data);     
            },
        });
    }, [])
   

    return (
        <div className="App">
            { <h1> User with id of {props.id} </h1>  }

            <DataTable rows={flattenArrayOfJson(found)} setCurrUserId={props.setCurrUserId} tableHeight={200} />
            <br />
            <br />
            <br />
            <h1>User's EDA and HR data against Time is shown below</h1> <br />
            <LineChart width={1200} height={300} data={csv_file1}>
                <XAxis dataKey="timestamps" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="eda_raw" stroke="#8884d8" />
                <Line type="monotone" dataKey="hr" stroke="#82ca9d" />
            </LineChart>
            <br /><br />
            <LineChart width={1200} height={300} data={csv_file2}>
                <XAxis dataKey="timestamps" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="eda_raw" stroke="#8884d8" />
                <Line type="monotone" dataKey="hr" stroke="#82ca9d" />
            </LineChart>
            <br /><br />
            <LineChart width={1200} height={300} data={csv_file3}>
                <XAxis dataKey="timestamps" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="eda_raw" stroke="#8884d8" />
                <Line type="monotone" dataKey="hr" stroke="#82ca9d" />
            </LineChart>
            <br /><br />
{/*             <audio ref= {songRef} src="./H001.wav" controls autoPlay/>
 */}            
            <audio controls>
            <source src="http://localhost:5000/api/song" type="audio/wav" />
            </audio>
            

        </div>
    )
}

export default SingleUserData;

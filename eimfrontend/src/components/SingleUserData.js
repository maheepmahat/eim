import React, { useState, useEffect } from 'react';
import { createFakeData, flattenArrayOfJson, songList } from "../data/data";
import DataTable from "./DataTable";
import { usePapaParse } from 'react-papaparse';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts'
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
    //console.log('found', found[0]);

    // const [csv_file, set_csv_file] = useState([]);
    // useEffect(() =>{
    //     fetch("http://localhost:5000/api/trials/media")
    //     .then(csv_file =>{set_csv_file(csv_file)}); 
    // },[])

    // console.log("csv_file var" + csv_file);
    // console.log("type of " + typeof csv_file);


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
    const [csv_file, set_csv_file] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+props.id, {
            method: 'GET',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Origin": "*"
            },
            body: JSON.stringify({
                Id: props.id,
            }),
            // step: (results, parser) => {
            // if(!results.data)
            //    results.data = {timestamps: results.data.timestamps, eda: results.data.eda_filtered,  hr: results.data.hr}
            // },
            worker: true,
            complete: (results) => {
                // console.log(Object.keys(results.data))
                // set_csv_file(results.data);     
                set_csv_file(results.data.slice(0, 200));
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
                // console.log(Object.keys(results.data))
                set_audio_file(results.data);     
            },
          /*   dynamicTyping: true,
            header: true */
        });
    }, [])
    // console.log(csv_file)

    var audioElement = new Audio(audio_file);
    const songRef = React.useRef();
    const controlId = "use-uuid-if-multiple-on-page";
    useEffect(() => {
        const audioControl = document.querySelector(`#${controlId}`);
        if(audioControl) {
            //Register the changed source
            audioControl.load();
        }
    })

    return (
        <div className="App">
            { <h1> User with id of {props.id} </h1>  }

            <DataTable rows={flattenArrayOfJson(found)} setCurrUserId={props.setCurrUserId} tableHeight={200} />
            <br />
            <br />
            <br />
            <h5>User's EDA and HR data against Time is shown below</h5> <br />
            
            <LineChart width={500} height={300} data={csv_file}>
                <XAxis dataKey="timestamps" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Line type="monotone" dataKey="eda_filtered" stroke="#8884d8" />
            </LineChart>
            <LineChart width={500} height={300} data={csv_file}>
                <XAxis dataKey="timestamps" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
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

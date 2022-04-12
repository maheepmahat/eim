import React, { useState, useEffect } from 'react';
import { createFakeData, flattenArrayOfJson, songList } from "../data/data";
import DataTable from "./DataTable";
import { usePapaParse } from 'react-papaparse';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
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
        readRemoteFile("http://localhost:5000/api/signals", {
            worker: true,
            complete: (results) => {
                // reformatted = []
                // results.data.forEach((d) => {
                //     let temp = {
                //         name: d.
                //     }
                // })
                console.log(Object.keys(results.data))
                // set_csv_file(results.data);     
                set_csv_file(results.data.slice(0, 200));
            },
            dynamicTyping: true,
            header: true
        });
    }, [])

    // console.log(csv_file)


    return (
        <div className="App">
            {/* <h1> User with id of {props.id} </h1>  */}
            <LineChart width={500} height={300} data={csv_file}>
                <XAxis dataKey="timestamps" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="eda_raw" stroke="#8884d8" />
                <Line type="monotone" dataKey="hr" stroke="#82ca9d" />
            </LineChart>
            <DataTable rows={flattenArrayOfJson(found)} setCurrUserId={props.setCurrUserId} tableHeight={200} />
        </div>
    )
}

export default SingleUserData;

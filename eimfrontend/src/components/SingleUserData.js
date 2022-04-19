import React, { useState, useEffect} from 'react';
import { createFakeData, flattenArrayOfJson, songList } from "../data/data";
import DataTable from "./DataTable";
import { usePapaParse } from 'react-papaparse';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts'
import "./table.css"
import { useParams } from 'react-router-dom'
import Ratings from './Ratings';
import { Chip, Divider, Typography } from '@mui/material';
//placeholders 
var file_id = ["", "", ""];
var media_label = ["", "", ""];
var derived_eda_file = ["", "", ""];
var derived_pox_file = ["", "", ""];
var song1, song2, song3;


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
        //console.log("derived files " + derived_eda_file[0]+" "+derived_eda_file[1]+" "+derived_eda_file[2]);
    }

    song1 = "http://localhost:5000/api/song/" + media_label[0];
    song2 = "http://localhost:5000/api/song/" + media_label[1];
    song3 = "http://localhost:5000/api/song/" + media_label[2];
    
 
    const [csv_file1, set_csv_file1] = useState([]);
    useEffect(() => {
        if(file_id[0] !== "") 
        readRemoteFile("http://localhost:5000/api/signals/"+derived_eda_file[0], {
            worker: true,
            complete: (results) => {
                set_csv_file1(results.data.slice(0, 800));
            },
            dynamicTyping: true,
            header: true 
        });
    },[signal_id])
    const [csv_file2, set_csv_file2] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_eda_file[1], {
            worker: true,
            complete: (results) => {
                set_csv_file2(results.data.slice(0, 800));
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    const [csv_file3, set_csv_file3] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_eda_file[2], {
            worker: true,
            complete: (results) => {
                set_csv_file3(results.data.slice(0, 800));
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    const [pox_csv_file1, set_pox_csv_file1] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_pox_file[0], {
            worker: true,
            complete: (results) => {
                set_pox_csv_file1(results.data.slice(0, 800));
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    const [pox_csv_file2, set_pox_csv_file2] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_pox_file[1], {
            worker: true,
            complete: (results) => {
                set_pox_csv_file2(results.data.slice(0, 800));
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])
    const [pox_csv_file3, set_pox_csv_file3] = useState([]);
    useEffect(() => {
        readRemoteFile("http://localhost:5000/api/signals/"+derived_pox_file[2], {
            worker: true,
            complete: (results) => {
                set_pox_csv_file3(results.data.slice(0, 800));
            },
            dynamicTyping: true,
            header: true
        });
    },[signal_id])

    return (
        <div className="App">
           
            <Typography variant="h4" style={{margin: '20px'}}>User with id of {id}</Typography>

            <DataTable rows={flattenArrayOfJson(found)} setCurrUserId={props.setCurrUserId} currId={id} tableHeight={200} />
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', padding: '20px 0px'}}>
            <Ratings found={found}/>
            </div>
            {/* <div style={{paddingTop: "50px"}}>
            {found.length > 0 &&
            <table className="fl-table" >
                <thead>
                    <tr>
                    <th>Experiments</th>
                    <th>Activity</th>
                    <th>Engagement</th>
                    <th>familiarity</th>
                    <th>chills</th>
                    <th>positivity</th>
                    <th>power</th>
                    <th>like & dislike</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <td><p>Experiment 1</p></td>
                        <td>{found[0]['answers']['ratings']['activity'][0]}</td>
                        <td>{found[0]['answers']['ratings']['engagement'][0]}</td>
                        <td>{found[0]['answers']['ratings']['familiarity'][0]}</td>
                        <td>{found[0]['answers']['ratings']['chills'][0]}</td>
                        <td>{found[0]['answers']['ratings']['positivity'][0]}</td>
                        <td>{found[0]['answers']['ratings']['power'][0]}</td>
                        <td>{found[0]['answers']['ratings']['like_dislike'][0]}</td>
                    </tr>
                    <tr>
                        <td><p>Experiment 2</p></td>
                        <td>{found[0]['answers']['ratings']['activity'][1]}</td>
                        <td>{found[0]['answers']['ratings']['engagement'][1]}</td>
                        <td>{found[0]['answers']['ratings']['familiarity'][1]}</td>
                        <td>{found[0]['answers']['ratings']['chills'][1]}</td>
                        <td>{found[0]['answers']['ratings']['positivity'][1]}</td>
                        <td>{found[0]['answers']['ratings']['power'][1]}</td>
                        <td>{found[0]['answers']['ratings']['like_dislike'][1]}</td>
                    </tr>
                    <tr>
                        <td><p>Experiment 3</p></td>
                        <td>{found[0]['answers']['ratings']['activity'][2]}</td>
                        <td>{found[0]['answers']['ratings']['engagement'][2]}</td>
                        <td>{found[0]['answers']['ratings']['familiarity'][2]}</td>
                        <td>{found[0]['answers']['ratings']['chills'][2]}</td>
                        <td>{found[0]['answers']['ratings']['positivity'][2]}</td>
                        <td>{found[0]['answers']['ratings']['power'][2]}</td>
                        <td>{found[0]['answers']['ratings']['like_dislike'][2]}</td>
                    </tr>
                                        
                </tbody>
            </table>
            }
            </div> */}
            <br />
           <Typography variant="h4" style={{margin: '20px'}}>Signal Information</Typography>
           <Divider variant="middle">
           <Chip label="First Song" />
            </Divider>
        
            <LineChart width={1400} height={300} data={csv_file1}>
                <XAxis dataKey="adjusted_time" /> 
                abc
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Legend verticalAlign="top" height={36}/>
                <Tooltip/>
                <Line name="eda (microsiemens)" type="monotone" dataKey="eda_cleaned" stroke="#8884d8" />
            </LineChart> <br />
            <LineChart width={1400} height={300} data={pox_csv_file1}>
                <XAxis dataKey="adjusted_time" /> 
                abc
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Legend verticalAlign="top" height={36}/>
                <Tooltip/>
                <Line name="pox (microsiemens)" type="monotone" dataKey="pox_adjusted" stroke="#8884d8" />
            </LineChart>
       
            <div>
            {media_label[0] !== "" &&
                <audio controls>
                <source src= {song1} type="audio/wav" />
                </audio>
            }
            </div>
 
            
            {/* <Typography variant="h5" style={{margin: '20px'}}>Second Song</Typography> */}
            <Divider variant="middle">
           <Chip label="Second Song" />
            </Divider>

            <LineChart width={1400} height={300} data={csv_file2}>
                <XAxis dataKey="adjusted_time" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Legend verticalAlign="top" height={36}/>
                <Tooltip/>
                <Line name="eda (microsiemens)" type="monotone" dataKey="eda_cleaned" stroke="#8884d8" />
                <Line name="heart rate (beats per minute)" type="monotone" dataKey="hr" stroke="#82ca9d" />
            </LineChart><br />
            <LineChart width={1400} height={300} data={pox_csv_file2}>
                <XAxis dataKey="adjusted_time" /> 
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Legend verticalAlign="top" height={36}/>
                <Tooltip/>
                <Line name="pox (microsiemens)" type="monotone" dataKey="pox_adjusted" stroke="#8884d8" />
            </LineChart>
            <br />
            <div>
            {media_label[1] !== "" &&
                <audio controls>
                <source src= {song2} type="audio/wav" />
                </audio>
            }
            </div> 
            {/* <Typography variant="h5" style={{margin: '20px'}}>Third Song</Typography> */}
            <Divider variant="middle">
           <Chip label="Third Song" />
            </Divider>

            <LineChart width={1400} height={300} data={csv_file3}>
                <XAxis dataKey="adjusted_time" >
                <Label value="time" offset={0} position="insideBottom" />    
                </XAxis> 
                <YAxis label={{ value: 'tbd', angle: -90, position: 'insideLeft' }} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Legend verticalAlign="top" height={36}/>
                <Tooltip/>
                <Line name="eda (microsiemens)" type="monotone" dataKey="eda_cleaned" stroke="#8884d8" />
            </LineChart> <br />
            <LineChart width={1400} height={300} data={pox_csv_file3}>
                <XAxis dataKey="adjusted_time" >
                <Label value="time" offset={0} position="insideBottom" />    
                </XAxis> 
                <YAxis label={{ value: 'tbd', angle: -90, position: 'insideLeft' }} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Legend verticalAlign="top" height={36}/>
                <Tooltip/>
                <Line name="pox (microsiemens)" type="monotone" dataKey="pox_adjusted" stroke="#8884d8" />
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

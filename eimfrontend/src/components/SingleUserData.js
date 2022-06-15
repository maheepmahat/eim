import React, { useState, useEffect} from 'react';
import { createFakeData, flattenArrayOfJson, songList } from "../data/data";
import DataTable from "./DataTable";
import { usePapaParse } from 'react-papaparse';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts'
import { useParams } from 'react-router-dom'
import Ratings from './Ratings';
import { Chip, Divider, Typography } from '@mui/material';
import GraphAudio from './GraphAudio';
import SmallDataTable from './SmallDataTable';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




//placeholders 
let file_id = ["", "", ""];
let media_label = ["", "", ""];
let derived_eda_file = ["", "", ""];
let derived_pox_file = ["", "", ""];
let song1, song2, song3;
let number_of_songs = 2;
let current_exp = 9;
let url_path = "http://localhost:5000/"
//let url_path = "http://gan.cs.vt.edu:5000/"

function SingleUserData(props) {

    const [song, setSong] = useState('');
    const {id} = useParams();
    const { readRemoteFile } = usePapaParse();    
    const [subject_data, set_subject_data] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        document.title = "Explore in more detail!"

        fetch(url_path + "api/trials/"+props.experiment_number)
            .then(res => res.json())
            .then(subject_data => { set_subject_data(subject_data); return subject_data; })
            .then(initialData => setRows(flattenArrayOfJson(initialData)))
    }, [])
    //find the row of current user
    const found = subject_data.filter(function (item) { return item._id === props.id; });

    //get the signal id, label and object id for the signal data & files 
    const [signal_id, setSignal_Id] = useState();
    useEffect(() => {
        fetch(url_path + "api/signalData/"+props.id)
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
    if(props.experiment_number != undefined){
        current_exp = props.experiment_number
    }

    if(signal_id !== undefined) {
        file_id[0] = signal_id[0]['_id'];
        file_id[1] = signal_id[1]['_id'];
        media_label[0] = signal_id[0]['label'];
        media_label[1] = signal_id[1]['label'];
        derived_eda_file[0] = signal_id[0]['derived_eda_data_file'];
        derived_eda_file[1] = signal_id[1]['derived_eda_data_file'];
        derived_pox_file[0] = signal_id[0]['derived_pox_data_file'];
        derived_pox_file[1] = signal_id[1]['derived_pox_data_file'];

        if(signal_id.length == 3){
            number_of_songs = 3;
            file_id[2] = signal_id[2]['_id'];
            media_label[2] = signal_id[2]['label'];
            derived_eda_file[2] = signal_id[2]['derived_eda_data_file'];
            derived_pox_file[2] = signal_id[2]['derived_pox_data_file'];
        }
    }

    //set the URL's for the audio call
    song1 = url_path + "api/song/" + media_label[0];
    song2 = url_path + "api/song/" + media_label[1];
    if(signal_id != undefined){
        if(signal_id.length == 3){
            song3 = url_path + "api/song/" + media_label[2];
        }
    }
    let csv_file_small1=[];
    let csv_file_small2=[];
    let csv_file_small3=[];
    let pox_csv_file_small1=[];
    let pox_csv_file_small2=[];
    let pox_csv_file_small3=[];

    //get the song name and the artist name
    const [songInfo1, set_songInfo1] = useState([]);
    useEffect(() => {
        fetch(url_path + "api/songname/"+ media_label[0])
        .then(res => res.json())
        .then(songInfo1 =>set_songInfo1(songInfo1))
    },[signal_id]) 
    const [songInfo2, set_songInfo2] = useState([]);
    useEffect(() => {
        fetch(url_path + "api/songname/"+ media_label[1])
        .then(res => res.json())
        .then(songInfo2 =>set_songInfo2(songInfo2))
    },[signal_id]) 
    const [songInfo3, set_songInfo3] = useState([]);
    useEffect(() => {
        fetch(url_path + "api/songname/"+ media_label[2])
        .then(res => res.json())
        .then(songInfo3 =>set_songInfo3(songInfo3))
    },[signal_id]) 

    //get the eda file
    const [csv_file1, set_csv_file1] = useState([]);
    useEffect(() => {
        if(file_id[0] !== "") 
        readRemoteFile(url_path + "api/signals/"+derived_eda_file[0], {
            worker: true,
            complete: (results) => {
                set_csv_file1(results.data);
            },
            dynamicTyping: true,
            header: true 
        });
    },[signal_id])
    //dividing the file to 500 parts and choosing 1 datapoint from each part. (downsampling)
    if(signal_id !== undefined && csv_file1.length > 0) {
        
        var subset_size = Math.floor(csv_file1.length / 800);
        for(var i=0; i<800; i++)
            {
                csv_file_small1[i] = csv_file1[i*subset_size];
            }
    }
    const [csv_file2, set_csv_file2] = useState([]);
    useEffect(() => {
        readRemoteFile(url_path + "api/signals/"+derived_eda_file[1], {
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
        readRemoteFile(url_path + "api/signals/"+derived_eda_file[2], {
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
    //get the pox data file
    const [pox_csv_file1, set_pox_csv_file1] = useState([]);
    useEffect(() => {
        readRemoteFile(url_path + "api/signals/"+derived_pox_file[0], {
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
        readRemoteFile(url_path + "api/signals/"+derived_pox_file[1], {
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
        readRemoteFile(url_path + "api/signals/"+derived_pox_file[2], {
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
    

    const handleChange = (event) => {
        setSong(event.target.value);
    };
    
    
    return (
        <div className="App">
           
            <Typography variant="h4" style={{margin: '20px'}}>Experiment no. {current_exp}</Typography>
            <Typography variant="h4" style={{margin: '20px'}}>User with id of {id}</Typography>

            <DataTable rows={flattenArrayOfJson(found)} setCurrUserId={props.setCurrUserId} tableHeight={160} />

            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', padding: '20px 0px'}}>
            <Ratings found={found}/>
            </div>
            <Typography variant="h4" sx={{m: 2}}>Signal Information</Typography>

            {/* TODO: make this component somewhat generic & with fewer parameters + add selection ability + ability to change view*/}
            {/* <FormControl size="medium">
            <InputLabel id="demo-simple-select-label">Select Song</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={song}
            label="Age"
            onChange={handleChange}
            >
            <MenuItem value={1}>First Song</MenuItem>
            <MenuItem value={2}>Second Song</MenuItem>
            <MenuItem value={3}>Third Song</MenuItem>
            </Select>
        </FormControl> */}
        
            <GraphAudio title="First Song" eda_file={csv_file1} pox_file={pox_csv_file_small1} media_label={media_label} song={song1} songName={songInfo1}/>
            <GraphAudio title="Second Song" eda_file={csv_file2} pox_file={pox_csv_file_small2} media_label={media_label} song={song2} songName={songInfo2}/>
            {number_of_songs == 3 &&
            <GraphAudio title="Third Song" eda_file={csv_file3} pox_file={pox_csv_file_small3} media_label={media_label} song={song3} songName={songInfo3}/>
            }
        </div>

    );
}


export default SingleUserData;

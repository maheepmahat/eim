import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, Legend, Label, Brush } from 'recharts'
import { Button, Chip, Divider, Grid, IconButton, Typography } from '@mui/material';
import './GraphAudio.css';
// import Waveform from "react-audio-waveform"
import Wavesurfer from "react-wavesurfer.js";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';



export default function GraphAudio({ title, eda_file, pox_file, media_label, song }) {
    const [position, setPosition] = useState(0);
    const [muted, setMuted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const handlePositionChange = (position) => {
        /* ... */
    };

    const onReadyHandler = () => console.log("done loading!");

    
    return (
        <div className='graphaudio'>
            <Divider variant="middle" style={{ margin: '40px 0px' }}>
                <Chip label={title} />
            </Divider>
            <div className='graphs'>
                <ResponsiveContainer aspect={4} width={'80%'}>

                    <LineChart data={eda_file}>
                        {/* <Brush dataKey="adjusted_time" /> */}
                        <XAxis dataKey="adjusted_time" />
                        abc
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Legend verticalAlign="top" height={36} />
                        <Tooltip />

                        <Line name="eda (microsiemens)" type="monotone" dataKey="eda_smoothed" stroke="#8884d8" dot={false} />
                    </LineChart>
                </ResponsiveContainer>

                <ResponsiveContainer aspect={4} width={'80%'} >
                    <LineChart data={pox_file}>
                        <XAxis dataKey="adjusted_time" />
                        abc
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Legend verticalAlign="top" height={36} />
                        <Tooltip />
                        <Line name="pox (microsiemens)" type="monotone" dataKey="pox_adjusted" stroke="#8884d8" dot={false} />
                    </LineChart>
                </ResponsiveContainer>


            </div>
            <div>
                {media_label[0] !== "" &&
                    <audio controls className='audio'>
                        <source src={song} type="audio/wav" />
                    </audio>
                }
            </div>
            {/* <div className='audio'>
                <Wavesurfer 
                src={song}
                position={position}
                onPositionChange={handlePositionChange}
                onReady={onReadyHandler} 
                muted={muted}
                playing={playing}
                height={100}
                width={"80%"}
                />
            </div>
            <div>
                <IconButton size="large" onClick={() => setPlaying(!playing)}>
                    <PlayArrowIcon/>
                </IconButton>
            </div> */}
        </div>
    )
}
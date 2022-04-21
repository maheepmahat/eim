import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts'
import { Chip, Divider, Typography } from '@mui/material';
import './GraphAudio.css';

export default function GraphAudio({ title, eda_file, pox_file, media_label, song, songName}) {
    return (
        
        <div className='graphaudio'>
            <Divider variant="middle" style={{margin: '40px 0px'}}>
                <Chip label={title} />
            </Divider>
            <div className='graphs'>          
            <ResponsiveContainer aspect={4} width={'80%'}>
            <LineChart  width={1400} height={300} data={eda_file}>
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
            <LineChart width={1400} height={300} data={pox_file}>
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
                {songName.length > 0 &&
                    <p>{songName[0]['title']} by {songName[0]['artist']}</p>
                }
            </div>
            <div>
                {media_label[0] !== "" &&
                    <audio controls className='audio'>
                        <source src={song} type="audio/wav" />
                    </audio>
                }
            </div>
        </div>
    )
}
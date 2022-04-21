import React from 'react';
import {Autocomplete, MenuItem, TextField} from '@mui/material';
import './SongSelector.css'
import {filterDataBasedOnSong} from "../data/data";
import { Box } from '@mui/system';
export default class SongSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: ''}
        this.handleSelection = this.handleSelection.bind(this)
        console.log(this.props.songList)
    }

    handleSelection(event, value, reason){
        if (reason === 'selectOption'){
            
            this.setState({
                selected: value._id
        }, () => {
            
            this.props.setRows(filterDataBasedOnSong(this.state.selected === ''? null: this.state.selected, this.props.rows))})
        
        }

        if (reason === 'clear'){
            this.props.setRows(this.props.rows)
        }
    }


    render() {
        return <div className="selector">
            <Autocomplete
                onChange={this.handleSelection}
                disablePortal
                id="song_selector"
                options={this.props.songList}
                sx={{ width: 600 }}
                // renderOption={(props, option) => (
                //     <Box component="li" {...props} key={option._id}>
                //       {option.title} by {option.artist}
                //     </Box>
                //   )}
                getOptionLabel={(option) => `${option.title} by ${option.artist}`}
                renderInput={(params) => <TextField {...params}  label="Select a song" />}
            />
        </div>

    }


}


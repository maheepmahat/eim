import React from 'react';
import {Autocomplete, MenuItem, TextField} from '@mui/material';
import './SongSelector.css'
import {filterDataBasedOnSong} from "../data/data";
import { Box } from '@mui/system';

export default class ExperimentSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: ''}
        this.handleSelection = this.handleSelection.bind(this)
    }
    635274
    experiment_list =[{ label: "11", _id:11},{ label: "10", _id:10}, { label: "9", _id:9}, {label:"8", _id:8}, {label:"7", _id:7},
                    {label:"6", _id:6},{label:"5", _id:5},{label:"4", _id:4},
                    {label:"3", _id:3},{label:"2", _id:2},{label:"1", _id:1}];

    handleSelection(event, value, reason){
        if (reason === 'selectOption'){
            
            this.setState({
                selected: value._id
        }, () => {
            
            //this.props.setRows(filterDataBasedOnSong(this.state.selected === ''? null: this.state.selected, this.props.rows))})
            this.props.set_experiment_number(value)})
        }

    }



    render() {
        return <div className="selector">
            <Autocomplete
                onChange={this.handleSelection}
                disablePortal
                id="experiment_selector"
                options={this.experiment_list} 
                sx={{ width: 600 }}
                getOptionLabel={(option) => `${option.label}`}
                renderInput={(params) => <TextField {...params}  label="Select an experiment (Default is 9)" />}
            />
        </div>       

    }


}


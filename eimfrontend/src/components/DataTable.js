import * as React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {createFakeData, flattenArrayOfJson} from "../data/data";
import {Button} from "@mui/material";
import {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import SingleUserData from "./SingleUserData";



export default function DataTable({rows, setCurrUserId}) {

    const columns = [
        {
            field: 'id', headerName: 'ID',
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{marginLeft: 16}}
                    >
                        <Link
                            to={`/id=${params.value}`}
                            onClick={() => setCurrUserId(params.value)}
                            style={{textDecoration: 'none'}}
                        >
                            {params.value}
                        </Link>
                    </Button>
                </strong>
            )},
        {
            field: 'answers.age',
            headerName: 'Age',
            type: 'number',
            editable: false

        },  {
            field: 'answers.sex',
            headerName: 'Sex',
            type: 'string',
            editable: false

        },{
            field: 'answers.dob',
            headerName: 'DOB',
            type: 'date',
            editable: false

        },{
            field: 'answers.musical_background',
            headerName: 'Musical Background',
            type: 'boolean',
            editable: false

        },{
            field: 'answers.visual_impairments',
            headerName: 'Visual Impairments',
            type: 'boolean',
            editable: false

        },
        {
            field: 'answers.hearing_impairments',
            headerName: 'Hearing Impairments',
            type: 'boolean',
            editable: false

        },
        {
            field: 'answers.nationality',
            headerName: 'Nationality',
            type: 'string',
            editable: false

        },
        {
            field: 'answers.media.0',
            headerName: 'Media',
            type: 'string',
            valueFormatter: (params) => {
                return params.value
            },
            editable: false

        },


    ];


    // console.log(rows)
    return (
        <>
            <div style={{ height: 800, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </>

    );
}


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
            field: 'id', headerName: 'User',
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
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
            flex: 1,
            headerName: 'Age',
            type: 'number',
            editable: false

        },  {
            field: 'answers.sex',
            flex: 1,
            headerName: 'Sex',
            type: 'string',
            editable: false

        },{
            field: 'answers.dob',
            flex: 1,
            headerName: 'DOB',
            type: 'date',
            editable: false

        },{
            field: 'answers.musical_background',
            flex: 1,
            headerName: 'Musical Background',
            type: 'boolean',
            editable: false

        },{
            field: 'answers.visual_impairments',
            flex: 1,
            headerName: 'Visual Impairments',
            type: 'boolean',
            editable: false

        },
        {
            field: 'answers.hearing_impairments',
            flex: 1,
            headerName: 'Hearing Impairments',
            type: 'boolean',
            editable: false

        },
        {
            field: 'answers.nationality',
            flex: 1,
            headerName: 'Nationality',
            type: 'string',
            editable: false

        },
        // {
        //     field: 'media.0',
        //     flex: 1,
        //     headerName: 'Media',
        //     type: 'string',
        //     valueFormatter: (params) => {
        //         return params.value
        //     },
        //     editable: false

        // },


    ];


    // console.log(rows)
    //console.log('columns' + columns)
    return (
        <>
            <div style={{ height: 200, width: '100%'}}>
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


import * as React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Button} from "@mui/material";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function getDate(params){
    // let date = new Date(params.row['answers.dob']);
    // return  date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear()
    return params.value.split('-')[0]
}

export default function DataTable({rows, setCurrUserId, tableHeight, hideFooter}) {
    const columns = [
        {
            field: 'id', headerName: 'User',
            flex: 2,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                    >
                        <Link
                            to={`/user/${params.value}`}
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
            valueGetter: getDate,
            headerName: 'DOB',
            type: 'number',

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
        
    ];
    const columns2 = [
        
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
            renderCell: (params) => (
                <p>
                    {params.value.split('T')[0]}
                </p>
            ),
            headerName: 'DOB',

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
        
    ];
    
   
    return (
        <>
            <div style={{ height: tableHeight }} >
            {tableHeight < 800 &&
                <DataGrid
                sx={{ m: 8 }}
                rows={rows}
                columns={columns2}  
                hideFooter={true}             
            />
            }
            {tableHeight === 800 &&
                <DataGrid
                    sx={{ m: 8 }}
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            }
            </div>
        </>

    );
}


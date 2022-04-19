import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';


export default function SmallDataTable({ data }) {
    if (data.length > 0) {
        return (
            <>
                {/* <TableContainer component={Paper} elevation={0} style={{ width: '91%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {titleCells}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(3).keys()].map((i) => {
                                return <TableRow
                                    key={i}

                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center"    >{i + 1}</TableCell>
                                    {Object.keys(found[0]['answers']['ratings']).map((f) => {
                                        return <TableCell align="center">
                                            <StyledRating sx={{color: getColor(found[0]['answers']['ratings'][f][i])}} name="read-only" value={found[0]['answers']['ratings'][f][i]} readOnly />
                                        </TableCell>

                                    })}
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer> */}
                <TableContainer component={Paper} elevation={0} style={{ width: '91%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(data[0]['answers']).filter((d) =>  d === 'musical_styles').map((d, i) => {
                                    return <TableCell align="center" key={i}>{d}</TableCell>
                                })}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                         <TableRow
                                >
                                    {Object.keys(data[0]['answers']).filter((d) => d === 'musical_styles').map((d, i) => {
                                        // if(i === 0){
                                        //     <TableCell key={i} component="th" scope="row" align="center">{data[0]['answers'][d]}</TableCell>
                                        // }else{
                                            return <TableCell key={i} align="center">{data[0]['answers'][d]}</TableCell>
                                        // }
                                    
                                    })}
                            </TableRow>
                        </TableBody>
                       
                    </Table>
                </TableContainer>
            </>
        );
    }
    else {
        return (
            <div>
                Loading....
            </div>
        )
    }

}
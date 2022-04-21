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

const titles = ['Experiments', 'Activity', 'Engagement', 'Familiarity', 'Chills', 'Positivity', 'Power', 'Like & dislike'];
const titleCells = titles.map((title, i) => {
    return <TableCell align="center" key={i}>{title}</TableCell>
})

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#455A64',
    }
});

export default function Ratings({ found }) {
    if (found.length > 0) {
        return (
            <>
                <TableContainer component={Paper} elevation={0} style={{width: '91%'}}>
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
                                        <StyledRating /*sx={{color: getColor(found[0]['answers']['ratings'][f][i])}}*/ name="read-only" value={found[0]['answers']['ratings'][f][i]} readOnly /> 
                                        </TableCell>     
                                   
                                })}
                                </TableRow>
                            })}
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

function getColor(value){
    if(value < 2){
        return 'red'
    } else {
        return '#455A64'
    }
}
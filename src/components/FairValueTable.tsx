import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import CompaniesTableProps from '../types/GenericTableProps';
import Company from '../types/company';


function FairValueTable(props: CompaniesTableProps) {
    const {title, subtitle, headers, data} = props;
    return (
        <>
            <Typography variant="h4" component="div">{title}</Typography>
            <Typography variant="h6" component="div">{subtitle || ""}</Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small">
                    <TableHead>
                        <TableRow>
                            {
                                headers.map(header=>{
                                    return(
                                        <TableCell key={header}>{header}</TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((row: Company)=>{
                                return(
                                    <TableRow key={`${row.name}-${row.stockCode}`}>
                                        <TableCell>{row.stockCode}</TableCell>
                                        <TableCell>{row.stockPrice.toFixed(2)}</TableCell>
                                        <TableCell>{row.earningsPerShareBasic.toFixed(2)}</TableCell>
                                        <TableCell>{row.fairValue?.toFixed(2)}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        );
}

export default FairValueTable;
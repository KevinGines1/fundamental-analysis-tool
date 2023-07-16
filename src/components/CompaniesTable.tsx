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

import { getAverageSectorPE } from '../utils/formulas';

function getRowColor(row: Company, averageSectorPE: number) {
    if(typeof(row.PERatio) === "string") {
        return "blue";
    } else if (row.PERatio === undefined) {
        return "blue";
    } else if (row.PERatio > averageSectorPE) {
        return "red"; // overvalue
    } else {
        return "green" // undervalued
    }
}

function CompaniesTable(props: CompaniesTableProps) {
    const {title, subtitle, headers, data} = props;
    const averageSectorPE = getAverageSectorPE(data);
    return (
        <>
            <Typography variant="h4" component="div">{title}</Typography>
            <Typography variant="h6" component="div">{subtitle || ""}</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table 
                    sx={{minWidth: 650}} 
                    size="small"
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            {
                                headers.map((header, index)=>{
                                    return(
                                        <TableCell key={index}>{header}</TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((row: Company)=>{
                                const rowColor = getRowColor(row, averageSectorPE);
                                return(
                                    <TableRow 
                                        key={row.stockCode} 
                                        sx={{"backgroundColor": rowColor}}
                                    >
                                        <TableCell size={"small"}>{row.name}</TableCell>
                                        <TableCell size={"small"}>{row.stockCode}</TableCell>
                                        <TableCell size={"small"}>{row.stockPrice.toFixed(2)}</TableCell>
                                        <TableCell size={"small"}>{row.earningsPerShareBasic.toFixed(2)}</TableCell>
                                        <TableCell size={"small"}>{Number(row.PERatio).toFixed(2)}</TableCell>
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

export default CompaniesTable;
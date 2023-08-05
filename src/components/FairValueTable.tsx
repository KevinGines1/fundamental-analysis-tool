import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField, Typography } from '@mui/material';

import CompaniesTableProps from '../types/GenericTableProps';
import Company from '../types/company';
import { useAppSelector } from '../app/hooks';
import { getCompanyFairValues } from '../utils/formulas';


function FairValueTable(props: CompaniesTableProps) {
    const {title, headers} = props;
    const selectedCompanies: Company[] = useAppSelector((state) => state.companyState.selectedCompanies);
    const averageSectorPE: number = useAppSelector((state) => state.companyState.averagePERatio);
    const data = getCompanyFairValues(selectedCompanies);
    return (
        <>
            <Typography variant="h4" component="div">{title}</Typography>
            <Typography variant="h4" component="div">{`Average Sector PE: ${averageSectorPE.toFixed(2)}`}</Typography>
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
            <TextField
                placeholder={"Place your notes here..."}
                sx={{mt: 2, width: "100%", height: "100%"}}
                multiline
                rows={5}
                variant={"filled"}
            />
        </>
        );
}

export default FairValueTable;
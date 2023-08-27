import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Card, TextField, Typography } from '@mui/material';

import CompaniesTableProps from '../types/GenericTableProps';
import Company from '../types/company';
import { useAppSelector } from '../app/hooks';
import { getCompanyFairValues } from '../utils/formulas';
import '../styles/table.css';

function FairValueTable(props: CompaniesTableProps) {
    const {title, headers} = props;
    const selectedCompanies: Company[] = useAppSelector((state) => state.companyState.selectedCompanies);
    const averageSectorPE: number = useAppSelector((state) => state.companyState.averagePERatio);
    const data = getCompanyFairValues(selectedCompanies);
    return (
       <>
        <Typography variant="h4" component="div" className={"tableLabel"} style={{fontFamily: "Montserrat, open-sans"}}>{title}</Typography>
            <TableContainer className={"tableContainer-fv"} component={Card} sx={{padding: 2}}>
                <Table sx={{minWidth: 650}} size="small">
                    <TableBody>
                        <TableRow>
                            {
                                headers.map(header=>{
                                    return(
                                        <TableCell key={header}><Typography className={"tableHeader"} style={{fontFamily: "Montserrat, open-sans"}}>{header}</Typography></TableCell>
                                    );
                                })
                            }
                        </TableRow>
                        {
                            data.map((row: Company)=>{
                                return(
                                    <TableRow key={`${row.name}-${row.stockCode}`}>
                                        <TableCell className={"tableCell"}><Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>{row.stockCode}</Typography></TableCell>
                                        <TableCell className={"tableCell"}><Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>{row.stockPrice.toFixed(2)}</Typography></TableCell>
                                        <TableCell className={"tableCell"}><Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>{row.earningsPerShareBasic.toFixed(2)}</Typography></TableCell>
                                        <TableCell className={"tableCell"}><Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>{row.fairValue?.toFixed(2)}</Typography></TableCell>
                                    </TableRow>
                                );
                            })
                        }
                        <TableRow>
                                        <TableCell rowSpan={2}/>
                                        <TableCell className={"tableCell"} colSpan={2} align={"right"}><Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>Average Sector P/E</Typography></TableCell>
                                        <TableCell className={"tableCell"}><Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>{averageSectorPE.toFixed(2)}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TextField
                placeholder={"Place your notes here..."}
                fullWidth
                sx={{mt: 2, heignt: "100%"}}
                multiline
                rows={5}
                variant={"outlined"}
                InputProps={{
                    sx: {
                        background: "linear-gradient(102.27deg, #A453CB 0%, #8B10B6 100%);",
                        color: "white",
                        fontFamily: "Montserrat, open-sans"
                    }
                }}
            />
       </>
        );
}

export default FairValueTable;
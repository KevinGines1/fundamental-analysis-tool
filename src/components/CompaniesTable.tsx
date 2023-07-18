import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Button, Checkbox, Tooltip, Typography } from '@mui/material';

import CompaniesTableProps from '../types/GenericTableProps';
import Company from '../types/company';

import { getAverageSectorPE } from '../utils/formulas';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToSelectedCompanies, removeFromSelectedCompanies } from '../features/company/company';
import UpdateCompanyModal from './UpdateCompanyModal';

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
    const selectedCompanies = useAppSelector((state) => state.companyState.selectedCompanies);
    const dispatch = useAppDispatch();
    const numSelected = selectedCompanies.length;
    const [showModal, setShowModal] = useState(false);
    const [companyToEdit, setCompanyToEdit] = useState<Company>();

    const handleOnCheck = (company: Company, companySelected: boolean) => {
        if(numSelected === 5 && !companySelected) return;

        if(companySelected) {
            dispatch(removeFromSelectedCompanies(company))
            return;
        } 
        dispatch(addToSelectedCompanies(company));
    }

    const handleButtonClick = (company: Company) => {
        setCompanyToEdit(company);
        setShowModal(true);
    }
    
    return (
        <>
            <Typography variant="h4" component="div">{title}</Typography>
            <Typography variant="h6" component="div">{subtitle || ""}</Typography>
            <Alert severity={"info"}>Select up to 5 companies to analyze.</Alert>
            <br/>
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
                                const companySelected = selectedCompanies.some((c: Company) => c.name === row.name);
                                return(
                                    <TableRow 
                                        key={row.stockCode} 
                                        sx={{"backgroundColor": rowColor}}
                                        hover
                                    >
                                        <TableCell size={"small"} padding={"checkbox"}>
                                            <Checkbox checked={companySelected} onClick={() => {handleOnCheck(row, companySelected)}}/>
                                        </TableCell>
                                        <TableCell size={"small"}>
                                            <Tooltip
                                                title={"Click to update company info & data"}
                                                placement={"right-start"}
                                            >
                                                <Button 
                                                    variant={"text"}
                                                    sx={{color: "black"}}
                                                    onClick={() => { 
                                                        handleButtonClick(row);
                                                    }}
                                                >
                                                    {row.name}
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
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
            <UpdateCompanyModal
                showModal={showModal}
                companyToEdit={companyToEdit}
                onClose={()=>setShowModal(false)}
            />
        </>
        );
}

export default CompaniesTable;
import React, { useState } from 'react';
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Alert, Box, Button, Card, Checkbox, Tooltip, Typography } from '@mui/material';
import "./table.css";

import CompaniesTableProps from '../types/GenericTableProps';
import Company from '../types/company';

import { companySpreadsheetFields } from '../utils/constants';
import { generateCompany } from '../utils/_utils';
import { getAverageSectorPE } from '../utils/formulas';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addCompanies, addToSelectedCompanies, updateAveragePERatio, removeFromSelectedCompanies, updateCompany, updateSelectedCompanies } from '../features/company/company';
import UpdateCompanyModal from './UpdateCompanyModal';
import { Result } from 'react-spreadsheet-import/types/types';

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
    const { title, headers } = props;

    const companies: Company[] = useAppSelector((state) => state.companyState.companies);
    const selectedCompanies: Company[] = useAppSelector((state) => state.companyState.selectedCompanies);
    const averageSectorPE: number = useAppSelector((state) => state.companyState.averagePERatio);
    const dispatch = useAppDispatch();

    const numSelected: number = selectedCompanies.length;

    const [showModal, setShowModal] = useState(false);
    const [companyToEdit, setCompanyToEdit] = useState<Company>({} as Company);
    const [uploaderOpen, setUploaderOpen] = useState<boolean>(false);

    const handleOnCheck = (company: Company, companySelected: boolean) => {
        if(numSelected === 5 && !companySelected) return;

        if(companySelected) {
            dispatch(removeFromSelectedCompanies(company));
            return;
        } 
        dispatch(addToSelectedCompanies(company));
    }

    const handleButtonClick = (company: Company) => {
        setCompanyToEdit(company);
        setShowModal(true);
    }

    const handleUpdateCompanySubmit = (updatedCompany: Company) => {
        dispatch(updateCompany(updatedCompany));
        dispatch(updateSelectedCompanies(updatedCompany));
    };

    const handleFileSubmit = async (data: Result<string>, file: File): Promise<void> => {
        const { validData } = data;
        const companies: Company[] = validData.map(d => generateCompany(d))
        await dispatch(addCompanies(companies));
        dispatch(updateAveragePERatio(getAverageSectorPE(companies)));
    }
    
    return (
        <>
            <Typography variant="h4" component="div" className="tableLabel">
                {`${companies[0]?.sector || title}`}</Typography>
                {   companies.length !== 0 && 
                    <Typography variant="h4" className="tableSubtext">{`Average Sector PE: ${averageSectorPE.toFixed(2)}`}</Typography>
                }
            <Alert 
                severity={"info"} 
                variant={"filled"}
                sx={{background: "linear-gradient(102.27deg, #6F59E6 0%, #4F1797 100%);", mb: 2}}
            >
                {companies.length === 0? "Upload a spreadsheet to begin" : "Select up to 5 companies to analyze."}
            </Alert>
            <Box sx={{display: "flex", justifyContent:"flex-end", width:"100%", mt: 1}}>
                <Button 
                    variant="outlined"
                    onClick={() => setUploaderOpen(true)}
                    sx={{color: "white", borderColor: "white", fontWeight: "bold"}}
                >Upload spreadsheet</Button>
            </Box>
            <ReactSpreadsheetImport isOpen={uploaderOpen} onClose={() => setUploaderOpen(false)} onSubmit={(data, file) => {
                handleFileSubmit(data, file);
            }} fields={companySpreadsheetFields} />
            {
                companies.length !== 0 && 
                <TableContainer component={Card} sx={{ padding: 2, mt: 3}} className={"tableContainer"}>
                        <Table 
                            sx={{minWidth: 650}} 
                            size="small"
                            stickyHeader
                        >
                        <TableBody>
                            
                                <TableRow>
                                {
                                    headers.map((header, index)=>{
                                        return(
                                            <TableCell key={index}>
                                                <Typography className={"tableHeader"}>{header}</Typography>
                                            </TableCell>
                                        );
                                    })
                                }
                                </TableRow>
                            {
                                companies.map((row: Company)=>{
                                    const rowColor = getRowColor(row, averageSectorPE);
                                    const companySelected = selectedCompanies.some((c: Company) => c.name === row.name);
                                    return(
                                        <TableRow 
                                            key={row.stockCode}
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
                                                        sx={{color: "white"}}
                                                        onClick={() => { 
                                                            handleButtonClick(row);
                                                        }}
                                                    >
                                                        <Typography className="tableCell">
                                                        {row.name}
                                                        </Typography>
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell size={"small"}><Typography className={"tableCell"}>{row.stockCode}</Typography></TableCell>
                                            <TableCell size={"small"}><Typography className={"tableCell"}>{row.stockPrice.toFixed(2)}</Typography></TableCell>
                                            <TableCell size={"small"}><Typography className={"tableCell"}>{row.earningsPerShareBasic?.toFixed(2) || 0.0}</Typography></TableCell>
                                            <TableCell size={"small"}><Typography sx={{color: rowColor, fontWeight: "bold"}}>{Number(row.PERatio)?.toFixed(2) || 0.0}</Typography></TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            { showModal && <UpdateCompanyModal
                showModal={showModal}
                companyToEdit={companyToEdit}
                onClose={()=>setShowModal(false)}
                onUpdateSubmit={(updatedCompany: Company) => {
                    handleUpdateCompanySubmit(updatedCompany);
                }}
            />}
        </>
        );
}

export default CompaniesTable;
import React, { useState } from 'react';
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Box, Button, Checkbox, Tooltip, Typography } from '@mui/material';

import CompaniesTableProps from '../types/GenericTableProps';
import Company from '../types/company';

import { getAverageSectorPE } from '../utils/formulas';
import { companySpreadsheetFields } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addCompanies, addToSelectedCompanies, removeFromSelectedCompanies, updateAveragePERatio, updateCompany, updateSelectedCompanies } from '../features/company/company';
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
    const {title, subtitle, headers} = props;

    const companies = useAppSelector((state) => state.companyState.companies);
    const selectedCompanies = useAppSelector((state) => state.companyState.selectedCompanies);
    const dispatch = useAppDispatch();

    const averageSectorPE = getAverageSectorPE(companies);
    const numSelected = selectedCompanies.length;

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

    const handleFileSubmit = (data: Result<string>, file: File): void => {
        const { validData } = data;
        let sum: number = 0;
        const companies: Company[] = validData.map(d => {
            const stockPrice = d.stockPrice ? parseFloat(d.stockPrice.toString().trim()) : 0.0;
            const earningsPerShareBasic = d.earningsPerShareBasic ? parseFloat(d.earningsPerShareBasic.toString().trim()) : 0.0;
            const PERatio = earningsPerShareBasic !== 0.0? stockPrice/earningsPerShareBasic: 0.0;
            const grossExpenses: number = d.grossExpenses ? parseFloat(d.grossExpenses.toString().trim()) : 0.0;
            const grossRevenues: number = d.grossRevenues ? parseFloat(d.grossRevenues.toString().trim()) : 0.0;
            sum = sum + PERatio;
            return {
                name: d.name,
                stockCode: d.stockCode,
                stockPrice,
                earningsPerShareBasic,
                PERatio,
                sector: d.sector,
                currentAssets: d.currentAssets ? parseFloat(d.currentAssets.toString().trim()) : 0.0,
                currentLiabilities: d.currentLiabilities ? parseFloat(d.currentLiabilities.toString().trim()) : 0.0,
                totalAssets: d.totalAssets ? parseFloat(d.totalAssets.toString().trim()) : 0.0,
                totalLiabilities: d.totalLiabilities ? parseFloat(d.totalLiabilities.toString().trim()) : 0.0,
                totalShareholdersEquity: d.totalShareholdersEquity ? parseFloat(d.totalShareholdersEquity.toString().trim()) : 0.0,
                grossExpenses,
                grossRevenues,
                grossProfit: grossRevenues-grossExpenses,
                netIncome: grossRevenues-grossExpenses
            } as Company;
        })
        console.log(companies);
        dispatch(addCompanies(companies));
        dispatch(updateAveragePERatio(sum/companies.length));
    }
    
    return (
        <>
            <Typography variant="h4" component="div">{title}</Typography>
            <Typography variant="h6" component="div">{subtitle || ""}</Typography>
            <Alert severity={"info"}>Select up to 5 companies to analyze.</Alert>
            <Box sx={{display: "flex", justifyContent:"flex-end", width:"100%", mt: 1}}>
                <Button 
                    variant="contained"
                    onClick={() => setUploaderOpen(true)}
                >Upload spreadsheet</Button>
            </Box>
            <ReactSpreadsheetImport isOpen={uploaderOpen} onClose={() => setUploaderOpen(false)} onSubmit={(data, file) => {
                handleFileSubmit(data, file);
            }} fields={companySpreadsheetFields} />
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
                            companies.map((row: Company)=>{
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
                                        <TableCell size={"small"}>{row.earningsPerShareBasic?.toFixed(2) || 0.0}</TableCell>
                                        <TableCell size={"small"}>{Number(row.PERatio)?.toFixed(2) || 0.0}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Card, Typography } from '@mui/material';
import { groupBy, get } from 'lodash';
import "../styles/table.css";

import Ratio from '../objects/Ratio';
import ratios from '../utils/ratios';


import RatioClassication from '../enums/RatioClassification';
import Company from '../types/company';
import { calculateRatio } from '../utils/formulas';
import { useAppSelector } from '../app/hooks';

const generateRatioRow = (row: Ratio, companies: Company[]) => {
    return (
        <TableRow key={row.name}>
            <TableCell colSpan={2}><Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>{row.name}</Typography></TableCell>
            {companies.map((company, index) => {
                return (
                    <TableCell 
                        key={`${index}-${row.name}-${company.name}`}
                        size={"small"}
                    >
                        <Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>{calculateRatio(row.name, row.formula, company).toFixed(2)}</Typography>
                    </TableCell>
                )
            })}
            <TableCell><Typography className="tableCell" style={{fontFamily: "Montserrat, open-sans"}}>{row.guide}</Typography></TableCell>
        </TableRow>
    );
}

function RatiosTable() {
    const selectedCompanies = useAppSelector((state) => state.companyState.selectedCompanies);
    const groupedRatios: Object = groupBy(ratios, "classification")
    const liquidityRatios: Ratio[] = get(groupedRatios, RatioClassication.LIQUIDITY_RATIO, []);
    const financialLeverageRatios: Ratio[] = get(groupedRatios, RatioClassication.FINANCIAL_LEVERAGE, []);
    const profitabilityRatios: Ratio[] = get(groupedRatios, RatioClassication.PROFITABILITY, []);
    return(
        <>
            <Typography variant="h4" className='tableLabel' style={{fontFamily: "Montserrat, open-sans"}}>Ratios</Typography>
            <TableContainer component={Card} className={"tableContainer"} sx={{ padding: 2, mb: 10 }}>
                <Table sx={{minWidth: 650}} size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            {selectedCompanies.map((company, index) => {
                                return(
                                    <TableCell key={`${index}-${company.stockCode}`}><Typography className="tableHeader" style={{fontFamily: "Montserrat, open-sans"}}>{company.stockCode}</Typography></TableCell>
                                );
                            })}
                            <TableCell><Typography className="tableHeader" style={{fontFamily: "Montserrat, open-sans"}}>Guide</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="tableHeader" align={"center"} colSpan={8}>
                                <Typography className="tableHeader" style={{fontFamily: "Montserrat, open-sans", fontWeight: "bold"}}>
                                    {RatioClassication.LIQUIDITY_RATIO}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        {
                            liquidityRatios.map(
                                r => {
                                    return generateRatioRow(r, selectedCompanies);
                                }
                            )
                        }
                        <TableRow>
                            <TableCell align={"center"} colSpan={8}>
                                <Typography className="tableHeader" style={{fontFamily: "Montserrat, open-sans", fontWeight: "bold"}}>
                                    {RatioClassication.FINANCIAL_LEVERAGE}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        {
                            financialLeverageRatios.map(
                                r => {
                                    return generateRatioRow(r, selectedCompanies);
                                }
                            )
                        }
                        <TableRow>
                            <TableCell  align={"center"} colSpan={8}>
                                <Typography className="tableHeader" style={{fontFamily: "Montserrat, open-sans", fontWeight: "bold"}}>
                                    {RatioClassication.PROFITABILITY}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        {
                            profitabilityRatios.map(
                                r => {
                                    return generateRatioRow(r, selectedCompanies);
                                }
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default RatiosTable;
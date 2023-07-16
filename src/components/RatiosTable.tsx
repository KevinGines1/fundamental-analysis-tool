import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { groupBy, get } from 'lodash';

import Ratio from '../objects/Ratio';
import ratios from '../utils/ratios';


import RatiosTableProps from '../types/RatiosTableProps';
import RatioClassication from '../enums/RatioClassification';
import Company from '../types/company';
import { calculateRatio } from '../utils/formulas';

const generateRatioRow = (row: Ratio, companies: Company[]) => {
    return (
        <TableRow key={row.name}>
            <TableCell colSpan={2}>{row.name}</TableCell>
            {companies.map((company, index) => {
                return (
                    <TableCell 
                        key={`${index}-${row.name}-${company.name}`}
                        size={"small"}
                    >
                        {calculateRatio(row.name, row.formula, company).toFixed(2)}
                    </TableCell>
                )
            })}
            <TableCell>{row.guide}</TableCell>
        </TableRow>
    );
}

function RatiosTable(props: RatiosTableProps) {
    const { companies } = props;
    const groupedRatios: Object = groupBy(ratios, "classification")
    const liquidityRatios: Ratio[] = get(groupedRatios, RatioClassication.LIQUIDITY_RATIO, []);
    const financialLeverageRatios: Ratio[] = get(groupedRatios, RatioClassication.FINANCIAL_LEVERAGE, []);
    const profitabilityRatios: Ratio[] = get(groupedRatios, RatioClassication.PROFITABILITY, []);
    return(
        <>
            <Typography variant="h4">Ratios</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table sx={{minWidth: 650}} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            {companies.map((company, index) => {
                                return(
                                    <TableCell key={`${index}-${company.stockCode}`}>{company.stockCode}</TableCell>
                                );
                            })}
                            <TableCell>Guide</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align={"center"} colSpan={8}>{RatioClassication.LIQUIDITY_RATIO}</TableCell>
                        </TableRow>
                        {
                            liquidityRatios.map(
                                r => {
                                    return generateRatioRow(r, companies);
                                }
                            )
                        }
                        <TableRow>
                            <TableCell align={"center"} colSpan={8}>{RatioClassication.FINANCIAL_LEVERAGE}</TableCell>
                        </TableRow>
                        {
                            financialLeverageRatios.map(
                                r => {
                                    return generateRatioRow(r, companies);
                                }
                            )
                        }
                        <TableRow>
                            <TableCell align={"center"} colSpan={8}>{RatioClassication.PROFITABILITY}</TableCell>
                        </TableRow>
                        {
                            profitabilityRatios.map(
                                r => {
                                    return generateRatioRow(r, companies);
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
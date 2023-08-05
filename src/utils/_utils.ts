import { Data } from "react-spreadsheet-import/types/types";
import Company from "../types/company";

export const generateCompany = (data: Data<string>) : Company => {
    const stockPrice: number = data.stockPrice ? parseFloat(data.stockPrice.toString().trim()) : 0.0;
    const earningsPerShareBasic: number = data.earningsPerShareBasic ? parseFloat(data.earningsPerShareBasic.toString().trim()) : 0.0;
    const PERatio: number = earningsPerShareBasic !== 0.0? stockPrice/earningsPerShareBasic: 0.0;
    const grossExpenses: number = data.grossExpenses ? parseFloat(data.grossExpenses.toString().trim()) : 0.0;
    const grossRevenues: number = data.grossRevenues ? parseFloat(data.grossRevenues.toString().trim()) : 0.0;
    const currentAssets: number = data.currentAssets ? parseFloat(data.currentAssets.toString().trim()) : 0.0;
    const totalAssets: number = data.totalAssets ? parseFloat(data.totalAssets.toString().trim()) : 0.0;
    const totalLiabilities: number = data.totalLiabilities ? parseFloat(data.totalLiabilities.toString().trim()) : 0.0;
    const totalShareholdersEquity: number = data.totalShareholdersEquity ? parseFloat(data.totalShareholdersEquity.toString().trim()) : 0.0;
    const grossProfit: number = grossRevenues-grossExpenses;
    const netIncome: number = data.netIncome ? parseFloat(data.netIncome.toString().trim()) : 0.0;

    return {
        name: data.name,
        stockCode: data.stockCode,
        stockPrice,
        earningsPerShareBasic,
        PERatio,
        sector: data.sector,
        currentAssets,
        currentLiabilities: data.currentLiabilities ? parseFloat(data.currentLiabilities.toString().trim()) : 0.0,
        totalAssets,
        totalLiabilities,
        totalShareholdersEquity,
        grossExpenses,
        grossRevenues,
        grossProfit,
        netIncome
    } as Company;
}
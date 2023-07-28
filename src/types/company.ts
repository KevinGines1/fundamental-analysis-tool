import Sector from '../enums/Sector';

export interface Company {
    name: string;
    stockCode: string;
    stockPrice: number;
    earningsPerShareBasic: number;
    sector: Sector;
    PERatio?: number | string;
    fairValue?: number;

    currentAssets?: number;
    currentLiabilities?: number;
    cash?: number;
    accountsReceivable?: number;
    totalAssets?: number;
    totalLiabilities?: number;

    totalShareholdersEquity?: number;
    ebitda?: number;
    interestExpense?: number;

    grossProfit?: number;
    grossExpenses?: number;
    grossRevenues?: number;
    netIncome?: number;
    totalEquity?: number;
}

export default Company;
import Sector from '../enums/Sector';

export interface Company {
    name: string;
    stockCode: string;
    stockPrice: number;
    earningsPerShareBasic: number;
    sector: Sector;
    PERatio?: number | string; // derived value
    fairValue?: number; // derived value

    currentAssets: number;
    currentLiabilities: number;
    cash?: number;
    accountsReceivable: number;
    totalAssets: number;
    totalLiabilities: number;

    totalShareholdersEquity: number;
    ebitda?: number;
    interestExpense?: number;

    grossProfit: number; // derived value
    grossExpenses: number;
    grossRevenues: number;
    netIncome?: number;
    totalEquity?: number; // todo to be removed?
}

export default Company;
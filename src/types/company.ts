import Sector from '../enums/Sector';

export interface Company {
    name: string;
    stockCode: string;
    stockPrice: number;
    earningsPerShareBasic: number;
    sector: Sector;
    PERatio?: number | string;
}

export default Company;
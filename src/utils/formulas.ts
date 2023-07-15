import FormulaParameters from "../types/FormulaParameters";
import Company from "../types/company";
import { ASSET_TO_EQUITY_RATIO, CURRENT_RATIO, DEBT_RATIO, DEBT_TO_EQUITY_RATIO, GROSS_PROFIT_MARGIN, INTEREST_COVERAGE, NET_PROFIT_MARGIN, PRICE_EARNINGS_RATIO, QUICK_RATIO, RETURN_ON_ASSETS, RETURN_ON_EQUITY, SOLVENCY_RATIO } from "./ratios";

export const getPERatio = (stockPrice: number, eps: number) => {
    try {
        return stockPrice/eps;
    } catch {
        return "NA";
    }
}

export const getCompanyPERatios = (companies: Company[]) => {
    return companies.map(company => {
        return {
            ...company,
            "PERatio": getPERatio(company.stockPrice, company.earningsPerShareBasic)
        }
    })
}

export const getAverageSectorPE = (companies: Company[]) => {
    const validCompanies: Company[] = companies.filter(company => typeof(company.PERatio) === "number");
    return validCompanies.map(company => Number(company.PERatio)).reduce((acc, currPER) => acc + currPER, 0) / validCompanies.length;
}


export const calculateRatio = (ratioName: string, formula: (op1: number, op2: number) => number, company: Company): number => {
    const {op1, op2} = getFormulaParameters(ratioName, company);
    return formula(op1, op2);
}

const getFormulaParameters = (ratioName: string, company: Company): FormulaParameters => {
    switch(ratioName){
        case CURRENT_RATIO:
            return {
                op1: company.currentAssets ?? 0,
                op2: company.currentLiabilities ?? 1
            }
        case QUICK_RATIO:
            return {
                op1: company.cash ?? 0,
                op2: company.accountsReceivable ?? 1
            }
        case SOLVENCY_RATIO:
            return {
                op1: company.totalAssets ?? 0,
                op2: company.totalLiabilities ?? 1
            }
        case DEBT_RATIO:
            return {
                op1: company.totalDebt ?? 0,
                op2: company.totalAssets ?? 1
            }
        case DEBT_TO_EQUITY_RATIO:
            return {
                op1: company.totalDebt ?? 0,
                op2: company.totalShareholdersEquity ?? 1
            }
        case INTEREST_COVERAGE:
            return {
                op1: company.ebitda ?? 0,
                op2: company.interestExpense ?? 1
            }
        case ASSET_TO_EQUITY_RATIO:
            return {
                op1: company.totalAssets ?? 0,
                op2: company.totalShareholdersEquity ?? 1
            }
        case GROSS_PROFIT_MARGIN:
            return {
                op1: company.grossProfit ?? 0,
                op2: company.grossRevenues ?? 1
            }
        case NET_PROFIT_MARGIN:
            return {
                op1: company.netIncome ?? 0,
                op2: company.grossRevenues ?? 1
            }
        case RETURN_ON_ASSETS:
            return {
                op1: company.netIncome ?? 0,
                op2: company.totalAssets ?? 1
            }
        case RETURN_ON_EQUITY:
            return {
                op1: company.netIncome ?? 0,
                op2: company.totalEquity ?? 1
            }
        case PRICE_EARNINGS_RATIO:
            return {
                op1: company.stockPrice ?? 0,
                op2: company.earningsPerShareBasic ?? 1
            }
        default: 
            return {
                op1: 0,
                op2: 1
            }
    }
}
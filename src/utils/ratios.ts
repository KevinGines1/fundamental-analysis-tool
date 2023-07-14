import RatioClassication from "../enums/RatioClassification";
import Ratio from "../objects/Ratio";

// LIQUIDITY RATIO
export const currentRatio: Ratio = {
    name: "Current Ratio/Working Capital Ratio",
    classification: RatioClassication.LIQUIDITY_RATIO,
    guide: ">= 2.0 is good, The higher the better.",
    formula: (currentAssets, currentLiabilities) => {return (currentAssets/currentLiabilities)}
}

export const quickRatio: Ratio = {
    name: "Quick Ratio",
    classification: RatioClassication.LIQUIDITY_RATIO,
    guide: "The higher the better.",
    formula: (cashAndAccountsReceivable, currentLiabilities) => {return (cashAndAccountsReceivable/currentLiabilities)}
}

export const solvencyRatio: Ratio = {
    name: "Solvency Ratio",
    classification: RatioClassication.LIQUIDITY_RATIO,
    guide: "The higher the better.",
    formula: (totalAssets, totalLiabilities) => {return (totalAssets/totalLiabilities)}
}

// FINANCIAL LEVERAGE
export const debtRatio: Ratio = {
    name: "Debt Ratio",
    classification: RatioClassication.FINANCIAL_LEVERAGE,
    guide: "The lower the better.",
    formula: (totalDebt, totalAssets) => {return (totalDebt/totalAssets)}
}

export const debtToEquityRatio: Ratio = {
    name: "Debt to Equity Ratio",
    classification: RatioClassication.FINANCIAL_LEVERAGE,
    guide: "The lower the better.",
    formula: (totalDebt, totalShareHoldersEquity) => {return (totalDebt/totalShareHoldersEquity)}
}

export const interestCoverage: Ratio = {
    name: "Interest Coverage",
    classification: RatioClassication.FINANCIAL_LEVERAGE,
    guide: "The higher the better.",
    formula: (ebitda, interestExpense) => {return (ebitda/interestExpense)}
}

export const assetToEquityRatio: Ratio = {
    name: "Asset to Equity Ratio",
    classification: RatioClassication.FINANCIAL_LEVERAGE,
    guide: "The lower the better.",
    formula: (totalAssets, totalShareHoldersEquity) => {return (totalAssets/totalShareHoldersEquity)}
}

// PROFITABILITY
export const grossProfitMargin: Ratio = {
    name: "Gross Profit Margin",
    classification: RatioClassication.PROFITABILITY,
    guide: "The higher the better.",
    formula: (grossProfit, grossRevenues) => {return (grossProfit/grossRevenues)}
}

export const netProfitMargin: Ratio = {
    name: "Net Profit Margin",
    classification: RatioClassication.PROFITABILITY,
    guide: "The higher the better.",
    formula: (netIncome, grossRevenues) => {return (netIncome/grossRevenues)}
}

export const returnOnAssets: Ratio = {
    name: "Return on Assets",
    classification: RatioClassication.PROFITABILITY,
    guide: "The higher the better.",
    formula: (netIncome, totalAssets) => {return (netIncome/totalAssets)}
}

export const returnOnEquity: Ratio = {
    name: "Return on Equity",
    classification: RatioClassication.PROFITABILITY,
    guide: "The higher the better.",
    formula: (netIncome, totalEquity) => {return (netIncome/totalEquity)}
}

export const priceEarningsRatio: Ratio = {
    name: "Price Earnings Ratio",
    classification: RatioClassication.PROFITABILITY,
    guide: "The lower the better.",
    formula: (stockPrice, earningsPerShareBasic) => {return (stockPrice/earningsPerShareBasic)}
}

export const ratios: Ratio[] = [
    currentRatio,
    quickRatio,
    solvencyRatio,
    debtRatio,
    debtToEquityRatio,
    interestCoverage,
    assetToEquityRatio,
    grossProfitMargin,
    netProfitMargin,
    returnOnAssets,
    returnOnEquity,
    priceEarningsRatio
];

export default ratios;
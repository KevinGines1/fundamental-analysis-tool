import RatioClassication from "../enums/RatioClassification";
import Ratio from "../objects/Ratio";

export const CURRENT_RATIO = "Current Ratio/Working Capital Ratio";
export const QUICK_RATIO = "Quick Ratio";
export const SOLVENCY_RATIO = "Solvency Ratio";
export const DEBT_RATIO = "Debt Ratio";
export const DEBT_TO_EQUITY_RATIO = "Debt to Equity Ratio";
export const INTEREST_COVERAGE = "Interest Coverage";
export const ASSET_TO_EQUITY_RATIO = "Asset to Equity Ratio";
export const GROSS_PROFIT_MARGIN = "Gross Profit Margin";
export const NET_PROFIT_MARGIN = "Net Profit Margin";
export const RETURN_ON_ASSETS = "Return on Assets";
export const RETURN_ON_EQUITY = "Return on Equity";
export const PRICE_EARNINGS_RATIO = "Price Earnings Ratio";



// LIQUIDITY RATIO
export const currentRatio: Ratio = {
    name: CURRENT_RATIO,
    classification: RatioClassication.LIQUIDITY_RATIO,
    guide: ">= 2.0 is good, The higher the better.",
    formula: (currentAssets, currentLiabilities) => {return (currentAssets/currentLiabilities)}
}

export const quickRatio: Ratio = {
    name: QUICK_RATIO,
    classification: RatioClassication.LIQUIDITY_RATIO,
    guide: "The higher the better.",
    formula: (cashAndAccountsReceivable, currentLiabilities) => {return (cashAndAccountsReceivable/currentLiabilities)}
}

export const solvencyRatio: Ratio = {
    name: SOLVENCY_RATIO,
    classification: RatioClassication.LIQUIDITY_RATIO,
    guide: "The higher the better.",
    formula: (totalAssets, totalLiabilities) => {return (totalAssets/totalLiabilities)}
}

// FINANCIAL LEVERAGE
export const debtRatio: Ratio = {
    name: DEBT_RATIO,
    classification: RatioClassication.FINANCIAL_LEVERAGE,
    guide: "The lower the better.",
    formula: (totalDebt, totalAssets) => {return (totalDebt/totalAssets)}
}

export const debtToEquityRatio: Ratio = {
    name: DEBT_TO_EQUITY_RATIO,
    classification: RatioClassication.FINANCIAL_LEVERAGE,
    guide: "The lower the better.",
    formula: (totalDebt, totalShareHoldersEquity) => {return (totalDebt/totalShareHoldersEquity)}
}

export const interestCoverage: Ratio = {
    name: INTEREST_COVERAGE,
    classification: RatioClassication.FINANCIAL_LEVERAGE,
    guide: "The higher the better.",
    formula: (ebitda, interestExpense) => {return (ebitda/interestExpense)}
}

export const assetToEquityRatio: Ratio = {
    name: ASSET_TO_EQUITY_RATIO,
    classification: RatioClassication.FINANCIAL_LEVERAGE,
    guide: "The lower the better.",
    formula: (totalAssets, totalShareHoldersEquity) => {return (totalAssets/totalShareHoldersEquity)}
}

// PROFITABILITY
export const grossProfitMargin: Ratio = {
    name: GROSS_PROFIT_MARGIN,
    classification: RatioClassication.PROFITABILITY,
    guide: "The higher the better.",
    formula: (grossProfit, grossRevenues) => {return (grossProfit/grossRevenues)}
}

export const netProfitMargin: Ratio = {
    name: NET_PROFIT_MARGIN,
    classification: RatioClassication.PROFITABILITY,
    guide: "The higher the better.",
    formula: (netIncome, grossRevenues) => {return (netIncome/grossRevenues)}
}

export const returnOnAssets: Ratio = {
    name: RETURN_ON_ASSETS,
    classification: RatioClassication.PROFITABILITY,
    guide: "The higher the better.",
    formula: (netIncome, totalAssets) => {return (netIncome/totalAssets)}
}

export const returnOnEquity: Ratio = {
    name: RETURN_ON_EQUITY,
    classification: RatioClassication.PROFITABILITY,
    guide: "The higher the better.",
    formula: (netIncome, totalEquity) => {return (netIncome/totalEquity)}
}

export const priceEarningsRatio: Ratio = {
    name: PRICE_EARNINGS_RATIO,
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
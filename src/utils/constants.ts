export const listOfCompaniesHeaders: string[] = [
    "", // this is for the checkbox
    "COMPANIES",
    "CODE",
    "PRICE",
    "EPS",
    "P/E"
];

interface FieldType {
    type: String // input / checkbox / select
}

interface Validation {
    rule: String, // required / unique / regex
    errorMessage: String, 
    level?: String // info / warning / error (Optional, default is error)
}

interface Field {
    label: String,
    key: String,
    alternateMatches: String[],
    fieldType: FieldType,
    example: String,
    validations: Validation[]


}

const generateValidation = (rule: String, errorMessage: String, level: String): Validation => {
    return {
        rule,
        errorMessage,
        level
    } as Validation;
}

const companyName: Field = {
    label: "Company Name",
    key: "name",
    alternateMatches: ["companyName"],
    fieldType: { type: "input" },
    example: "Jollibee Food Corporation",
    validations: [
        generateValidation("required", "Company Name is required", "error")
    ]
}

const stockCode: Field = {
    label: "Code",
    key: "stockCode",
    alternateMatches: ["code"],
    fieldType: { type: "input" },
    example: "JFC",
    validations: [
        generateValidation("required", "Stock code is required", "error")
    ]
}

const sector: Field = {
    label: "Sector",
    key: "sector",
    alternateMatches: [],
    fieldType: { type: "input" },
    example: "FINANCIALS",
    validations: [
        generateValidation("required", "Sector is required", "error")
    ]
}

const stockPrice: Field = {
    label: "Price",
    key: "stockPrice",
    alternateMatches: ["price"],
    fieldType: { type: "input" },
    example: "0.10",
    validations: [
        generateValidation("required", "Stock price is required", "error")
    ]
}

const currentAssets: Field = {
    label: "Current Assets",
    key: "currentAssets",
    alternateMatches: [],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Current Assets is required", "error")
    ]
}

const currentLiabilities: Field = {
    label: "Current Liabilities",
    key: "currentLiabilities",
    alternateMatches: [],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Current Liabilities is required", "error")
    ]
}

const totalAssets: Field = {
    label: "Total Assets",
    key: "totalAssets",
    alternateMatches: [],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Total Assets is required", "error")
    ]
}

const totalLiabilities: Field = {
    label: "Total Liabilities",
    key: "totalLiabilities",
    alternateMatches: [],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Total Liabilities is required", "error")
    ]
}

const totalShareholdersEquity: Field = {
    label: "Total Shareholders Equity",
    key: "totalShareholdersEquity",
    alternateMatches: ["Total Shareholders Equity"],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Total Shareholders Equity is required", "error")
    ]
}

const grossExpenses: Field = {
    label: "Gross Expenses",
    key: "grossExpenses",
    alternateMatches: [],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Gross Expenses is required", "error")
    ]
}

const grossRevenues: Field = {
    label: "Gross Revenues",
    key: "grossRevenues",
    alternateMatches: [],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Gross Revenues is required", "error")
    ]
}

const netIncome: Field = {
    label: "Net Income",
    key: "netIncome",
    alternateMatches: [],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Net Income is required", "error")
    ]
}

const earningsPerShareBasic: Field = {
    label: "Earnings Per Share (Basic)",
    key: "earningsPerShareBasic",
    alternateMatches: ["Earnings Per Share (Basic)"],
    fieldType: { type: "input" },
    example: "1000000",
    validations: [
        generateValidation("required", "Earnings Per Share (Basic) is required", "error")
    ]
}

export const companySpreadsheetFields: Field[] = [
    companyName,
    stockCode,
    sector,
    stockPrice,
    currentAssets,
    totalAssets,
    currentLiabilities,
    totalLiabilities,
    totalShareholdersEquity,
    grossRevenues,
    grossExpenses,
    netIncome,
    earningsPerShareBasic
]


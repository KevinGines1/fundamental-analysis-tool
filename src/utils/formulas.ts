import Company from "../types/company";

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
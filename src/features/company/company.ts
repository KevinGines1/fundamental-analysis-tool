import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import Company from "../../types/company";

interface CompanyState {
    companies: Company[]; // list of all the companies in a sector
    selectedCompanies: Company[]; // list of companies selected for analysis
    averagePERatio: number; // the average PE ratio of the sector
}

const initialState: CompanyState = {
    companies: [],
    selectedCompanies: [],
    averagePERatio: 0
}

export const companySlice = createSlice({
    name: "companyState",
    initialState,
    reducers: {
        addToSelectedCompanies: (state, action: PayloadAction<Company>) => {
            state.selectedCompanies = [...state.selectedCompanies, action.payload];
        },
        removeFromSelectedCompanies: (state, action: PayloadAction<Company>) => {
            state.selectedCompanies = state.selectedCompanies.filter((company: Company) => company.name !== action.payload.name);
        },
        updateAveragePERatio: (state, action: PayloadAction<number>) => {
            state.averagePERatio = action.payload;
        },
        updateCompany: (state, action: PayloadAction<Company>) => {
            const currentCompanies = [...state.companies];
            const companyToUpdate = action.payload;
            const currentCompaniesIndex = currentCompanies.findIndex(c => c.name === companyToUpdate.name);
            state.companies = state.companies.map((c, idx) => {
                if (idx === currentCompaniesIndex) {
                    return {
                        ...companyToUpdate,
                    };
                }
                return c;
            })
        },
        updateSelectedCompanies: (state, action: PayloadAction<Company>) => {
            const currentSelectedCompanies = [...state.selectedCompanies];
            const companyToUpdate = action.payload;
            const selectedCompaniesIndex = currentSelectedCompanies.findIndex(c => c.name === companyToUpdate.name);
            state.selectedCompanies = state.selectedCompanies.map((c, idx) => {
                if (idx === selectedCompaniesIndex) {
                    return {
                        ...companyToUpdate,
                    };
                }
                return c;
            });

        },
        addCompanies: (state, action:PayloadAction<Company[]>) => {
            state.companies = [...action.payload];
        }
    }
});

export const { 
    addToSelectedCompanies,
    removeFromSelectedCompanies,
    updateAveragePERatio,
    updateCompany,
    addCompanies,
    updateSelectedCompanies
} = companySlice.actions;

export const selectCompanies = (state: RootState) => state.companyState;

export default companySlice.reducer;
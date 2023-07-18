import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import Company from "../../types/company";

interface CompanyState {
    companies: Company[]; // list of all the companies
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
        }
    }
});

export const { addToSelectedCompanies, removeFromSelectedCompanies, updateAveragePERatio } = companySlice.actions;

export const selectCompanies = (state: RootState) => state.companyState;

export default companySlice.reducer;
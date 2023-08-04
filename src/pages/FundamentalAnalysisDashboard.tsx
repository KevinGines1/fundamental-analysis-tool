import React from 'react';
import CompaniesTable from '../components/CompaniesTable';
import RatiosTable from '../components/RatiosTable';
import FairValueTable from '../components/FairValueTable';
import { listOfCompaniesHeaders } from '../utils/constants';
import { getCompanyPERatios, getAverageSectorPE } from '../utils/formulas';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addCompanies, updateAveragePERatio } from '../features/company/company';
import { sampleCompanies } from '../utils/mock_data';

function FundamentalyAnalysisDashboard() {
      const companiesWithPERatios = getCompanyPERatios(sampleCompanies);
      const dispatch = useAppDispatch();

      dispatch(addCompanies(companiesWithPERatios));
      const selectedCompanies = useAppSelector((state) => state.companyState.selectedCompanies);
      const averageSectorPE = useAppSelector((state) => state.companyState.averagePERatio);
      // dispatch(updateAveragePERatio(getAverageSectorPE(companiesWithPERatios)));
      
      
    return (
        <Grid 
            container 
            columnGap={5}
            rowGap={5}
            justifyContent={"center"}
            alignItems={"baseline"}
        >
            <Grid item xs={6}>
                <CompaniesTable
                title="FINANCIALS"
                subtitle={`Average Sector PE: ${averageSectorPE.toFixed(2)}`}
                headers={listOfCompaniesHeaders} 
                />
            </Grid>
            <Grid xs={5}>
                <FairValueTable
                title={"Fair Value Table"}
                subtitle={`Average Sector PE: ${averageSectorPE.toFixed(2)}`}
                headers={["Stock", "Price", "EPS (Basic)", "Fair Value"]}
                />
            </Grid>
            {selectedCompanies.length >= 3 && 
              <Grid xs={12}>
                <RatiosTable />
              </Grid>
            }
    </Grid>
    );
}

export default FundamentalyAnalysisDashboard;
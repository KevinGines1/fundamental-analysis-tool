import React from 'react';
import CompaniesTable from '../components/CompaniesTable';
import RatiosTable from '../components/RatiosTable';
import FairValueTable from '../components/FairValueTable';
import { listOfCompaniesHeaders } from '../utils/constants';
import { Grid } from '@mui/material';
import { 
  useAppSelector } from '../app/hooks';

function FundamentalyAnalysisDashboard() {

    const selectedCompanies = useAppSelector((state) => state.companyState.selectedCompanies);
      
    return (
        <Grid 
            container 
            columnGap={5}
            rowGap={5}
            justifyContent={"center"}
            alignItems={"baseline"}
        >
            <Grid item xs={selectedCompanies.length >= 3 ? 6 : 7}>
                <CompaniesTable
                title={"Companies List"}
                headers={listOfCompaniesHeaders} 
                />
            </Grid>
            <Grid item xs={5}>
            { selectedCompanies.length >= 3 && 
              <FairValueTable
                title={"Fair Value Table"}
                headers={["Stock", "Price", "EPS (Basic)", "Fair Value"]}
              />
            }
            </Grid>
            {selectedCompanies.length >= 3 && 
              <Grid item xs={8}>
                <RatiosTable />
              </Grid>
            }
    </Grid>
    );
}

export default FundamentalyAnalysisDashboard;
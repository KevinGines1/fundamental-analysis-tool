import React from 'react';
import CompaniesTable from '../components/CompaniesTable';
import RatiosTable from '../components/RatiosTable';
import FairValueTable from '../components/FairValueTable';
import { listOfCompaniesHeaders } from '../utils/constants';
import { Grid, Grow } from '@mui/material';
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
            <Grow in={selectedCompanies.length >= 3} {...(selectedCompanies.length >= 3 ? { timeout: 1000 } : {})}>
              <Grid item xs={5}>
                <FairValueTable
                    title={"Fair Value Table"}
                    headers={["Stock", "Price", "EPS (Basic)", "Fair Value"]}
                  />
              </Grid>
            </Grow>
            <Grow in={selectedCompanies.length >= 3} {...(selectedCompanies.length >= 3 ? { timeout: 1000 } : {})}>
              <Grid item xs={8}>
                <RatiosTable />
              </Grid>
            </Grow>
    </Grid>
    );
}

export default FundamentalyAnalysisDashboard;
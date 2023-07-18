import React from 'react';
import CompaniesTable from '../components/CompaniesTable';
import RatiosTable from '../components/RatiosTable';
import FairValueTable from '../components/FairValueTable';
import Sector from '../enums/Sector';
import Company from '../types/company';
import { listOfCompaniesHeaders } from '../utils/constants';
import { getCompanyPERatios, getAverageSectorPE, getCompanyFairValues } from '../utils/formulas';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateAveragePERatio } from '../features/company/company';

function FundamentalyAnalysisDashboard() {
    const sampleCompanies: Company[] = [
        {
          name: 'Arthaland Corporation',
          sector: Sector.FINANCIALS,
          stockCode: 'ALCO',
          stockPrice: 0.5,
          earningsPerShareBasic: 0.11
        },
        {
          name: 'Anchor Land Holdings, Inc.',
          sector: Sector.FINANCIALS,
          stockCode: 'ALHI',
          stockPrice: 4.52,
          earningsPerShareBasic: 0.47
        },
        {
          name: 'Ayala Land, Inc.',
          sector: Sector.FINANCIALS,
          stockCode: 'ALI',
          stockPrice: 25.95,
          earningsPerShareBasic: 1.25
        },
        {
          name: 'AyalaLand Logistics Holdings Corp.',
          sector: Sector.FINANCIALS,
          stockCode: 'ALLHC',
          stockPrice: 2.86,
          earningsPerShareBasic: 0.16
        },
        {
          name: 'Altus Property Ventures Inc.',
          sector: Sector.FINANCIALS,
          stockCode: 'APVI',
          stockPrice: 11.36,
          earningsPerShareBasic: 1.08
        },
        {
          name: 'Araneta Properties Inc.',
          sector: Sector.FINANCIALS,
          stockCode: 'ARA',
          stockPrice: 0,
          earningsPerShareBasic: 0
        },
        {
          name: 'AREIT Inc',
          sector: Sector.FINANCIALS,
          stockCode: 'AREIT',
          stockPrice: 33.5,
          earningsPerShareBasic: 1.91
        },
        {
          name: 'A Brown Company Inc',
          sector: Sector.FINANCIALS,
          stockCode: 'BRN',
          stockPrice: 0.73,
          earningsPerShareBasic: 0.27
        }
      ]
      ;
    
      const companiesWithPERatios = getCompanyPERatios(sampleCompanies);
      const selectedCompanies = useAppSelector((state) => state.companyState.selectedCompanies);
      const averageSectorPE = useAppSelector((state) => state.companyState.averagePERatio);
      const dispatch = useAppDispatch();
      dispatch(updateAveragePERatio(getAverageSectorPE(companiesWithPERatios)));
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
                data={companiesWithPERatios}
                />
            </Grid>
            <Grid xs={5}>
                <FairValueTable
                title={"Fair Value Table"}
                subtitle={`Average Sector PE: ${averageSectorPE.toFixed(2)}`}
                headers={["Stock", "Price", "EPS (Basic)", "Fair Value"]}
                data={getCompanyFairValues(selectedCompanies)}
                />
            </Grid>
            {selectedCompanies.length >= 3 && 
              <Grid xs={12}>
                <RatiosTable companies={getCompanyPERatios(selectedCompanies)}/>
              </Grid>
            }
    </Grid>
    );
}

export default FundamentalyAnalysisDashboard;
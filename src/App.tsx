import React from 'react';
import './App.css';
import CompaniesTable from './components/CompaniesTable';
import RatiosTable from './components/RatiosTable';
import { listOfCompaniesHeaders } from './utils/constants';
import Company from './types/company';
import Sector from './enums/Sector';
import { getAverageSectorPE, getCompanyPERatios } from './utils/formulas';
import FairValueTable from './components/FairValueTable';

function App() {
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
  
  return (
    <div className="App">
        <CompaniesTable
          title="FINANCIALS"
          subtitle={`Average Sector PE: ${getAverageSectorPE((companiesWithPERatios)).toString()}`}
          headers={listOfCompaniesHeaders} 
          data={companiesWithPERatios}
        />
      <RatiosTable companies={sampleCompanies.slice(0,5)}/>
      <FairValueTable
        title={"Fair Value Table"}
        subtitle={`Average Sector PE: ${getAverageSectorPE(companiesWithPERatios).toString()}`}
        headers={["Stock", "Price", "EPS (Basic)", "Fair Value"]}
        data={[]}
      />
    </div>
  );
}

export default App;

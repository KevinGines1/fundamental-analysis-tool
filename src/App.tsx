import './App.css';
import './index.css';
import React from 'react';
import FundamentalyAnalysisDashboard from './pages/FundamentalAnalysisDashboard';
import AppInfoBar from './components/AppInfoBar';


function App() {
  
  return (
    <div className="App">
      <AppInfoBar />
      <FundamentalyAnalysisDashboard />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import FundamentalyAnalysisDashboard from './pages/FundamentalAnalysisDashboard';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [open, setOpen] = useState(false);
  
  return (

    // TODO: averageSectorPE should be retrieved in each component
    // TODO: ^ and not passed down fr parent component
    // TODO: upload company info from excel sheet feature
    // TODO: clean up ratios table -- NaN are showing
  
    <div className="App">
      <AppBar position={"static"}>
        <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Fundamental Analysis Tool
            </Typography>
        </Toolbar>
      </AppBar>
      <br/>
      <FundamentalyAnalysisDashboard />
    </div>
  );
}

export default App;

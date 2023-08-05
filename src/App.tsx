import React, { useState } from 'react';
import './App.css';
import FundamentalyAnalysisDashboard from './pages/FundamentalAnalysisDashboard';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LeftPanel from './components/LeftPanel';

function App() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="App">
      <AppBar position={"static"}>
        <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <LeftPanel open={open} onClose={(): void => setOpen(false)} />
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

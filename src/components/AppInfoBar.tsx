import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import LeftPanel from "./LeftPanel";
import MenuIcon from '@mui/icons-material/Menu';
import "../styles/table.css";

function AppInfoBar() {
    const [open, setOpen] = useState(false);

    return(
    <AppBar position={"static"} sx={{ mb: 2, background: "rgba(39, 45, 53, 1)"}}>
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
            <Typography className={"appName"} variant="h6" sx={{ flexGrow: 1, fontFamily: "Montserrat, open-sans" }}>
              Fundamental Analysis Tool
            </Typography>
        </Toolbar>
    </AppBar>
    );
}

export default AppInfoBar;
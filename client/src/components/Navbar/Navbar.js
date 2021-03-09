import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const Navbar = () => {

  return(
    <>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <MenuIcon/>
          <Typography variant="h6">
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export { Navbar }

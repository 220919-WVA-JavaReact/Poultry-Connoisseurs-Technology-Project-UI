import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import EggIcon from "@mui/icons-material/Egg";
import SendIcon from "@mui/icons-material/Send";
import {Link} from 'react-router-dom';

const Navbar = () => {
return (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <EggIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Egg
        </Typography>

        <EggIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>

        <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
          <Button variant="contained" color="secondary" endIcon={<SendIcon />}>
            <Link to="/login" style={{color:'white', textDecoration:'none'}} >Login</Link>
          </Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
};

export default Navbar;

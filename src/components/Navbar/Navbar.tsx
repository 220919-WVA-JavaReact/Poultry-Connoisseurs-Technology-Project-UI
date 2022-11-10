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
import { ILoginProps, User } from "../../models/user";
import { Role } from "../../models/role";

//get props { user, setUser }
const Navbar = (props: ILoginProps) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* EggIcon - from material ui icons */}
          <Box sx={{display: "flex", flexGrow: 0, marginRight:"auto", alignItems:"center"}}>
            <EggIcon fontSize='large' sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
                fontSize:"2rem"
              }}
            >
              Egg
            </Typography>
          </Box>
              {/* The 'login' button below checks if there is a user signed in or not. If a user isn't 
              signed in, it will display a button with login text and when clicked will navigate to the login page.
              If there is a user logged in, a log out button appears instead, and will remove theuser from the state if clicked. */}
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            {!props.user ? (
              <Button
                variant="contained"
                color="secondary"
                endIcon={<SendIcon />}
              >
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => props.setUser(undefined)}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

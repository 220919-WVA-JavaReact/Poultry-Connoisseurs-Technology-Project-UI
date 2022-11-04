import React, { SyntheticEvent, useState } from 'react'
import { IUser, ILoginProps } from "../../models/user";
import {Navigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



const Login = (props: ILoginProps ) => {

    const [signIn, setSignIn] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [confPassword, setConfPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');


    const updateUsername = (e: SyntheticEvent )=> {
        console.log(`previous: ${username}`);
        setUsername((e.target as HTMLInputElement).value);
        console.log(`updated: ${username}`)
    }
    const updatePassword = (e: SyntheticEvent )=> {
        console.log(`previous: ${password}`);
        setPassword((e.target as HTMLInputElement).value);
        console.log(`updated: ${password}`)
    }
    const updateFirstName = (e: SyntheticEvent) => {
      console.log(`previous: ${username}`);
      setFirstName((e.target as HTMLInputElement).value);
      console.log(`updated: ${username}`);
    };
    const updateLastName = (e: SyntheticEvent) => {
      console.log(`previous: ${password}`);
      setLastName((e.target as HTMLInputElement).value);
      console.log(`updated: ${password}`);
    };
    const updateConfPassword = (e: SyntheticEvent) => {
      console.log(`previous: ${password}`);
      setConfPassword((e.target as HTMLInputElement).value);
      console.log(`updated: ${password}`);
    };
    const login = async (e: SyntheticEvent ) => {
        e.preventDefault();
        console.log(`username: ${username} | password: ${password} || ${props.user}`)
        if(!username || !password || !username.trim() || !password.trim()){
            setErrorMessage('Must enter a valid username and password');
        } else {
            if(signIn){
            console.log(`logging in now! Username ${username} Password: ${password}`);
            setErrorMessage('logging in now!');
            try {
                let response = await fetch(`http://localhost:8080/auth`, {
                  //   -- where we put query link
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username,
                    password,
                  }),
                });
            if(response.status === 200){
                let data = await response.json()
                console.log(data)
                props.setUser(data);
            } else{
                setErrorMessage(`Could not validate credentials : ERROR CODE ${response.status}`);
            }
            } 
            
            catch (error) {
                setErrorMessage('Unexpected error contacting server.');
            }
        } else {
            console.log(`Signing up for your account now! ${password} = ${confPassword} ? `)
            let response = await fetch(`http://localhost:8080/users`, {
                  //   -- where we put query link
                  method: "POST",
                  headers: {
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                      firstName, lastName, username,password
                  })
                });
                let data = await response.json();
                console.log(data);
        }
        }
    }

  return props.user ? (
    <Navigate to="/" />
  ) : (
    <>
      <h4>Log in to egg</h4>
      <div>
        <input
          type="text"
          id="login-username"
          placeholder="Enter your username"
          onChange={updateUsername}
        />
        <input
          type="password"
          id="login-password"
          placeholder="Enter your password"
          onChange={updatePassword}
        />
        <button id="login-button" onClick={login}>
          Login
        </button>
      </div>
      <div>
        <p>{errorMessage}</p>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign {signIn ? "In" : "Up"}
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={updateUsername}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              onChange={updatePassword}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {signIn ? (
              ""
            ) : (
              <>
                <TextField
                  onChange={updateFirstName}
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="Firstname"
                  name="firstname"
                  autoFocus
                />
                <TextField
                  onChange={updateLastName}
                  margin="normal"
                  required
                  fullWidth
                  name="lastname"
                  label="Lastname"
                  type="lastname"
                  id="lastname"
                />
                <TextField
                  onChange={updateConfPassword}
                  margin="normal"
                  required
                  fullWidth
                  name="confpassword"
                  label="Confirm Password"
                  type="password"
                  id="confpassword"
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign {signIn ? "In" : "Up"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setSignIn(!signIn);
                  }}
                >
                  {!signIn ? "Already" : "Don't"} have an account? Sign{" "}
                  {!signIn ? "In" : "Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login
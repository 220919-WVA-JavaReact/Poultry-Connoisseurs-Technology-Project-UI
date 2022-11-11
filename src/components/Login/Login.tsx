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
import { Card } from '@mui/material';


//get props { user, setUser }
const Login = (props: ILoginProps ) => {
    //signIn state used to dynamically switch page look from 'sign in' to 'sign up'(register)
    const [signIn, setSignIn] = useState(true);

    //These fields are for the input components. TODO: refactor them to use 1 useState with an object, using ... syntax to update.
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState("");

    //Message displayed under the signin functionality. Dynamically updates to let user know what's going on.
    const [errorMessage, setErrorMessage] = useState('');

    //functions to update state fields for the form inputs. TODO: refactor to use 1 function and dynamically check field.
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


    //Login function. Checks to see if user is in 'sign in' or 'sign up' mode, sends corresponding http request to backend.
    const login = async (e: SyntheticEvent ) => {
        e.preventDefault();
        console.log(`username: ${username} | password: ${password} || ${props.user}`)

        //Check to see if username/password fields are properly filled out.
        if(!username || !password || !username.trim() || !password.trim()){
            setErrorMessage('Must enter a valid username and password');
        } else {
            
            //Check to see if user is in 'sign in' or 'sign up' mode.
            if(signIn){
            console.log(`logging in now! Username ${username} Password: ${password}`);

            //Updates message to show that login is in progress.
            setErrorMessage('logging in now!');
            try {
                let response = await fetch(`http://localhost:8080/auth`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username,
                    password,
                  }),
                });

                //Functionality to run if process succeeds. Will set the user using the recieved UserDTO from backend.
            if(response.status === 200){
                let data = await response.json()
                console.log(data)
                props.setUser(data);
            } else{

                //Runs if sign-in fails for any reason.
                setErrorMessage(`Could not validate credentials : ERROR CODE ${response.status}`);
            }
            } 
            
            catch (error) {
                //Runs if we can't connect to server.
                setErrorMessage('Unexpected error contacting server.');
            }
        } else {

            //Sign up functionality, runs if 'signIn' state is false.
            console.log(`Signing up for your account now! ${password} = ${confPassword} ? `)
            let response = await fetch(`http://localhost:8080/users`, {
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
                //TODO: automatically sign in user upon registration. Only recieves confirmation of sign up as of now.
        }
        }
    }
//Check if user exists - if so, redirect to home component. When sign in succeeds, will automatically redirect to home because user state is updated.
  return props.user ? (
    <Navigate to="/profile" />
  ) : (
    <>
      {/* Dynamically renders component using ternary operator to check if 'signIn' state is true or false. */}

      <div>
        <p>{errorMessage}</p>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card style={{ backgroundColor: "#a0d0ff", padding: "1.5rem" }}>
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
              <Grid container justifyContent='center'>
                
                <Grid item>
                  <Button
                  
                    variant="contained"
                    color="secondary"
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
        </Card>
      </Container>
    </>
  );
}

export default Login
import React, { SyntheticEvent, useState } from 'react'
import { IUser } from '../../models/user';
import {Navigate} from 'react-router-dom';

interface ILoginProps{
    user: IUser | undefined,
    setUser: (nextUser: IUser) => void
}


const Login = (props: ILoginProps ) => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const login = async (e: SyntheticEvent ) => {
        console.log(`username: ${username} | password: ${password}`)
        if(!username || !password || !username.trim() || !password.trim()){
            setErrorMessage('Must enter a valid username and password');
        } else {
            console.log(`logging in now! Username ${username} Password: ${password}`);
            setErrorMessage('logging in now!');
            try {
                let response = await fetch(``, {//  http://localhost:8080/egg/auth -- where we put query link
                method: 'GET',
                // headers: {
                //     'Content-Type':'JSON'
                // } //property to work with java http sessions ---- NEED TO SET UP BACKEND TO PROPERLY WORK WITH CORS. WILL NOT WORK AT ALL UNTIL DONE MESSING WITH BACKEND.
                // body: JSON.stringify({
                //     username,password
                // })
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
        }
    }

  return (
    props.user ?
    <Navigate to="/dashboard" />
    :

    <>
    <h4>Log in to egg</h4>
    <div>
        <input type="text" id="login-username" placeholder="Enter your username" onChange={updateUsername} />
        <input type="password" id="login-password" placeholder="Enter your password" onChange={updatePassword} />
        <button id="login-button" onClick={login}>Login</button>
    </div>
    <div>
        <p>{errorMessage}</p>
    </div>
    </>
  )
}

export default Login
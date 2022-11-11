import { IUser } from "../../models/user";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";


interface IUserProps{
    user: IUser | undefined
}





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  //in react router dom, there is a way to use the route to change the functionality
  //get the route from react router dom
  // send a fetch with that id
  //receiving info from you to the route
  //need to set up a route in the app, to catch that.

function MoviePage (props : IUserProps) {
    

    const { id } = useParams()
    return (
        <div>
            <Stack spacing={2}>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
            </Stack>
            <p>{id}</p>
        </div>
    )
}

export default MoviePage;
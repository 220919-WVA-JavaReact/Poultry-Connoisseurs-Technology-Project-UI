import React from 'react'
import { IUser } from '../../models/user';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface IUserProps{
    user: IUser | undefined
}

const Dashboard = (props: IUserProps ) => {
    //Dashboard component - leftover component from an example. Could possibly convert it to movies list component?

  return (
    <Stack direction="row" spacing={1}>{props.user ? Object.keys(props.user).filter(x=> x=='Search').map(x=> { 
        const keys = Object.keys(x);
        return keys.map(x => <Chip key={x}></Chip>) }) : ''}</Stack>
  )
  
}

/*
OVERALL - Add styles
As a user when I load the homepage it should display some movies
    - shows title, picture and genre? #this info comes from database
        /movies endpoint 
as a user i should be able to click on a movie and visit its page.
    - Info about movie
        - THIS is where we get a lot of info from the api, not database
            - /movies/id endpoint
    - reviews
        - /reviews/movieid endpoint
As a user I should be able to leave a review
    - you do it on the corresponding movie page, need backend as well
        - /reviews (POST) endpoint
As a user I can see my own or other's profile pages
    - click somewhere to visit the page
        - /users/id (GET) 
            - user info
            - reviews by that user
    - their name
    - on the page you see their old reviews (ordered by recency ?)
    - (eventually watched list?)
As a user I can logout
    - api logout method, invalidates jwt which we havent learned how to use
Decide on how approximately to implement admin features
*/

export default Dashboard
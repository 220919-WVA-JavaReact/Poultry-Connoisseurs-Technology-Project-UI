import { IUser } from "../../models/user";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import { Movie } from "../../models/movie";
import { useEffect, useState } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { Reviews } from "../../models/reviews";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import "./MoviePage.css";


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

    const [movie, setMovie] = useState<Movie | undefined>()
    const { id } = useParams()
    const [reviews, setReviews] = useState<Reviews[] | undefined>()

    useEffect(() => {

        const fetchData = async ()=>{
            let response = await fetch(`http://localhost:8080/movies/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status === 200) {
                let data = await response.json();
                console.log(data);
                setMovie(data);
        }   else {
            console.log(
                `Could not find movie : ERROR CODE ${response.status}`
            );
        }
    }
    fetchData();     

        const fetchData2 = async ()=>{
            let response = await fetch(`http://localhost:8080/reviews/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status === 200) {
                let data = await response.json();
                console.log(data);
                setReviews(data);
            } else {
                console.log(
                    `Could not find reviews : ERROR CODE ${response.status}`
                );
            }
        }
        fetchData2();
    },[])
                
            


    return (
        <div>
            <Stack spacing={2}>
                <Item>{movie?.title}</Item>
                <Item>submit review</Item>
                <Item>
                        {reviews?.map(x => 
                        (<div key={x.id+1}>
                        <div className="cont1">
                            <div className="avatar"><Avatar sx={{ bgcolor: deepPurple[500] }}>{x.authorUsername.charAt(0).toUpperCase()}</Avatar></div>
                                <div className="userReview">
                                    {x.authorUsername}
                                    <p>{x.title}</p>
                                    <p>{x.summary}</p>
                                    <hr/>
                                </div>
                                
                        </div>
                    
                
                    
                    </div>))}
                </Item>
            </Stack>
            <p>{id}</p>
            <p></p>
        </div>
    )
}

export default MoviePage;
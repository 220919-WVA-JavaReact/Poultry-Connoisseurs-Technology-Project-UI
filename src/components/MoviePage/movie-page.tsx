import "./MoviePage.css";
import { ILoginProps, IUser, User } from "../../models/user";
import { Movie } from "../../models/movie";
import { Reviews } from "../../models/reviews";
import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Card, CardContent, CardMedia, Checkbox, Typography } from "@mui/material";
import { deepOrange, deepPurple, pink } from '@mui/material/colors';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import SuperheroImage from "../../assets/superheroes-at-the-movies-min.jpeg";
import AddReview from "../AddReview/addreview";

interface IUserProps {
    user: IUser | undefined
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function MoviePage(props: ILoginProps) {

    let navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const [movie, setMovie] = useState<Movie | undefined>()
    const { id } = useParams()
    const [reviews, setReviews] = useState<Reviews[] | undefined>()

    useEffect(() => {
        fetchData();
        fetchData2();
    }, [])

    useEffect(() => {
        fetchData3();
    }, [movie, reviews])

    const fetchData = async () => {
        let response = await fetch(
          `${process.env.REACT_APP_API_URL}/movies/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            setMovie(data);
        } else {
            console.log(
                `Could not find movie : ERROR CODE ${response.status}`
            );
        }
    }

    const fetchData2 = async () => {
        let response = await fetch(
          `${process.env.REACT_APP_API_URL}/reviews/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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

    const fetchData3 = async () => {
        if (props.user) {
            let response = await fetch(
              `${process.env.REACT_APP_API_URL}/users/${props.user?.id}/movies`,
              {
                method: "POST",
                body: JSON.stringify(movie),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
                let data = await response.json();
                console.log(data);
                setChecked(data);
            } else {
                console.log(
                    response
                )
            }
        } else {
            console.log('not logged in')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (props.user == undefined) {
            navigate("/login");
        } else {
            /*check if they have in favorites before this func */
            const toggleFavorite = async () => {
                let response = await fetch(
                  `${process.env.REACT_APP_API_URL}/users/${props.user?.id}/watched`,
                  {
                    method: "POST",
                    body: JSON.stringify(movie),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    setChecked(data);
                } else {
                    console.log(
                        `Could not update Watched status : ERROR CODE ${response.status}`
                    )
                }
            }
            toggleFavorite();
        }
    };

    return (
        <div className="body">
            <Stack spacing={2}>
                <Item style={{ padding: 0 }}>
                    <Box sx={{ bgcolor: 'text.primary' }}>
                        <div className="movieHeader">
                            <Card id="moviePicture" sx={{ maxWidth: 385 }} >
                                <CardMedia
                                    component="img"
                                    alt="BadMovie"
                                    height="140"
                                    style={{ backgroundSize: "cover" }}
                                    image={SuperheroImage}
                                    title="BadMovie"
                                />
                            </Card>
                            <div className="movieInformation" style={{ width: "60%" }}>
                                <p className="movieTitle">{movie?.title}</p>
                                <p>Runtime: {movie?.runtime} minutes Rating: {movie?.stars}/10</p>
                                <p>Add to Favorites? <Checkbox {...label} checked={checked} onChange={handleChange} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ color: pink[800], '&.Mui-checked': { color: pink[600], } }} /></p>
                                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Box>
                </Item>
                <Item>
                    {props.user!=undefined && movie!=undefined? (<AddReview
                        currentUser={props.user}
                        getReviews={setReviews} 
                        movieId={movie?.id} 
                        movie={movie}
                        />):''}
                            </Item>
                <Box sx={{ bgcolor: 'text.primary' }}>
                    <Item style={{ padding: 0 }}>
                        <Box sx={{ bgcolor: 'text.primary' }}>
                            <h3 className="titleReview"><b>Reviews:</b></h3>
                            <hr />
                            {reviews?.map(x =>
                                (<div key={x.id + 1}>
                                    <div className="cont1">
                                        <div className="avatar"><Avatar sx={{ bgcolor: deepPurple[500] }}>{x.authorUsername.charAt(0).toUpperCase()}</Avatar></div>
                                        <div className="divider"></div>
                                        <div className="userReview" style={{ width: "60%" }}>
                                            <h5>Review by: <b>{x.authorUsername}</b></h5>
                                            <h3>{x.title}</h3>
                                            <Typography>{x.summary}</Typography>
                                            <hr />
                                        </div>
                                    </div>
                                </div>)
                            )}
                        </Box>
                    </Item>
                </Box>
            </Stack>
            <p></p>
        </div>
    )
}

export default MoviePage;
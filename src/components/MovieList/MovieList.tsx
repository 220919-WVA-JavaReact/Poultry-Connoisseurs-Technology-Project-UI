import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { IMovieProps } from "../../models/movie";
import SuperheroImage from "../../assets/superheroes-at-the-movies-min.jpeg";
import {Link, useNavigate} from 'react-router-dom';

const MovieList = (props: IMovieProps) => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
    >{/* 
                  <Link to={`/movies/${x.id}`}></Link> */}
      {props.movies
        ? props.movies.map((x) => (
            <Grid item xs={6} key={x.id + 1}>
              <Card>
                <CardActionArea onClick={()=>navigate(`/movies/${x.id}`)}>
                  <CardMedia
                    component="img"
                    alt="Movie image"
                    height="210"
                    image={`/assets/${x.id}.jpg`}
                    title="Movie image"
                  />
                  <CardContent style={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    padding: '8px'}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{marginRight:'16px'}}>
                      {x.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Rating: {x.rating}
                    </Typography>
                  </CardContent>
                  
                </CardActionArea>
              </Card>
            </Grid>
          ))
        : ""}
    </Grid>
  );
};

export default MovieList;

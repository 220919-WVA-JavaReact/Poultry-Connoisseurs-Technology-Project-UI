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
import {Link} from 'react-router-dom';

const MovieList = (props: IMovieProps) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
    >
      {props.movies
        ? props.movies.map((x) => (
            <Grid item xs={6} key={x.id + 1}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={SuperheroImage}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
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
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to={`/movies/${x.id}`}>Visit {x.title}</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        : ""}
    </Grid>
  );
};

export default MovieList;

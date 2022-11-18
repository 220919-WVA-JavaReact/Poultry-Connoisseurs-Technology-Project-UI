import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Movie } from './WatchListMain';
import { makeStyles } from '@material-ui/core/styles';
import SuperheroPic from '../../assets/superheroes-at-the-movies-min.jpeg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: 320
    },
    media: {
        height: 150
    }
});

type Props = {
    movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
    const classes = useStyles();

    return (
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={`/assets/${movie.id}.jpg`} />
        <CardContent>
          <Link
            to={`../movies/${movie.id}`}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <Typography gutterBottom variant="h5">
              {movie.title}
            </Typography>
          </Link>
          <Typography gutterBottom color="textSecondary">
            Runtime: {movie.runtime}
            <br />
            Stars: {movie.stars}
            <br />
            Rating: {movie.rating}
          </Typography>
        </CardContent>
      </Card>
    );
};

export default MovieCard;
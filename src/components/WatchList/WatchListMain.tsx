import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slider from './WatchListSlider';
import MovieCard from './WatchListMovieCard';
import SuperheroImage from '../../assets/superheroes-at-the-movies-min.jpeg';
import { UserProfile } from '../../models/user';

interface ProfileUserProps{
  user: UserProfile | undefined;
  fetchData: Function;
}

const SliderProps = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500 // Transition when flipping pages
};

// Types
export type Movie = {
  id: number;
  title: string;
  runtime: number;
  stars: string;
  rating: number;
};

const WatchListMain = (props: ProfileUserProps) => {
  console.log(props);
  const [data, setData] = useState<Movie[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeMovie, setActiveMovie] = useState<Movie>(
    {} as Movie
  );

  const handleDialogOpen = (movie: Movie) => {
    setIsDialogOpen(true);
    setActiveMovie(movie);
  };

  const getData = async () => {
    if(props.user != undefined) {
      console.log(props.user);
      console.log(props.user.id)
      const data = await (
        fetch(`http://localhost:8080/users/${props.user?.id}/watched`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }})
      )
      const x = await data.json();
      console.log("Data: ", data);
      console.log("RESPONSE: ", x);
      setData(x);
    } else {
      console.log(props.user);
    }
  };

  useEffect(() => {
    

    getData();
  }, []);

  if (!data) {
    return ( <div>Loading ...</div> )
  } else {

    return (
      <>
        <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
          <MovieCard movie={activeMovie} />
        </Dialog>

        <Slider {...SliderProps}>
          {data.map(movie => (
            <div key={movie.id} onClick={() => handleDialogOpen(movie)}>
              <img src={SuperheroImage} alt='Superheroes At The Movies' />
            </div>
          ))}
        </Slider>
      </>
    );
  }
};

export default WatchListMain;
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
// Components
import Slider from './WatchListSlider';
import MovieCard from './WatchListMovieCard';
import SuperheroImage from '../../assets/superheroes-at-the-movies-min.jpeg';

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

const WatchListMain: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeMovie, setActiveMovie] = useState<Movie>(
    {} as Movie
  );

  const handleDialogOpen = (movie: Movie) => {
    setIsDialogOpen(true);
    setActiveMovie(movie);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await (
        await fetch(`${process.env.REACT_APP_OMDB_API_URL}/?s=chicken${process.env.REACT_APP_OMDB_API_KEY}`)
      ).json();
      setData(data);
    };

    getData();
  }, []);

  console.log(data);

  if (data.length < 1) return <div>Loading ...</div>;

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
};

export default WatchListMain;
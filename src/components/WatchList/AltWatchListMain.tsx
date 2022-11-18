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
    const [data, setData] = useState<Movie[]>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeMovie, setActiveMovie] = useState<Movie>(
        {} as Movie
    );

    const handleDialogOpen = (movie: Movie) => {
        setIsDialogOpen(true);
        setActiveMovie(movie);
    };

    console.log(props.user?.id);

    const getData = async () => {
        if(props.user != undefined) {
            const data = await(
              fetch(
                `${process.env.REACT_APP_API_URL}/users/${props.user.id}/watched`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
              )
            );
            const x = await data.json();
            console.log(x);
            setData(x);
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
              {data.map((movie) => (
                <div key={movie.id} onClick={() => handleDialogOpen(movie)}>
                  <img
                    src={`/assets/${movie.id}.jpg`}
                    alt="Superheroes At The Movies"
                  />
                  <p style={{ color: "whitesmoke" }}>{movie.title}</p>
                </div>
              ))}
            </Slider>
          </>
        );
    }
};

export default WatchListMain;
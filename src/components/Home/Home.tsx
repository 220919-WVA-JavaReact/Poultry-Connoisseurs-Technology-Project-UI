import { Container, Divider } from '@material-ui/core';
import { Typography } from '@mui/material';
import React from 'react'
import { IinfoProps } from '../../models/infoprops';
import MovieList from '../MovieList/MovieList';

const Home = ( props: IinfoProps ) => {
  React.useEffect(()=>{
    
    const fetchData = async ()=>{
      let response = await fetch(`${process.env.REACT_APP_API_URL}/movies/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        let data = await response.json();
        console.log(data);
        props.setMovies(data);
      } else {
        //Runs if sign-in fails for any reason.
        console.log(
          `Could not validate credentials : ERROR CODE ${response.status}`
        );
      }
    }
    fetchData();

  },[])
  
  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: "#bff1ff", minHeight: "100vh" }}
    >
      {/* Check to see if user is signed in or not, will eventually get rid of it once we have UI more developed. */}
      <Typography
        variant="h4"
        style={{
          maxWidth: "50%",
          margin: "auto",
          fontWeight: "600",
          fontFamily: "system-ui",
        }}
      >
        Eggcellent Reviews
      </Typography>

      {/* Here is where SEARCHBAR and MOVIES components would go - Perhaps use dashboard as MOVIES */}
      <Typography
        variant="h5"
        style={{
          maxWidth: "50%",
          margin: "8px auto 24px auto",
          fontWeight: "600",
          fontFamily: "system-ui",
        }}
      >
        Your one-stop-shop for checking out new movies and reading/writing reviews for them
      </Typography>
      <Divider style={{height:'3px', marginBottom:'24px'}}/>
      <Typography variant='h6' style={{textDecoration:'underline', marginBottom:'16px'}}>Latest movies</Typography>
      <MovieList movies={props.movies} setMovies={props.setMovies} />
    </Container>
  );
};

export default Home
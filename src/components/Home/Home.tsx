import { Container } from '@material-ui/core';
import { Typography } from '@mui/material';
import React from 'react'
import { IinfoProps } from '../../models/infoprops';
import MovieList from '../MovieList/MovieList';
const Home = ( props: IinfoProps ) => {
  React.useEffect(()=>{
    
    const fetchData = async ()=>{
      let response = await fetch(`http://localhost:8080/movies/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
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
      <p style={{ marginTop: "0"}}>
        {props.user
          ? `${props.user.username}: ${props.user.role}`
          : "Not logged in =("}
      </p>

      {/* Here is where SEARCHBAR and MOVIES components would go - Perhaps use dashboard as MOVIES */}
      <h2>LATEST BESTEST AMAZINGEST MOVIES</h2>
      <MovieList movies={props.movies} setMovies={props.setMovies}/>
    </Container>
  );
};

export default Home
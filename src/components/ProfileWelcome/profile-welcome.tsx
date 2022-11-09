import React from 'react';
import { IUser } from '../../models/user';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import SuperheroImage from '../../assets/superheroes-at-the-movies-min.jpeg';

interface IUserProps{
    user: IUser | undefined
}

function ProfileWelcome(props : IUserProps) {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${SuperheroImage})`,
        maxWidth: '75%',
        height: '450px',
        margin: 'auto'
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={SuperheroImage} alt="Marvel Superheroes at the Movies" />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6} style={{ margin: 'auto'}}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Welcome {props.user?.username}!
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Lorem ipsum dolor sit amet
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProfileWelcome;
import { UserProfile } from '../../models/user';
import Paper from '@mui/material/Paper';
import SuperheroImage from '../../assets/superheroes-at-the-movies-min.jpeg';

interface ProfileUserProps{
    user: UserProfile | undefined;
}

function ProfileWelcome(props : ProfileUserProps) {
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
        maxWidth: '100%',
        height: '700px',
        margin: 'auto'
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={SuperheroImage} alt="Marvel Superheroes at the Movies" />}
    </Paper>
  );
}

export default ProfileWelcome;
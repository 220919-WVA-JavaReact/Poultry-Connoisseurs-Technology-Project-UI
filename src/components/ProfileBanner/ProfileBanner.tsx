import { Box, Grid, Typography } from '@mui/material';
import { UserProfile } from '../../models/user';

interface ProfileUserProps{
    user: UserProfile | undefined;
}

function ProfileBanner(props: ProfileUserProps) {
    return (
        <>
            <Grid container>
                <Grid item sm={2} md={8} lg={10} style={{ margin: '0 13%' }}>
                    <Box
                        sx={{
                        p: { xs: 8, md: 10, lg: 12 },
                        backgroundColor: '#818589'
                        }}
                    >
                        <Typography component="h1" variant="h3" gutterBottom>
                            Welcome {props.user?.first} {props.user?.last}!
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            Lorem ipsum dolor sit amet
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </> 
    )
}

export default ProfileBanner;
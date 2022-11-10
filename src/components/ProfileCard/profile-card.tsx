import React from 'react';
import { IUser } from "../../models/user";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


interface IUserProps{
    user: IUser | undefined
}

function ProfileCard(props: IUserProps) {
    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#" style={{margin:"15px auto", maxWidth:"800px"}}>
                <Card sx={{ display: 'flex'}}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                        {props.user?.username}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                        Review description should be inserted here.
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ maxWidth:"500px", display: { xs: 'none', sm: 'block' } }}
                        //image={SuperheroImage}
                        alt="Superheros at the movies"
                        style={{}}
                    />
                </Card>
            </CardActionArea>
    </Grid>
    )
  
}
  export default ProfileCard;
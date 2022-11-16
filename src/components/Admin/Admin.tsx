import React from 'react'
import { Navigate } from 'react-router-dom'
import { ILoginProps, User } from '../../models/user'
import { Container } from "@material-ui/core";
import { ButtonGroup, Button, Grid, Card, Typography, CardContent, CardActions, CardActionArea } from "@mui/material";
import { resolve } from 'path/posix';

const Admin = (props: ILoginProps) => {
    const [users, setUsers]: any[] = React.useState();
    const [reviews, setReviews] = React.useState();
    const [mode, setMode] = React.useState('reviews');

    const fetchReviewData = async () => {
        if(props.user){
      const res = await fetch(`http://localhost:8080/reviews`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${props.user.role}`
        },
      });
      if (res.status === 200) {
        let data = await res.json();
        console.log(data);
        setMode('reviews');
        setReviews(data);
      } else {
        console.log(`Could not find reviews: ERROR CODE ${res.status}`);
      }
    } else{
        console.log(`Could not fetch reviews: UNAUTHORIZED`);
    }
    };

    const fetchUserData = async () => {
        if (props.user) {
          const res = await fetch(`http://localhost:8080/users`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": `${props.user.role}`,
            },
          });
          if (res.status === 200) {
            let data = await res.json();
            console.log(data);
            setMode("users");
            setUsers(data);
          } else {
            console.log(`Could not find users: ERROR CODE ${res.status}`);
          }
        } else {
          console.log(`Could not fetch reviews: UNAUTHORIZED`);
        }
    };

    React.useEffect(()=>{
        fetchReviewData();
    },[])


  return !props.user ? (
    <Navigate to="/" />
  ) : (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: "#bff1ff",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <ButtonGroup
        style={{
          left: "0",
          position: "absolute",
          marginLeft: ".75rem",
          marginTop: ".75rem",
        }}
        variant="contained"
        color="secondary"
        aria-label="contained primary button group"
      >
        <Button
          style={{ color: "white", textDecoration: "none" }}
          onClick={(e) => {
            if (mode !== "reviews") {
              fetchReviewData();
            } else {
              e.preventDefault();
            }
          }}
        >
          Reviews
        </Button>
        <Button
          style={{ color: "white", textDecoration: "none" }}
          onClick={(e) => {
            if (mode !== "users") {
              fetchUserData();
            } else {
              e.preventDefault();
            }
          }}
        >
          Users
        </Button>
      </ButtonGroup>
      {/* Here goes where you put the data that you get. */}
      <br />

      {mode === "users" ? "table of user info" : "table of review info"}
      {/* map each user to a component which includes a demote to egg button, map each review to a component which includes a delete review button. */}
      {(mode === "users" && users !== undefined) ? (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}
        >
          {users.map((x: User) => (
            <Grid item xs={12} key={x.id + 1}>
              <Card>
                <CardActionArea>
                  
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      User {x.id}: {x.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {x.username}'s role: {x.role}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {x.role === 'CHICK' ? (
                  <div>
                    button to demote to egg
                    </div>) : x.role === 'EGG' ? (
                    <div>
                        button to unban from egg
                        </div>) : ''}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>reviewcontainer</div>
      )}
    </Container>
  );
  
}

export default Admin
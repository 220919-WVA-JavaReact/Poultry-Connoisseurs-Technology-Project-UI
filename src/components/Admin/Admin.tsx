import React from 'react'
import { Navigate } from 'react-router-dom'
import { ILoginProps, User } from '../../models/user'
import { Container } from "@material-ui/core";
import { ButtonGroup, Button, Grid, Card, Typography, CardContent, CardActions, CardActionArea, CardHeader } from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import "./Admin.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { BigReview, Reviews } from '../../models/reviews';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../models/role';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spaceBetweenButtons: {
      marginRight: "auto",
    },
    consistentWidth: {
      minWidth: "50%",
    },
    paperFlex: {
      display: "flex",
      flexDirection: "column",
      backgroundColor:'#eee',
    },
    gridContainer: {
      marginTop: 0,
      paddingTop:48
    },
    dataDivider: {
      marginTop: 24,
    },
    summaryText:{
      maxWidth: 'fit-content',
      textAlign: 'left',
      margin: '0px 8px 8px 16px',
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: "#7b1fa2",
    },
  })
);


const Admin = (props: ILoginProps) => {
    const classes = useStyles();
    const [users, setUsers]: any[] = React.useState(undefined);
    const [reviews, setReviews]: any[] = React.useState(undefined);
    const [mode, setMode]: any[] = React.useState(undefined);
    let navigate = useNavigate();

    const fetchReviewData = async () => {
        if(props.user){
      const res = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorization: `${props.user.role}`,
        },
      });
      if (res.status === 200) {
        let data = await res.json();
        console.log(data);
        setReviews(data);
        setMode("reviews");
      } else {
        console.log(`Could not find reviews: ERROR CODE ${res.status}`);
      }
    } else{
        console.log(`Could not fetch reviews: UNAUTHORIZED`);
    }
    };

    const fetchUserData = async () => {
        if (props.user) {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: `${props.user.role}`,
            },
          });
          if (res.status === 200) {
            let data = await res.json();
            console.log(data);
            setUsers(data);
            setMode("users");
          } else {
            console.log(`Could not find users: ERROR CODE ${res.status}`);
          }
        } else {
          console.log(`Could not fetch reviews: UNAUTHORIZED`);
        }
    };

    const deleteReview = async (id: string) => {
      if(props.user) {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/reviews/${id}`,
          {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: `${props.user.role}`,
            },
          }
        );
      if (res.status === 200) {
        let data = await res.json();
        console.log(data);
        setReviews(reviews.filter((x: BigReview) => x.id !== id));

    } else{
      console.log(`Could not delete review: UNAUTHORIZED`);
    }
  } else {
    console.log(`No reviews found for user`);
  }}
  const updateRole = async (x: User) => {
    if(props.user) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            authorization: `${props.user.role}`,
          },
          body: JSON.stringify(x),
        });
      if (res.status === 200) {
        let data = await res.json();
        console.log(data);
        
        setUsers(users.map((y: User) => (y.id === x.id) ? x : y));

    } else{
      console.log(`Could not update role: UNAUTHORIZED`);
    }
  } else {
    console.log(`Couldn't update role for user`);
  }
  }

    // React.useEffect(()=>{
    //     fetchReviewData();
    // },[])


  return !props.user ? (
    <Navigate to="/" />
  ) : (
    <Container
      maxWidth="md"
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

      {/* map each user to a component which includes a demote to egg button, map each review to a component which includes a delete review button. */}
      {mode === undefined ? (
        <div>
          <Typography variant="h5">Welcome to admin!</Typography>
          <Typography variant="body2">Press a button to get started.</Typography>
        </div>
      ) : mode === "users" && users !== undefined ? (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={3}
          className={classes.gridContainer}
        >
          {users.map((x: User) => (
            <Grid
              item
              xs={6}
              key={x.id + 1}
              className={classes.consistentWidth}
            >
              <Card className={classes.paperFlex}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="user name" className={classes.avatar}>
                      {x.username[0].toUpperCase()}
                    </Avatar>
                  }
                  title={`User ${x.id}:
                  ${
                    props.user && x.username === props.user.username
                      ? "You"
                      : x.username
                  }`}
                  subheader={`${
                    props.user && x.username === props.user.username
                      ? "Your"
                      : x.username + "'s"
                  } 
                  role: ${x.role}`}
                />
                <div style={{ display: "flex", width: "100%" }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    fullWidth={x.role !== "CHICK" && x.role !== "EGG"}
                    className={
                      x.role !== "CHICK" && x.role !== "EGG"
                        ? ""
                        : classes.spaceBetweenButtons
                    }
                  >
                    <Typography gutterBottom variant="body2">
                      Visit User Page
                    </Typography>
                  </Button>

                  {x.role === "CHICK" ? (
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        x.role = Role.EGG;
                        updateRole(x);
                      }}
                    >
                      Ban User
                    </Button>
                  ) : x.role === "EGG" ? (
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        x.role = Role.CHICK;
                        updateRole(x);
                      }}
                    >
                      Unban User
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : mode === "reviews" && reviews !== undefined ? (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={3}
          className={classes.gridContainer}
        >
          {reviews.map((x: BigReview) => (
            <Grid
              item
              xs={6}
              key={x.id + 1}
              className={classes.consistentWidth}
            >
              <Card className={classes.paperFlex}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="user name" className={classes.avatar}>
                      {x.authorUsername[0].toUpperCase()}
                    </Avatar>
                  }
                  title={`Review by User ${x.id}:
                  ${
                    props.user && x.authorUsername === props.user.username
                      ? "You"
                      : x.authorUsername
                  }`}
                  subheader={`
                  TITLE: ${x.title}`}
                />
                <Typography variant='body2' className={classes.summaryText}>REVIEW: {x.summary}</Typography>
                <div style={{ display: "flex", width: "100%" }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.spaceBetweenButtons}
                    onClick={() => deleteReview(x.id)}
                  >
                    <Typography gutterBottom variant="body2">
                      Delete Review
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => navigate(`../movies/${x.movieId}`)}
                  >
                    <Typography gutterBottom variant="body2">
                      Visit Movie Page
                    </Typography>
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        ""
      )}
    </Container>
  );
  
}

export default Admin
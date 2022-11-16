import React, {useEffect, useState } from 'react';
import { Container, Box, CssBaseline, Card, CardContent, CardMedia } from '@mui/material';
import { Movie } from '../../models/movie';
import { User } from '../../models/user';
import AddReview from '../AddReview/addreview';
import ReviewCard from '../ReviewCard/reviewcard';
import { AddCard } from '@mui/icons-material';

interface IReviewProps {
    id: number | string | undefined;
    currentUser: User;
    setCurrentUser(nextUser: User) : void;
    movie: Movie;
}

function Reviews(props: IReviewProps){
    const [reviews, setReviews] = useState([]);
    // const [authUser, setAuthUser] = useState<User>();
    
    async function getReviews(){
        const result = await fetch (
            `https://localhost:8080/reviews/movies/${props.id}}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    'Role' : `${props.currentUser?.role}`,
                    'Access-Control-Allow-Origin' : '*',
                },
            }
        );
        const data = await result.json();
        setReviews(Object.assign(data));
    }
    useEffect(() => {
        getReviews();
    }, []);
    
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
                    <Card>
                        <CardContent>
                            <AddReview
                                currentUser={props.currentUser}
                                movie_id={props.movie.id}
                                movie={props.movie}
                                getReviews={getReviews}
                            />
                            {reviews.map((review: any) => {
                                return (
                                    <ReviewCard
                                        user={review.user.username}
                                        title={review.title}
                                        summary={review.summary}
                                        key={review.review_id}
                                    />
                                );
                                    })}
                        </CardContent>
                    </Card>
            </Container>
        </React.Fragment>
    );
}
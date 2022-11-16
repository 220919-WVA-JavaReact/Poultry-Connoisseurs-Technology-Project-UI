import React, { useEffect, useState } from 'react';
import { Container, Box, Card, CardContent, CardMedia } from '@mui/material';
import { UserProfile } from '../../models/user';
import ReviewCard from '../ReviewCard/reviewcard';

interface ProfileUserProps{
    user: UserProfile | undefined;
}

function ProfileReviews(props: ProfileUserProps) {

    const [reviews, setReviews] = useState([]);
    // const [authUser, setAuthUser] = useState<User>();
    
    async function getReviews(){
        const result = await fetch (
            `https://localhost:8080/reviews/users/${props.user}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            }
        );
        const data = await result.json();
        setReviews(Object.assign(data));
    }
    useEffect(() => {
        getReviews();
    }, []);

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
                    <Card>
                        <CardContent>
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
        </>
    )
}

export default ProfileReviews;
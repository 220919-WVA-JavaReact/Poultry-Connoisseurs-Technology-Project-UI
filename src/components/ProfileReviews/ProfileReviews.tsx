import React, { useEffect, useState } from 'react';
import { Container, Box, Card, CardContent } from '@mui/material';
import { UserProfile } from '../../models/user';
import ReviewCard from '../ReviewCard/reviewcard';

interface ProfileUserProps{
    user: UserProfile | undefined;
}

function ProfileReviews(props: ProfileUserProps) {

    const [reviews, setReviews] = useState([]);
    
    async function getReviews(){
        const result = await fetch (
            `http://localhost:8080/reviews/users/${props.user?.id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            }
        );
        const data = await result.json();
        console.log(data);
        setReviews(data);
    }
    useEffect(() => {
        getReviews();
    }, []);

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ height: '100vh' }} />
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
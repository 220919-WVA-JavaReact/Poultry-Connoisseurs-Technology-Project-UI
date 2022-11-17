import React, { useEffect, useState } from 'react';
import { Container, Box, Card, CardContent } from '@mui/material';
import { UserProfile } from '../../models/user';
import ReviewCard from '../ReviewCard/reviewcard';
import { BigReview } from '../../models/reviews';

interface ProfileUserProps{
    user: UserProfile | undefined;
}

function ProfileReviews(props: ProfileUserProps) {
    console.log(props.user);
    const [reviews, setReviews] = useState([]);
    
    async function getReviews(){
        if(props.user != undefined) {
            const result = await fetch (
                `http://localhost:8080/reviews/users/${props.user?.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'authorization': `${props.user.role}`
                    }
                }
            );
            const data = await result.json();
            console.log(data);
            setReviews(data);
        }
    }
    useEffect(() => {
        getReviews();
    }, []);

    return (
        <>
            <Container maxWidth="sm" style={{justifyContent: 'center'}}>
                <Box />
                    <Card style={{ backgroundColor: '#333333', border: 'none'}}>
                        <CardContent>
                            {reviews.map((review: BigReview) => {
                                return (
                                    <ReviewCard
                                        user={review.authorUsername}
                                        title={review.title}
                                        summary={review.summary}
                                        key={review.id}
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
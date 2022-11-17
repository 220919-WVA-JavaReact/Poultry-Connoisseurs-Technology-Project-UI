import React, { useEffect, useState } from 'react';
import { Container, Box, Card, CardContent } from '@mui/material';
import { UserProfile } from '../../models/user';
import ReviewCard from '../ReviewCard/reviewcard';
import { BigReview } from '../../models/reviews';

interface ProfileUserProps{
    user: UserProfile | undefined;
}

function ProfileReviews(props: ProfileUserProps) {
    const [reviews, setReviews] = useState([]);
    
    async function getReviews(){
        if(props.user != undefined) {
            const result = await fetch(
              `${process.env.REACT_APP_API_URL}/reviews/users/${props.user?.id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `${props.user.role}`,
                },
              }
            );
            const data = await result.json();
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
                                    <>
                                    <ReviewCard
                                        user={review.authorUsername}
                                        title={review.title}
                                        summary={review.summary}
                                        key={review.id}
                                    />
                                    <br />
                                    </>
                                );
                            })}
                        </CardContent>
                    </Card>
            </Container>
        </>
    )
}

export default ProfileReviews;
import React from 'react';
import { Button, TextField, Box, Card } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Movie } from "../../models/movie";
import { User } from "../../models/user";

interface IAddReviewProps {
    currentUser: User;
    movie_id: number | string | undefined;
    movie: Movie;
    getReviews: Function;
}

function AddReview(props: IAddReviewProps) {
    const [reviews, setReviews] = useState([]);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');

    let updateReviewTitle = (e: SyntheticEvent) => {
        setTitle((e.target as HTMLInputElement).value);
    };

    let updateReviewSummary = (e: SyntheticEvent) => {
        setSummary((e.target as HTMLInputElement).value);
    };

    async function postReview() {
        const userId = props.currentUser?.id;
        const movie_id = props.movie;
        console.log(userId);
        const result = await fetch(
            `http://localhost:8080/reviews/${props.movie_id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ userId, title, summary, movie_id }),
            }
        );
        // const data = await result.json();
        // setTitle('');
        // setSummary('');
        // setReviews(Object.assign(data));
        // props.getReviews(reviews);

    }

    return (
        <Card style={{ backgroundColor: "#a0d0ff", padding: "1.5rem" }}>
            <Box
                component="form"
                onSubmit={postReview}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-textarea"
                        label="Review Title"
                        variant="outlined"
                        placeholder="Insert Title"
                        multiline
                        onChange={updateReviewTitle}
                        value={title}
                    />
                    <TextField
                        required
                        id="outlined-textarea"
                        label="Review Summary"
                        variant="outlined"
                        placeholder="Insert Review Summary"
                        multiline
                        onChange={updateReviewSummary}
                        value={summary}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => { setReviews(reviews) }}>
                        Submit
                    </Button>
                </div>
            </Box>
        </Card>
    );
}

export default AddReview;
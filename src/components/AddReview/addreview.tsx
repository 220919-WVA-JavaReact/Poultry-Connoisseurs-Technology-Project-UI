import React, { useReducer } from 'react';
import { Button, TextField, Box, Card } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Movie } from "../../models/movie";
import { User } from "../../models/user";
import { Reviews } from '../../models/reviews';
import { useNavigate } from 'react-router-dom';
import { updateStatement } from 'typescript';

interface IAddReviewProps {
    currentUser: User;
    movieId: number | string | undefined;
    movie: Movie;
    getReviews: Function;
}

function AddReview(props: IAddReviewProps) {
    const [reviews, setReviews] = useState<Reviews[] | undefined>()
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');

    let navigate = useNavigate();
    
    function useForceUpdate(){
        const [value, setValue] = useState(0);
        return () => setValue(value => value + 1);
    }

    const forceUpdate = useForceUpdate();
    
    let updateReviewTitle = (e: SyntheticEvent) => {
        setTitle((e.target as HTMLInputElement).value);
    };

    let updateReviewSummary = (e: SyntheticEvent) => {
        setSummary((e.target as HTMLInputElement).value);
    };

    async function postReview(e: SyntheticEvent) {
        e.preventDefault();
        console.log(props.currentUser?.id);
        const userId = props.currentUser?.id;
        const movieId = props.movie.id;
        const result = await fetch(
            `http://localhost:8080/reviews`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${props.currentUser.role}`,
                },
                body: JSON.stringify({ userId, title, summary, movieId }),
            }
        );
        const data = await result.json();
        setTitle('');
        setSummary('');
        console.log(data);
        forceUpdate();
        //setReviews(Object.assign(data));
        //props.getReviews(reviews);
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
                        onClick={ postReview }>
                        Post
                    </Button>
                </div>
            </Box>
        </Card>
    );
}

export default AddReview;
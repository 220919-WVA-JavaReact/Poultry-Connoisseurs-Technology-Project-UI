import { Movie } from "./movie";
import { User } from "./user";

export class Reviews{
    id: string;
    userID: string;
    authorUsername: string;
    title: string;
    summary: string;


    constructor(id: string, userID: string, authorUsername: string, title: string, summary: string) {
        this.id = id;
        this.userID = userID;
        this.authorUsername = authorUsername;
        this.title = title;
        this.summary = summary;
    }
}

export class BigReview{
    id: string;
    authorUsername: string;
    title: string;
    summary: string;
    userId: string;
    movieId: string;
    constructor(id: string, userId: string, movieId: string, authorUsername: string, title: string, summary: string) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.authorUsername = authorUsername;
        this.title = title;
        this.summary = summary;
    }
}

export interface IReviewsProps{
    reviews: Reviews[] | undefined,
    setReviews: (nextmovie: Reviews[] | undefined) => void
}
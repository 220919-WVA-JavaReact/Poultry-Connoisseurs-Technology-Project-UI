import { Movie } from "./movie";
import { User } from "./user";

export class Reviews{
    id: string;
    user: User;
    title: string;
    summary: string;
    movie: Movie;

    constructor(id: string, user: User, title: string, summary: string, movie: Movie){
        this.id = id;
        this.user = user;
        this.title = title;
        this.summary = summary;
        this.movie = movie;
    }
}


export interface IReviewsProps{
    reviews: Reviews[] | undefined,
    setReviews: (nextmovie: Reviews[] | undefined) => void
}
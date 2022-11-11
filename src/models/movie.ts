

export class Movie{
    id: number;
    title: string;
    runtime: number;
    stars: string;
    rating: number;

    constructor(id: number, title: string, runtime: number, stars: string, rating: number){
        this.id = id;
        this.title = title;
        this.runtime = runtime;
        this.stars = stars;
        this.rating = rating;
    }
}



export interface IMovieProps{
    movies: Movie[] | undefined,
    setMovies: (nextmovie: Movie[] | undefined) => void
}
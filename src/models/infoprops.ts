import { Movie } from "./movie"
import { IUser } from "./user"

export interface IinfoProps{
    user: IUser | undefined,
    setUser: (nextUser: IUser | undefined) => void
    movies: Movie[] | undefined,
    setMovies: (nextmovie: Movie[] | undefined) => void
}
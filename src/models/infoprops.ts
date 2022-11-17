import { Movie } from "./movie"
import { IUser, UserProfile } from "./user"

export interface IinfoProps{
    user: IUser | undefined,
    setUser: (nextUser: IUser | undefined) => void
    movies: Movie[] | undefined,
    setMovies: (nextmovie: Movie[] | undefined) => void
    userProfile: UserProfile | undefined,
    setUserProfile: (nextUserProfile: UserProfile | undefined) => void
}
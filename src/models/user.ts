import { Role } from "./role";

export interface IUser {
    id: number;
    username: string;
    role: Role;
}

export interface ILoginProps{
    user: IUser | undefined,
    setUser: (nextUser: IUser) => void
}

export type UserType = {
    id: number;
    username: string;
    role: Role;
}

export class User{
    id: number;
    username: string;
    role: Role;

    constructor(id: number, username: string, role:Role){
        this.id = id;
        this.username = username;
        this.role = role;
    }
}
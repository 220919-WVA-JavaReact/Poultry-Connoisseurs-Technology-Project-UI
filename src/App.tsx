import React from "react";
import { Role } from "./models/role";

import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { User } from "./models/user";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ProfileWelcome from "./components/ProfileWelcome/profile-welcome";
import { Movie } from "./models/movie";
import MoviePage from "./components/MoviePage/movie-page";
import Admin from "./components/Admin/Admin";

function App() {
  const [user, setUser] = React.useState<User | undefined>(); //?? need to implement interface somehow. <IUser>
  const [movies, setMovies] = React.useState<Movie[] | undefined>();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                setUser={setUser}
                movies={movies}
                setMovies={setMovies}
              />
            }
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/admin"
            element={<Admin user={user} setUser={setUser} />}
          />
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="profile" element={<ProfileWelcome user={user} />} />
          <Route path="movies/:id" element={<MoviePage user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

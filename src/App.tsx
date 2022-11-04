import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import { User } from './models/user';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';


function App() {

      const [user, setUser] = React.useState<User>();//?? need to implement interface somehow. <IUser>
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

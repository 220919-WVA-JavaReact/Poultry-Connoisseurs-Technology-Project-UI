import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileBanner from '../ProfileBanner/ProfileBanner';
import ProfileReviews from '../ProfileReviews/ProfileReviews';
import ProfileWelcome from '../ProfileWelcome/profile-welcome';
import WatchListMain from '../WatchList/WatchListMain';

const AltProfilePage = () => {
    const retrievedUsername = useParams();
    const [user, setUser] = useState();

    const fetchData = async () => {
        let response = await fetch(`http://localhost:8080/users/uname/${retrievedUsername.username}`, {
            method: "GET",
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            setUser(data);
        } else {
            console.log(
                `Could not find user profile: ERROR CODE ${response.status}`
            )
        }
    }

    useEffect(() => {
        fetchData();
    }, [user != undefined])

    return (
        <Card sx={{ backgroundColor: '#333333', minHeight: '100vh' }}>
            <ProfileWelcome user={user} />
            <ProfileAvatar user={user} />
            <ProfileBanner user={user} />
            {user?
            <ProfileReviews user={user} /> : '' }
            {user?
            <WatchListMain user={user} fetchData={fetchData}/> : '' }
        </Card>
    );
}

export default AltProfilePage; 

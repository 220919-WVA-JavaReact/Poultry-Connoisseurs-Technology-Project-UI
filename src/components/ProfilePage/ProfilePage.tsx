import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../models/user';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileBanner from '../ProfileBanner/ProfileBanner';
import ProfileWelcome from '../ProfileWelcome/profile-welcome';
import WatchListMain from '../WatchList/WatchListMain';

interface ProfileUserProps{
    user: UserProfile | undefined;
}

function ProfilePage(props: ProfileUserProps) {
    const [userProfile, setUserProfile] = useState<UserProfile | undefined>()

    useEffect(() => {

        const fetchData = async ()=>{
            let response = await fetch('http://localhost:8080/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                let data = await response.json();
                setUserProfile(data);
            } else {
                console.log(
                    `Could not find user profile: ERROR CODE ${response.status}`
                );
            }
        
        }
        fetchData();
    }, [])

    
    return (
        <Card sx={{ backgroundColor: '#333333'}}>
            <ProfileWelcome user={userProfile} />
            <ProfileAvatar user={userProfile} />
            <ProfileBanner user={userProfile} />
            <WatchListMain />
        </Card>
    );
}

export default ProfilePage;
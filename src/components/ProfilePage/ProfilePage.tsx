import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ILoginProps, UserProfile } from '../../models/user';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileBanner from '../ProfileBanner/ProfileBanner';
import ProfileReviews from '../ProfileReviews/ProfileReviews';
import ProfileWelcome from '../ProfileWelcome/profile-welcome';
import WatchListMain from '../WatchList/WatchListMain';

function ProfilePage(props: ILoginProps) {
    const [userProfile, setUserProfile] = useState<UserProfile | undefined>()

    const fetchData = async ()=>{
        if(props.user != undefined) {
            let response = await fetch(
              `${process.env.REACT_APP_API_URL}/users/uname/${props.user?.username}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if(response.status === 200){
                let data = await response.json();
                setUserProfile(data);
            } else {
                console.log(
                    `Could not find user profile: ERROR CODE ${response.status}`
                );
            }
        }
    }

    useEffect(() => {    
        fetchData();
    }, [props.user != undefined])
    
    return (
        <Card sx={{ backgroundColor: '#333333', minHeight: '100vh' }}>
            <ProfileWelcome user={userProfile} />
            <ProfileAvatar user={userProfile} />
            <ProfileBanner user={userProfile} />
            {userProfile?
            <ProfileReviews user={userProfile} /> : '' }
            {userProfile?
            <WatchListMain user={userProfile} fetchData={fetchData}/> : '' }
        </Card>
    );
}

export default ProfilePage;
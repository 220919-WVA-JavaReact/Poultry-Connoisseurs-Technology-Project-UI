import React from 'react';
import { UserProfile } from '../../models/user';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';

interface ProfileUserProps{
    user: UserProfile | undefined;
}

function ProfileAvatar(props: ProfileUserProps) {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar 
                sx={{ 
                    bgcolor: deepPurple[500],
                    width: 200,
                    height: 200,
                    position: 'absolute',
                    left: '45%',
                    top: '525px',
                    fontSize: '100px'
                }}
                alt="Default Profile Image"
            >{props.user?.first.charAt(0)}{props.user?.last.charAt(0)}</Avatar>
        </Stack>
    )
}

export default ProfileAvatar;
import React from 'react'
import { IUser } from '../../models/user';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface IUserProps{
    user: IUser | undefined
}

const Dashboard = (props: IUserProps ) => {

  return (
    <Stack direction="row" spacing={1}>{props.user ? Object.keys(props.user).filter(x=> x=='Search').map(x=> { 
        const keys = Object.keys(x);
        return keys.map(x => <Chip key={x}></Chip>) }) : ''}</Stack>
  )
  
}

export default Dashboard
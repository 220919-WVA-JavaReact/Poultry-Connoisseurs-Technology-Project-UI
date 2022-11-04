import React from 'react'
import { ILoginProps } from '../../models/user';

const Home = ( props: ILoginProps ) => {
  return (
    <div>
      <p>{props.user ? props.user.username : 'Not logged in =('}</p>
    </div>
  );
};

export default Home
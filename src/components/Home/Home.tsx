import React from 'react'
import { ILoginProps } from '../../models/user';

const Home = ( props: ILoginProps ) => {
  return (
    <div>
      <p>{props.user ? `${props.user.username}: ${props.user.role}` : 'Not logged in =('}</p>
      {/* Here is where SEARCHBAR and MOVIES components would go */}
    </div>
  );
};

export default Home
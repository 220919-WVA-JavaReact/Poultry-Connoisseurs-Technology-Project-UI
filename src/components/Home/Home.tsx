import React from 'react'
import { ILoginProps } from '../../models/user';

const Home = ( props: ILoginProps ) => {
  return (
    <div>
        {/* Check to see if user is signed in or not, will eventually get rid of it once we have UI more developed. */}
      <p>{props.user ? `${props.user.username}: ${props.user.role}` : 'Not logged in =('}</p>


      {/* Here is where SEARCHBAR and MOVIES components would go - Perhaps use dashboard as MOVIES */}
    </div>
  );
};

export default Home
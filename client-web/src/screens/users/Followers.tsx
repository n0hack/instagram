import React from 'react';
import { useOutletContext } from 'react-router-dom';

type FollowersContext = { nameOfMyUser: string };

const Followers = () => {
  const ctx = useOutletContext<FollowersContext>();
  console.log(ctx.nameOfMyUser);
  return <h1>Here are {ctx.nameOfMyUser}의 followers</h1>;
};

export default Followers;

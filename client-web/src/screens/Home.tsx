import React from 'react';

type HomeProps = {};

const Home = ({}: HomeProps) => {
  const users: any = [];

  return <div>{users[0].name}</div>;
};

export default Home;

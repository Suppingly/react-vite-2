import React from 'react';
import PopularHouses from '../components/PopularHouses';
import Hero from '../../../components/Hero';
import Conference from '../../../components/Conference';

const HomesPage: React.FC = () => {
  return (
    <>
      <Hero />
      <Conference />
      <PopularHouses />
    </>
  );
};

export default HomesPage;

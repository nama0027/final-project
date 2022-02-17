import React, { useEffect } from 'react';
import PageTitle from '../components/PageTitle';

const Team = () => {
  const paragraphText = 'Meet our team!';
  return (
    <>
      <PageTitle headingText="Our Team " description={paragraphText} />
    </>
  );
};

export default Team;

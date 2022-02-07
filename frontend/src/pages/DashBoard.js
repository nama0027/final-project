import React from 'react';
import PageTitle from '../components/PageTitle';
import TabLayout from '../components/TabLayout';

const DashBoard = () => {
  const paragraphText = 'Welcome !';
  return (
    <>
      <PageTitle headingText="Member Portal" description={paragraphText} />
      <TabLayout />
    </>
  );
};

export default DashBoard;

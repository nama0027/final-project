import React from 'react';
import PageTitle from '../components/PageTitle';

const Announcement = () => {
  const paragraphText = 'Let us know if you need any to know anything more!';
  return (
    <>
      <PageTitle headingText="Contact Us " description={paragraphText} />
    </>
  );
};

export default Announcement;

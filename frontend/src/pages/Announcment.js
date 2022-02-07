import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAnnouncements } from '../reducers/announcements';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../components/PageTitle';
import Post from '../components/Post';

const Announcement = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch;

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  const paragraphText = 'Here are some announcements!';
  return (
    <>
      <PageTitle headingText="Announcements " description={paragraphText} />
    </>
  );
};

export default Announcement;

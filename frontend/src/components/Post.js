import React, { useEffect } from 'react';
import { Card } from 'antd';
import moment from 'moment';
import {
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getAnnouncements,
  handelDeleteAnnouncement,
} from '../reducers/announcements.js';

const Post = ({ typeOfPost }) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const announcementsItems = useSelector((store) => store.announcements.items);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    console.log(typeOfPost);
    if (typeOfPost === 'announcements') {
      dispatch(getAnnouncements());
    } else {
    }
  }, [typeOfPost, dispatch]);
  console.log('announcementsItems', announcementsItems);

  const handleClick = (filePath) => {
    window.open(filePath);
  };

  return (
    <>
      {announcementsItems?.map((item) => (
        <Card
          key={item._id}
          actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined
              key="delete"
              onClick={() => dispatch(handelDeleteAnnouncement(item._id))}
            />,
            <MailOutlined key="email" />,
          ]}
        >
          <p>{item.description}</p>
          <p>{item.postedBy}</p>
          <p>{moment(item.createdAt).fromNow()}</p>

          <PaperClipOutlined onClick={() => handleClick(item.filePath)} />
        </Card>
      ))}
    </>
  );
};

export default Post;

import React, { useEffect } from 'react';
import { Card, Popconfirm } from 'antd';
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

const Post = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userRole = useSelector((store) => store.user.role);
  const announcementsItems = useSelector((store) => store.announcements.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----------------check logged in user------------------------//
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  //----------------load data------------------------//
  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  //----------------event handlers ----------------------//

  const onAttachmentClick = (filePath) => {
    window.open(filePath);
  };

  const onDeleteAnnouncement = (announcementId) => {
    dispatch(handelDeleteAnnouncement(announcementId));
  };

  ////////////////////////////////////////////////////////////
  return (
    <>
      {announcementsItems?.map((item) => (
        <Card
          key={item?._id}
          actions={
            userRole === 'executive' && [
              <EditOutlined key="edit" />,
              <Popconfirm
                title="Are you sure to delete this announcement?"
                onConfirm={() => onDeleteAnnouncement(item?._id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined key="delete" />
              </Popconfirm>,
              <MailOutlined key="email" />,
            ]
          }
        >
          <p>{item?.description}</p>
          <p style={{ float: 'left' }}>{item?.postedBy} </p>
          <p style={{ float: 'right' }}>{moment(item?.createdAt).fromNow()}</p>
          {item?.uploadedFile && (
            <PaperClipOutlined
              style={{ float: 'right' }}
              onClick={() => onAttachmentClick(item?.uploadedFile.filePath)}
            />
          )}
        </Card>
      ))}
    </>
  );
};

export default Post;

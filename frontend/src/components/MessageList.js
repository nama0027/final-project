import React, { useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { List, Comment } from 'antd';

const MessageList = () => {
  const messagesList = useSelector((store) => store.messages.items);
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  //----------------check logged in user------------------------//
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  console.log(messagesList);
  return (
    <List
      dataSource={messagesList}
      header={`${messagesList.length} ${
        messagesList.length > 1 ? 'messages' : 'reply'
      }`}
      itemLayout="horizontal"
      renderItem={(item) => (
        <Comment
          {...{
            author: item.sender,
            content: item.message,
            datetime: moment(item.createdAt).fromNow(),
          }}
        />
      )}
    />
  );
};

export default MessageList;

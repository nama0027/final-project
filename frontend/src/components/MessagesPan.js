import React from 'react';
import { Comment, Avatar } from 'antd';

import MessageList from './MessageList';
import AddMessage from './AddMessage';

const MessagePan = () => {
  //----------------event handlers ----------------------//

  return (
    <>
      <MessageList />
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={<AddMessage />}
      />
    </>
  );
};

export default MessagePan;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { postMessage } from '../reducers/messages';

const AddMessage = () => {
  const [newMessage, setNewMessage] = useState('');

  const { TextArea } = Input;
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(postMessage(newMessage));
  };

  const onChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={newMessage} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="primary">
          Add Message
        </Button>
      </Form.Item>
    </>
  );
};
export default AddMessage;

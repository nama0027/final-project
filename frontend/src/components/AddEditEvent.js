import React from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd';

const AddEditEvent = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="New Event"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" preserve={false}>
        <Form.Item
          name="eventTitle"
          label="Title:"
          rules={[{ required: true, message: 'Please add description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="eventType" label="Type:">
          <Select>
            <Select.Option value="family">Family</Select.Option>
            <Select.Option value="kids">Kids</Select.Option>
            <Select.Option value="individuals">Individuals</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="eventDate"
          label="Date:"
          rules={[{ required: true, message: 'Please select date!' }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="eventTime"
          label="Time:"
          rules={[{ required: true, message: 'Please select time!' }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>
        <Form.Item name="eventVenue" label="Venue:">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditEvent;

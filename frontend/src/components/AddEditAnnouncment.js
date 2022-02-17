import React from 'react';
import { Button, Modal, Form, Input, Radio, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { normFile } from '../utils/constants.js';

const AddEditAnnouncement = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="New Announcement"
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          type: 'members_only',
        }}
      >
        <Form.Item
          name="description"
          label="Description:"
          rules={[
            {
              required: true,
              message: 'Please add description!',
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="type">
          <Radio.Group>
            <Radio value="members_only">For Members</Radio>
            <Radio value="public">Public</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="file"
          label="File:"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="fileName"
            beforeUpload={() => false}
            accept=".pdf"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditAnnouncement;

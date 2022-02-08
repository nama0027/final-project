import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal, Form, Input, Radio, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

{
  /*
const NewTabs = styled(CollectionCreateForm)`
  .collection-create-form_last-form-item {
    margin-bottom: 0;
  }
`;*/
}

const AddEditAnnouncement = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const props = {
    beforeUpload: (file) => {
      let fileExt = file.name.split('.');
      fileExt = fileExt[fileExt.length - 1];
      const isAllowed = file.type === (fileExt.toLoweCase() === 'pdf');
      if (!isAllowed) {
        message.error(`${file.name} is not a pdf file`);
      }
      return isAllowed || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      visible={visible}
      title="Add new Announcement"
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
          modifier: 'members_only',
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
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="members_only">For Members</Radio>
            <Radio value="public">Public</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload:"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture" {...props}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditAnnouncement;

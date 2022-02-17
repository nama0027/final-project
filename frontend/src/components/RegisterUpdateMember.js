import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Upload, Select, Checkbox, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  formItemLayout,
  tailFormItemLayout,
  normFile,
} from '../utils/constants.js';

import { getRegistered } from '../reducers/members.js';

const RegisterUpdateMember = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //------------------------------------------------//

  const onFinish = (values) => {
    dispatch(getRegistered(values));
    navigate('/login');
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="membershipType"
          label="Membership"
          rules={[
            { required: true, message: 'Please select membership type!' },
          ]}
        >
          <Select placeholder="select your membership type">
            <Select.Option value="individual">Individual</Select.Option>
            <Select.Option value="family">Family</Select.Option>
            <Select.Option value="studentIndividual">
              Student-Individual
            </Select.Option>
            <Select.Option value="studentFamily">Student-Family</Select.Option>
            <Select.Option value="retiredIndividual">
              Retired-Individual
            </Select.Option>
            <Select.Option value="retiredFamily">Retired-Family</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please type your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please type your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="e_mail"
          label="E-mail"
          rules={[
            { type: 'email', message: 'The email is not valid E-mail!' },
            { required: true, message: 'Please type your E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please type your phone number!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          rules={[
            {
              required: true,
              message: 'Please type your username!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please type your password!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Avatar:"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="fileName"
            beforeUpload={() => false}
            accept=".png"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the PKU constitution and agreed with it.
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterUpdateMember;

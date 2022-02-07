import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';

const { Header, Content, Footer } = Layout;

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div
          className="logo"
          style={{
            float: 'left',
            width: 50,
            height: 31,
            marginLeft: 0,
            marginTop: 16,
            marginBottom: 16,
            marginRight: 48,
            backgroundColor: '#fff',
          }}
        />
        <Button style={{ float: 'right', margin: 16 }}>Join PKU</Button>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="contact">nav 1</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="dashboard">nav 2</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="login">Member</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, overflow: 'auto' }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        PKU ©2022 Created by Naushin Malik
      </Footer>
    </Layout>
  );
};

export default Home;

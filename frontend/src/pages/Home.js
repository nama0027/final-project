import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, Button, Avatar } from 'antd';
import logo from '../assets/logo.png';
import { user } from '../reducers/user';

const NewLayout = styled(Layout)`
  min-height: 100vh;
  @media (min-width: 355px) {
    flex-direction: column;
  }
  .ant-layout-header {
    height: 64px;
    padding: 0 50px;
    color: #fff;
    line-height: 64px;
    background: #355834;
  }
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    color: #fff;
    background: #355834;
  }
  .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {
    background-color: #bbc5aa;
  }
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected,
  .ant-menu.ant-menu-dark .ant-menu-item-selected {
    background-color: #2f1b25;
  }
`;
const ImageContainer = styled.div`
  float: left;
  width: 50px;
  height: 50px;
  margin-right: 32px;
`;

const Home = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const { Header, Content, Footer } = Layout;

  const logOut = () => {
    batch(() => {
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setUserName(null));
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setAccessToken(null));
      dispatch(user.actions.setRole(null));
      dispatch(user.actions.setAvatar(null));
    });
  };

  return (
    <NewLayout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <ImageContainer className="logo">
          <img src={logo} alt="Logo" />
        </ImageContainer>

        {!accessToken ? (
          <>
            <Link to="register">
              <Button style={{ float: 'right', margin: 16 }}>Join PKU</Button>
            </Link>
            <Link to="login">
              <Button style={{ float: 'right', margin: 16 }}>Log In</Button>
            </Link>
          </>
        ) : (
          <>
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              style={{ float: 'right', margin: 16 }}
            />
            <Button onClick={logOut} style={{ float: 'right', margin: 16 }}>
              Log Out
            </Button>
          </>
        )}

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="overview">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="team">Team</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="contact">Contact Us</Link>
          </Menu.Item>
          {accessToken && (
            <Menu.Item key="4">
              <Link to="login">Member</Link>
            </Menu.Item>
          )}
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
    </NewLayout>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tabs, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post';
import EventCalendar from './EventCalendar';
import AddEditAnnouncement from './AddEditAnnouncment';
import MessagesPan from './MessagesPan';
import { getMessages } from '../reducers/messages';
import { getEvents } from '../reducers/events';

const NewTabs = styled(Tabs)`
  min-height: 100vh;
  .ant-tabs-nav .ant-tabs-tab {
    /* For tabs border */
    border-color: black;
  }

  .ant-tabs-nav::before {
    /* For the line to the right and close to the tabs */
    border-color: black;
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    border-top: 3px solid blue !important;
    z-index: 2;
  }

  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-content-holder {
    border-width: 1px;
    border-color: #333;
    border-style: solid;
    border-top: transparent;
    background-color: white;
    padding: 16px 24px;
  }
`;

const TabLayout = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //----------------------------------------------//
  const [activeTab, setActiveTab] = useState('1');
  const [visible, setVisible] = useState(false);

  //----------------------------------------------//

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  //----------------------------------------------//
  const { TabPane } = Tabs;
  const operations = {
    right: [
      <Button
        key="1"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Announcement{' '}
      </Button>,
      <Button key="2">Right </Button>,
    ],
  };

  //----------------------------------------------//
  const onTabChange = (key) => {
    if (key === '1') {
      setActiveTab(key);
    } else if (key === '2') {
      setActiveTab(key);
      dispatch(getEvents());
    } else if (key === '3') {
      setActiveTab(key);
      dispatch(getMessages());
    } else {
      console.log('invalid key');
    }
  };
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  //----------------------------------------------//
  return (
    <div>
      <NewTabs
        type="card"
        tabBarExtraContent={operations}
        defaultActiveKey={activeTab}
        onChange={(key) => onTabChange(key)}
      >
        <TabPane tab="Tab 1" key="1" forceRender="true">
          {activeTab === '1' && <Post />}
        </TabPane>
        <TabPane tab="Tab 2" key="2" forceRender="true">
          {activeTab === '2' && <EventCalendar />}
        </TabPane>
        <TabPane tab="Tab 3" key="3" forceRender="true">
          {activeTab === '3' && <MessagesPan />}
        </TabPane>
      </NewTabs>
      <AddEditAnnouncement
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default TabLayout;

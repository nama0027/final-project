import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tabs, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { announcements, getAnnouncements } from '../reducers/announcements';
import Post from './Post';
import EventCalendar from './EventCalendar';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('1');

  const { TabPane } = Tabs;
  const operations = {
    right: [<Button key="1">Left </Button>, <Button key="2">Right </Button>],
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
    <div>
      <NewTabs
        type="card"
        tabBarExtraContent={operations}
        defaultActiveKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        <TabPane tab="Tab 1" key="1" forceRender="true">
          {activeTab === '1' && <Post typeOfPost="announcements" />}
        </TabPane>
        <TabPane tab="Tab 2" key="2" forceRender="true">
          {activeTab === '2' && <EventCalendar />}
        </TabPane>
        <TabPane tab="Tab 3" key="3" forceRender="true">
          Content of Tab 3
        </TabPane>
      </NewTabs>
    </div>
  );
};

export default TabLayout;

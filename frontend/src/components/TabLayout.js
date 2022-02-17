import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Tabs, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post';
import EventCalendar from './EventCalendar.js';
import AddEditAnnouncement from './AddEditAnnouncment.js';

import AddEditEvent from './AddEditEvent.js';
import MessagesPan from './MessagesPan.js';
import { getMessages } from '../reducers/messages.js';
import { getEvents, createEvent } from '../reducers/events.js';
import { createAnnouncement } from '../reducers/announcements.js';

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
  const userRole = useSelector((store) => store.user.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //----------------------------------------------//
  const [activeTab, setActiveTab] = useState('1');
  const [visiblePost, setVisiblePost] = useState(false);
  const [visibleEvent, setVisibleEvent] = useState(false);

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
          setVisiblePost(true);
        }}
      >
        Add Announcement{' '}
      </Button>,
      <Button
        key="2"
        onClick={() => {
          setVisibleEvent(true);
        }}
      >
        Add Event{' '}
      </Button>,
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

  //---------------------------------------------//
  const handelCreatePost = (values) => {
    console.log('Received values of form: ', values);
    setVisiblePost(false);
    dispatch(createAnnouncement(values));
  };

  const handelCreateEvent = (values) => {
    const eventDate = moment(values.eventDate).format();
    const eventTime = moment(values.eventTime).format('HH:mm');
    delete values.eventDate;
    delete values.eventTime;
    const newValues = { ...values, eventDate, eventTime };
    setVisibleEvent(false);
    dispatch(createEvent(newValues));
  };

  //----------------------------------------------//
  return (
    <div>
      <NewTabs
        type="card"
        tabBarExtraContent={userRole === 'executive' && operations}
        defaultActiveKey={activeTab}
        onChange={(key) => onTabChange(key)}
      >
        <TabPane tab="Announcement" key="1" forceRender="true">
          {activeTab === '1' && <Post />}
        </TabPane>
        <TabPane tab="Events" key="2" forceRender="true">
          {activeTab === '2' && <EventCalendar />}
        </TabPane>
        <TabPane tab="Messages" key="3" forceRender="true">
          {activeTab === '3' && <MessagesPan />}
        </TabPane>
      </NewTabs>

      <AddEditAnnouncement
        visible={visiblePost}
        onCreate={handelCreatePost}
        onCancel={() => {
          setVisiblePost(false);
        }}
      />
      <AddEditEvent
        visible={visibleEvent}
        onCreate={handelCreateEvent}
        onCancel={() => {
          setVisibleEvent(false);
        }}
      />
    </div>
  );
};

export default TabLayout;

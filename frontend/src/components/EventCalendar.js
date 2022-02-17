import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { Calendar, Badge, Space } from 'antd';

import EventDetail from './EventDetail';
import { addAttendees } from '../reducers/events';

//----------------styling-----------------//
const MyCalendar = styled(Calendar)`
  .events {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .events .ant-ribbon {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .notes-month {
    font-size: 28px;
    text-align: center;
  }
  .notes-month section {
    font-size: 28px;
  }
`;

const EventCalendar = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const eventList = useSelector((store) => store.events.items);
  const [visible, setVisible] = useState(false);
  const [targetEventId, setTargetEventID] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //----------------check logged in user------------------------//
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  //-------------------------- event handlers----------------------//
  const onConfirm = (eventId) => {
    console.log('Received values of form: ', eventId);
    dispatch(addAttendees(eventId));
    setVisible(false);
  };

  const onHandleClick = (item) => {
    const id = item.eventId;
    setTargetEventID(id);
    setVisible(true);
  };
  //------------------for event badges--------------------//

  const getListData = (value) => {
    const listData = [];

    if (eventList) {
      eventList.forEach((item) => {
        if (moment(item.eventDate).format('L') === value.format('L')) {
          if (item.eventType === 'family') {
            listData.push({
              color: 'green',
              content: `${item.eventTitle}`,
              eventId: `${item._id}`,
            });
          } else if (item.eventType === 'kids') {
            listData.push({
              color: 'magenta',
              content: `${item.eventTitle}`,
              eventId: `${item._id}`,
            });
          } else {
            listData.push({
              color: 'cyan',
              content: `${item.eventTitle}`,
              eventId: `${item._id}`,
            });
          }
        }
      });
    }
    return listData;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li
            key={`${item.content}-${index}`}
            onClick={() => {
              onHandleClick(item);
            }}
          >
            <Space direction="vertical">
              <Badge.Ribbon
                color={item.color}
                text={item.content}
                placement="start"
                style={{ width: '10vh', height: 18 }}
              />
            </Space>
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => {
          if (value.month() === item.month) {
            return (
              <li
                key={`${item.content}-${index}`}
                onClick={(e) => {
                  onHandleClick(e);
                }}
              >
                <Badge.Ribbon
                  color={item.color}
                  text={item.content}
                  placement="start"
                />
              </li>
            );
          }
          return <></>;
        })}
      </ul>
    );
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
      </div>
    ) : null;
  };

  return (
    <>
      <MyCalendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
      <EventDetail
        visible={visible}
        targetEventId={targetEventId}
        onConfirm={onConfirm}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export default EventCalendar;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Calendar, Badge } from 'antd';

const EventCalendar = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const eventList = useSelector((store) => store.events.items);
  const navigate = useNavigate();

  //----------------check logged in user------------------------//
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  const dateCellRender = (value) => {
    return (
      <ul className="events">
        {eventList?.map(
          (item) =>
            item.eventDate === moment(value).format() && (
              <li key={item._id}>
                <Badge status={item.eventType} text="hello" />
              </li>
            )
        )}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

export default EventCalendar;

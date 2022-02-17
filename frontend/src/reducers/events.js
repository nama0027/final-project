import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
import { API_URL } from '../utils/constants.js';
import { batch } from 'react-redux';

export const events = createSlice({
  name: 'events',
  initialState: {
    items: [],
    error: null,
    eventId: '',
    eventTitle: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    eventVenue: '',
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setEventId: (store, action) => {
      store.eventId = action.payload;
    },
    setEventTitle: (store, action) => {
      store.eventTitle = action.payload;
    },
    setEventType: (store, action) => {
      store.eventType = action.payload;
    },
    setEventDate: (store, action) => {
      store.eventDate = action.payload;
    },
    setEventTime: (store, action) => {
      store.eventTime = action.payload;
    },
    setEventVenue: (store, action) => {
      store.eventVenue = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

//----------------------------------------------------------//

export const getEvents = () => {
  return (dispatch, getState) => {
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('events'), {
      method: 'GET',
      headers: { Authorization: getState().user.accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(events.actions.setItems(data.response));
            dispatch(events.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(events.actions.setItems(null));
            dispatch(events.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};

//------------------------------------------------------------//
export const addAttendees = (eventId) => {
  return (dispatch, getState) => {
    const memberId = getState().user.userId;
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL(`event/${eventId}/member/${memberId}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(events.actions.setError(null));
          dispatch(loader.actions.setLoading(false));
        } else {
          dispatch(events.actions.setError(data.response));
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};

//---------------------Add Event----------------------------//

export const createEvent = (values) => {
  return (dispatch, getState) => {
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('events'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(events.actions.setEventId(data.response.eventId));
            dispatch(events.actions.setEventTitle(data.response.eventTitle));
            dispatch(events.actions.setEventType(data.response.eventType));
            dispatch(events.actions.setEventDate(data.response.eventDate));
            dispatch(events.actions.setEventTime(data.response.eventTime));
            dispatch(events.actions.setEventVenue(data.response.eventVenue));
            dispatch(events.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(events.actions.setEventId(null));
            dispatch(events.actions.setEventTitle(null));
            dispatch(events.actions.setEventType(null));
            dispatch(events.actions.setEventDate(null));
            dispatch(events.actions.setEventTime(null));
            dispatch(events.actions.setEventVenue(null));
            dispatch(events.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};

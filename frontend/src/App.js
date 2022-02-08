import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

//-----------reducers------------------//
import { user } from './reducers/user.js';
import { loader } from './reducers/loader.js';
import { announcements } from './reducers/announcements';
import { messages } from './reducers/messages';
//import { members } from './reducers/members';
import { events } from './reducers/events';

//-----------------pages-------------------//
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import DashBoard from './pages/DashBoard.js';
import Announcement from './pages/Announcment.js';

//--------------------combine reducers----------------//
const reducer = combineReducers({
  user: user.reducer,
  loader: loader.reducer,
  announcements: announcements.reducer,
  messages: messages.reducer,
  //members: members.reducer,
  events: events.reducer,
});
//------------configure store-----------------//
const store = configureStore({ reducer });

//--------------------------------------------------//
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<DashBoard />}>
              <Route path="announcement" element={<Announcement />} />
            </Route>
            <Route path="register" element={<register />} />
            <Route path="about" element={<about />} />
            <Route path="contact" element={<contact />} />
          </Route>
          <Route path="*" element={<notFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

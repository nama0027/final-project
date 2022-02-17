import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware,
} from '@reduxjs/toolkit';

//-----------reducers------------------//
import { user } from './reducers/user.js';
import { loader } from './reducers/loader.js';
import { announcements } from './reducers/announcements';
import { messages } from './reducers/messages';
import { members } from './reducers/members';
import { events } from './reducers/events';
import { files } from './reducers/file.js';

//-----------------pages-------------------//
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import DashBoard from './pages/DashBoard.js';
import Contact from './pages/Contact.js';
import NotFound from './pages/NotFound.js';
import Overview from './pages/Overview.js';
import Team from './pages/Team.js';
import Registration from './pages/Registration.js';

//--------------------combine reducers----------------//
const reducer = combineReducers({
  user: user.reducer,
  loader: loader.reducer,
  announcements: announcements.reducer,
  messages: messages.reducer,
  members: members.reducer,
  events: events.reducer,
  files: files.reducer,
});

//---------------------------------------------------//
const persistedStateJSON = localStorage.getItem('myAppReduxState');
const persistedState = persistedStateJSON ? JSON.parse(persistedStateJSON) : {};

const composedEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
//------------createStore-----------------//
const store = createStore(
  reducer,
  persistedState,
  composedEnhancers(applyMiddleware(thunkMiddleware))
);
//------------storage-----------------//

store.subscribe(() => {
  localStorage.setItem('myAppReduxState', JSON.stringify(store.getState()));
});

//--------------------------------------------------//
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="overview" element={<Overview />} />
            <Route path="contact" element={<Contact />} />
            <Route path="team" element={<Team />} />
            <Route path="register" element={<Registration />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

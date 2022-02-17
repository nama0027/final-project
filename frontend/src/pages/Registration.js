import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterUpdateMember from '../components/RegisterUpdateMember.js';

const Registration = () => {
  const dispatch = useDispatch;

  return (
    <>
      <RegisterUpdateMember />
    </>
  );
};

export default Registration;

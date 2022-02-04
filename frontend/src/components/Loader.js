import React from 'react';
import styled from 'styled-components/macro';
import loader from '../reducers/loader.js';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import animation from '../assets/animation.json';

const Section = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: #333;
`;
const Spinner = styled.div`
  position: relative;
`;

const Loader = () => {
  const loading = useSelector((store) => store.loader.loading);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Section>
      <Spinner>
        {loading && (
          <Lottie options={defaultOptions} height={325} width={325} />
        )}{' '}
        {/* changed height and width to better fit all devises */}
      </Spinner>
    </Section>
  );
};

export default Loader;

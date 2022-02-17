import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '60vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Overview = () => {
  return (
    <Carousel autoplay>
      <div>
        <img
          src="https://images.unsplash.com/photo-1470756544705-1848092fbe5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFraXN0YW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt="Kids specific activities"
          style={{ width: '100%', objectFit: 'cover', height: '60vh' }}
        />
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8a2lkcyUyMHBsYXlpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt="Kids specific activities"
          style={{ width: '100%', objectFit: 'cover', height: '60vh' }}
        />
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default Overview;

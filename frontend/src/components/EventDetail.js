import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Modal, Descriptions } from 'antd';
import moment from 'moment';

//-------------------styling----------------------//

const StyledDescriptions = styled(Descriptions)`
  .ant-descriptions-item-label {
    color: #096dd9;
    font-weight: 700;
    line-height: 2;
    text-align: start;
  }
  .ant-modal-title {
    font-weight: 700;
    font-size: 16px;
  }

  .ant-descriptions-item-content {
    line-height: 2;
  }
`;

const EventDetail = ({ visible, targetEventId, onConfirm, onCancel }) => {
  const eventList = useSelector((store) => store.events.items);

  const targetEvent = eventList.find((item) => item._id === targetEventId);

  return (
    <Modal
      centered
      visible={visible}
      title={targetEvent?.eventTitle}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="RSVP"
          type="primary"
          onClick={() => onConfirm(targetEventId)}
        >
          RSVP
        </Button>,
      ]}
    >
      <StyledDescriptions column={2}>
        <Descriptions.Item label="Event Date">
          {moment(targetEvent?.eventDate).format('LL')}
        </Descriptions.Item>
        <Descriptions.Item label="Event Time">
          {targetEvent?.eventTime}
        </Descriptions.Item>
        <Descriptions.Item label="For">
          {targetEvent?.eventType}
        </Descriptions.Item>

        <Descriptions.Item label="Venue">
          {targetEvent?.eventVenue}
        </Descriptions.Item>
      </StyledDescriptions>
    </Modal>
  );
};

export default EventDetail;

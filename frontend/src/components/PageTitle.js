import React from 'react';
import { PageHeader, Typography } from 'antd';

const PageTitle = ({ headingText, description }) => {
  const { Paragraph } = Typography;
  return (
    <PageHeader title={headingText} style={{ padding: 0, marginBottom: 0 }}>
      <Paragraph style={{ paddingBottom: 12, marginTop: 0, lineHeight: 1 }}>
        {description}
      </Paragraph>
    </PageHeader>
  );
};

export default PageTitle;

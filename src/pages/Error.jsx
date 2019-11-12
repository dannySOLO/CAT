import React from 'react';
import Exception from 'ant-design-pro/lib/Exception';

import BlankLayout from 'layouts/Blank';

const messages = {
  403: 'You have no permission to view this page',
  404: 'The page you are looking for could not be found',
  500: 'Something went wrong, please try again later',
};

const Error = ({ code = '404', message = '' }) => (
  <BlankLayout>
    <Exception
      backText="Go back"
      type={code}
      title={code}
      desc={message || messages[code] || messages['500']}
    />
  </BlankLayout>
);

export default Error;

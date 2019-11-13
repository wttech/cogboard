import React from 'react';
import { node, any } from 'prop-types';

import { Typography } from '@material-ui/core';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {children}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: node,
  index: any.isRequired,
  value: any.isRequired
};

export default TabPanel;

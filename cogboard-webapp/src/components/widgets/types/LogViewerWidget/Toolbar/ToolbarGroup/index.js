import React from 'react';
import { string } from 'prop-types';
import { Typography } from '@material-ui/core';
import { Wrapper, GroupContainer } from './styled';

const ToolbarGroup = ({ title, children }) => (
  <Wrapper>
    <Typography>{title}</Typography>
    <GroupContainer>{children}</GroupContainer>
  </Wrapper>
);

ToolbarGroup.propTypes = {
  title: string
};

export default ToolbarGroup;

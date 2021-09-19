import React from 'react';
import styled from '@emotion/styled/macro';
import { string } from 'prop-types';
import { Typography } from '@material-ui/core';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 24px auto;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-end;
  gap: 5px;
`;

export default function ToolbarGroup({ title, children }) {
  return (
    <Wrapper>
      <Typography>{title}</Typography>
      <GroupContainer>{children}</GroupContainer>
    </Wrapper>
  );
}

ToolbarGroup.propTypes = {
  title: string
};

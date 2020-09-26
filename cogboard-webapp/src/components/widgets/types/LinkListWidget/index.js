import React from 'react';
import { array } from 'prop-types';
import { Link } from '@material-ui/core';
import { StyledList, StyledListItem } from './styled';

const LinkListWidget = ({ linkListItems }) => {
  return (
    <StyledList component="nav" aria-label="Link List">
      {
        linkListItems.map(item => (
          <StyledListItem>
            <Link href={ `https://${item.linkHref}` } target="_blank" rel="noopener">
              { item.linkTitle }
            </Link>
          </StyledListItem>
        ))
      }
    </StyledList>
  );
};

LinkListWidget.propTypes = {
  linkListItems: array.isRequired
};

LinkListWidget.defaultProps = {
  linkListItems: []
};

export default LinkListWidget;
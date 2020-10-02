import React from 'react';
import { array } from 'prop-types';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from '@material-ui/core';
import { StyledList, StyledListItem } from './styled';
import { StyledNoItemsInfo } from '../../../Widget/styled';

const LinkListWidget = ({ linkListItems }) => {
  return (
    <>
      {linkListItems.length > 0 ? (
        <StyledList component="nav" aria-label="Links List">
          {linkListItems.map((item, id) => (
            <StyledListItem>
              <Link
                id={`link-${id}`}
                href={item.linkUrl}
                target="_blank"
                rel="noopener"
              >
                {item.linkTitle}
              </Link>
            </StyledListItem>
          ))}
        </StyledList>
      ) : (
        <StyledNoItemsInfo>
          <InfoOutlinedIcon fontSize="large" />
          <p>Links List Empty</p>
        </StyledNoItemsInfo>
      )}
    </>
  );
};

LinkListWidget.propTypes = {
  linkListItems: array.isRequired
};

LinkListWidget.defaultProps = {
  linkListItems: []
};

export default LinkListWidget;

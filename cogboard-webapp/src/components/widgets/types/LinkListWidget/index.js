import React from 'react';
import { List, ListItem, ListItemText } from "@material-ui/core";
import styled from '@emotion/styled/macro';
import { attachHttp } from "./helpers";

const StyledList = styled(List)`
  margin: 0;
`;

const LinkListWidget = ({links}) => {

  const ListItemLink = (props) => {
    return <ListItem button component="a" divider={true} target="_blank" {...props} />;
  };

  return (
    <StyledList component="nav" data-cy="links-list">
      {
        links.map(({ nameProps, pathProps }) => {
          const title = nameProps.value;
          const link = attachHttp(pathProps.value);
          return (
            <ListItemLink href={link} data-cy="links-list-item">
              <ListItemText primary={title} data-cy="links-list-item-text"/>
            </ListItemLink>
          )
        })}
    </StyledList>
  );
};

export default LinkListWidget;
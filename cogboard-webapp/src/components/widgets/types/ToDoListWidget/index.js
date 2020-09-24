import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { array } from 'prop-types';

import { Typography, FormGroup, FormControlLabel } from '@material-ui/core';

import { postWidgetContentUpdate } from '../../../../utils/fetch';
import { StyledCheckbox } from './styled';

const ToDoListWidget = ({ id, selectedItems }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );

  const handleChangeStatus = evt => {
    postWidgetContentUpdate({
      id,
      selectedItem: evt.target.value
    }); // TODO handle error
  };

  const renderListItem = item => {
    return (
      <FormControlLabel
        key={item.id}
        control={
          <StyledCheckbox
            onChange={handleChangeStatus}
            value={item.id}
            checked={item.itemChecked}
          />
        }
        label={
          <Typography
            variant="subtitle1"
            style={item.itemChecked ? { textDecoration: 'line-through' } : {}}
          >
            {item.itemText}
          </Typography>
        }
      />
    );
  };

  const renderListItems = () => {
    const { toDoListItems } = widgetData;
    let uncheckedItems = [];
    let checkedItems = [];

    if (toDoListItems) {
      toDoListItems.forEach(item => {
        if (selectedItems && selectedItems.includes(item.id)) {
          checkedItems.push({ ...item, itemChecked: true });
        } else {
          uncheckedItems.push({ ...item, itemChecked: false });
        }
      });
    }

    return (
      <>
        {uncheckedItems.map(item => renderListItem(item))}
        {checkedItems.map(item => renderListItem(item))}
      </>
    );
  };

  return <FormGroup column="true">{renderListItems()}</FormGroup>;
};

ToDoListWidget.propTypes = {
  toDoListItems: array.isRequired
};

ToDoListWidget.defaultProps = {
  toDoListItems: []
};

export default ToDoListWidget;
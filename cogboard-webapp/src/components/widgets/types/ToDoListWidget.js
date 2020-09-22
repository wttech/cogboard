import React from 'react';
import { array } from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import { postWidgetContentUpdate } from '../../../utils/fetch';
import { shallowEqual, useSelector } from 'react-redux';
import styled from '@emotion/styled/macro';

const StyledCheckbox = styled(Checkbox)`
  margin-left: 15px;

  &.Mui-checked {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const ToDoListWidget = ({ id, selectedItems }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );

  const handleChangeStatus = evt => {
    postWidgetContentUpdate({
      id,
      selectedItem: evt.target.value
    });
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

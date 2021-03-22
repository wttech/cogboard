import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { array } from 'prop-types';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Typography, FormGroup, FormControlLabel } from '@material-ui/core';

import { postWidgetContentUpdate } from '../../../../utils/fetch';
import { StyledCheckbox } from './styled';
import { StyledNoItemsInfo } from '../../../Widget/styled';

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

  const renderListItem = (id, item) => {
    return (
      <FormControlLabel
        key={item.id}
        control={
          <StyledCheckbox
            onChange={handleChangeStatus}
            value={item.id}
            checked={item.itemChecked}
            inputProps={{
              'data-cy': item.itemChecked
                ? `item-checked-${id}`
                : `item-unchecked-${id}`
            }}
          />
        }
        label={
          <Typography
            variant="caption"
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
        {uncheckedItems.map((item, id) => renderListItem(id, item))}
        {checkedItems.map((item, id) => renderListItem(id, item))}
      </>
    );
  };

  return (
    <>
      {widgetData.toDoListItems && widgetData.toDoListItems.length > 0 ? (
        <FormGroup column="true">{renderListItems()}</FormGroup>
      ) : (
        <StyledNoItemsInfo>
          <InfoOutlinedIcon fontSize="large" />
          <p>List Empty</p>
        </StyledNoItemsInfo>
      )}
    </>
  );
};

ToDoListWidget.propTypes = {
  toDoListItems: array
};

ToDoListWidget.defaultProps = {
  toDoListItems: []
};

export default ToDoListWidget;

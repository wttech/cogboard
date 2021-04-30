import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { remove } from 'ramda';
import { postWidgetContentUpdate } from '../../../utils/fetch';
import { saveWidget } from '../../../actions/thunks';
import { prepareChangeEvent, RenderDragableList } from './helpers';
import { FormControl } from '@material-ui/core';
import { Add, Check, Delete } from '@material-ui/icons';
import { StyledFab, StyledInput, StyledFabGroup } from './styled';

const ToDoListInput = ({ value, values, onChange }) => {
  const [formValueItemText, setFormValueItemText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const content = values.content || {};
  const handleChangeValItemText = event =>
    setFormValueItemText(event.target.value);
  const selectedItems = content.selectedItems || [];
  const widgetId = values.id || '';
  const [items, setItems] = useState(() =>
    (value || []).map(item => {
      return {
        id: item.id,
        itemText: item.itemText
      };
    })
  );

  const resetInput = () => {
    setFormValueItemText('');
  };

  const onSaveClick = () => {
    handleSave({
      itemText: formValueItemText
    });
  };

  const handleSave = item => {
    let updatedItems;

    if (item.itemText.length === 0) {
      return;
    }

    if (editMode) {
      updatedItems = items;
      const updatedItemId = items.findIndex(el => el.id === editMode);
      updatedItems[updatedItemId] = {
        id: updatedItems[updatedItemId].id,
        itemText: item.itemText
      };
      setEditMode(false);
    } else {
      updatedItems = [
        ...items,
        {
          id: `item-${v4()}`,
          itemText: item.itemText
        }
      ];
    }

    setItems(updatedItems);
    onChange(prepareChangeEvent(updatedItems, 'array'));
    resetInput();
  };

  const onInputKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSaveClick();
    }
  };

  const onClearClick = () => {
    if (!selectedItems) return;

    const itemsToClear = new Set(selectedItems);
    const filteredArray = items.filter(obj => !itemsToClear.has(obj.id));
    setItems(filteredArray);
    onChange(prepareChangeEvent(filteredArray, 'array'));

    postWidgetContentUpdate({
      id: widgetId,
      clearItems: true
    });
    dispatch(
      saveWidget({
        widgetId,
        values: { ...values, toDoListItems: filteredArray }
      })
    );
  };

  const handleEdit = id => {
    const editItem = items.find(el => el.id === id);
    setFormValueItemText(editItem.itemText);
    setEditMode(editItem.id);
  };

  const handleDelete = itemIndex => {
    let itemList = remove(itemIndex, 1, items);
    const itemId = items[itemIndex].id;

    setItems(itemList);
    onChange(prepareChangeEvent(itemList, 'array'));

    if (selectedItems.includes(itemId)) {
      postWidgetContentUpdate({
        id: widgetId,
        selectedItem: itemId
      });
      dispatch(
        saveWidget({ widgetId, values: { ...values, toDoListItems: itemList } })
      );
    }
  };

  return (
    <FormControl>
      <StyledInput
        data-cy="item-text"
        placeholder="Item Title"
        margin="normal"
        onChange={handleChangeValItemText}
        onKeyDown={onInputKeyDown}
        value={formValueItemText}
      />
      <StyledFabGroup>
        <StyledFab
          data-cy="add-item"
          onClick={onSaveClick}
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
        >
          {editMode ? (
            <>
              <Check /> Save item
            </>
          ) : (
            <>
              <Add /> Add Item
            </>
          )}
        </StyledFab>
        {selectedItems.length > 0 && (
          <StyledFab
            data-cy="clear-selected-items"
            className="clearButton"
            onClick={onClearClick}
            variant="extended"
            size="small"
            color="primary"
            aria-label="clear selected items"
          >
            <>
              <Delete /> Clear Selected
            </>
          </StyledFab>
        )}
      </StyledFabGroup>
      <RenderDragableList
        items={items}
        setEvent={setItems}
        onChange={onChange}
        prepareChangeEvent={prepareChangeEvent}
        editMode={editMode}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></RenderDragableList>
    </FormControl>
  );
};

export default ToDoListInput;

import React, { useState } from 'react';
import {
  FormControl,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import { Add, Check, Edit, Delete } from '@material-ui/icons';
import { remove } from 'ramda';
import { prepareChangeEvent } from './helpers';
import { StyledFab, StyledList, StyledInput, StyledFabGroup } from './styled';

const ToDoListInput = ({ value, values, onChange }) => {
  const [formValueItemText, setFormValueItemText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const handleChangeValItemText = event =>
    setFormValueItemText(event.target.value);
  console.log(value);
  const selectedItems = values.content ? values.content.selectedItems : [];
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
          id: `item-${items.length + 1}`,
          itemText: item.itemText
        }
      ];
    }
    setItems(updatedItems);
    onChange(prepareChangeEvent(updatedItems, 'array'));
    resetInput();
  };

  const onClearClick = () => {};

  const handleEdit = id => {
    const editItem = items.find(el => el.id === id);
    setFormValueItemText(editItem.itemText);
    setEditMode(editItem.id);
  };

  const handleDelete = itemIndex => {
    let itemList = remove(itemIndex, 1, items);
    setItems(itemList);
    onChange(prepareChangeEvent(itemList, 'array'));
  };

  return (
    <FormControl>
      <StyledInput
        data-cy="item-text"
        placeholder="Item Text"
        margin="normal"
        onChange={handleChangeValItemText}
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
        <StyledFab
          data-cy="clear-selected-items"
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
      </StyledFabGroup>
      <StyledList>
        {items.map((item, index) => (
          <ListItem
            key={item.id}
            dense
            button
            selected={editMode === item.id}
            onClick={() => {
              handleEdit(item.id);
            }}
          >
            <ListItemText
              primary={item.itemText}
              style={
                selectedItems.includes(item.id)
                  ? { textDecoration: 'line-through' }
                  : {}
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Edit"
                disabled={editMode === item.id}
                onClick={() => {
                  handleEdit(item.id);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="Delete"
                disabled={editMode === item.id}
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </StyledList>
    </FormControl>
  );
};

export default ToDoListInput;

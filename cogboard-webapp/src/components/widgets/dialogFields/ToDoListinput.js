import React, { useState } from 'react';
import {
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { remove } from 'ramda';
import { prepareChangeEvent } from './helpers';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import styled from '@emotion/styled/macro';

const StyledInput = styled(Input)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const StyledFab = styled(Fab)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const StyledList = styled(List)`
  margin-top: 16px;
`;

const ToDoListInput = ({ value, onChange }) => {
  const [formValueItemText, setFormValueItemText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const handleChangeValItemText = event =>
    setFormValueItemText(event.target.value);
  const [items, setItems] = useState(() =>
    (value || []).map(item => {
      return {
        id: item.id,
        itemText: item.itemText,
        itemChecked: item.itemChecked
      };
    })
  );

  console.log(items);

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
        itemText: item.itemText,
        itemChecked: updatedItems[updatedItemId].itemChecked
      };
      setEditMode(false);
    } else {
      updatedItems = [
        ...items,
        {
          id: `item-${items.length + 1}`,
          itemText: item.itemText,
          itemChecked: false
        }
      ];
    }
    setItems(updatedItems);
    onChange(prepareChangeEvent(updatedItems, 'array'));
    resetInput();
  };

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
            <CheckIcon /> Save item
          </>
        ) : (
          <>
            <AddIcon /> Add Item
          </>
        )}
      </StyledFab>
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
            <ListItemText primary={item.itemText} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  handleEdit(item.id);
                }}
                aria-label="Edit"
                disabled={editMode === item.id}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                disabled={editMode === item.id}
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </StyledList>
    </FormControl>
  );
};

export default ToDoListInput;

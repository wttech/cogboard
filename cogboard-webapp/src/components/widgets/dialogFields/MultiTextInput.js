import React, { useState } from 'react';
import {
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { remove } from 'ramda';
import { v4 } from 'uuid';
import { prepareChangeEvent } from './helpers';

const MultiTextInput = ({ value, onChange }) => {
  const [items, setItems] = useState(() =>
    (value || []).map(i => {
      return { id: v4(), text: i };
    })
  );
  const [formValue, setFormValue] = useState('');

  const handleChangeVal = event => setFormValue(event.target.value);
  const resetInput = () => setFormValue('');
  const handleDelete = itemIndex => {
    let itemList = remove(itemIndex, 1, items);
    setItems(itemList);
    onChange(prepareChangeEvent(itemList, 'array'));
  };

  const handleSave = itemText => {
    const trimmedText = itemText.trim();
    if (trimmedText.length > 0) {
      const updatedItems = [...items, { id: v4(), text: itemText }];
      const updatedItemsValues = updatedItems.map(item => item.text);
      setItems(updatedItems);
      onChange(prepareChangeEvent(updatedItemsValues, 'array'));
    }
  };

  const handleKeyPressed = (event, _) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!formValue) {
        return false;
      }

      handleSave(formValue);
      resetInput();

      return true;
    }

    return false;
  };

  return (
    <FormControl>
      <TextField
        label="Entries:"
        placeholder="..."
        fullWidth
        margin="normal"
        value={formValue}
        onChange={handleChangeVal}
        onKeyPress={handleKeyPressed}
      />
      <List>
        {items.map((item, index) => (
          <ListItem key={item.id} dense button>
            <ListItemText primary={item.text} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </FormControl>
  );
};

export default MultiTextInput;

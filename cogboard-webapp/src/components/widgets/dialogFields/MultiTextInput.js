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
import { prepareChangeEvent } from './helpers';

const MultiTextInput = ({ value, onChange }) => {
  const [items, setItems] = useState(() => value || []);
  const [formValue, setFormValue] = useState('');

  const handleChangeVal = e => setFormValue(e.target.value);
  const resetInput = () => setFormValue('');
  const handleDelete = itemIndex => {
    let itemList = remove(itemIndex, 1, items);
    setItems(itemList);
    onChange(prepareChangeEvent(itemList, 'array'));
  };

  const handleSave = itemText => {
    const trimmedText = itemText.trim();
    if (trimmedText.length > 0) {
      let updatedItems = [...items, itemText];
      setItems(updatedItems);
      onChange(prepareChangeEvent(updatedItems, 'array'));
    }
  };

  const handleKeyPressed = (e, _) => {
    if (e.which === 13 || e.key === 'Enter') {
      e.preventDefault();

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
          <ListItem key={index.toString()} dense button>
            <ListItemText primary={item} />
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

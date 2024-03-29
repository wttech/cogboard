import React, { useState } from 'react';
import {
  FormControl,
  IconButton,
  InputLabel,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { remove } from 'ramda';
import { v4 } from 'uuid';
import { FlexBoxWrapped, StyledList } from './styled';
import { prepareChangeEvent } from './helpers';
import { Add } from '@material-ui/icons';
import Input from '@material-ui/core/Input';

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
    onChange(
      prepareChangeEvent(
        itemList.map(item => item.text),
        'array'
      )
    );
  };

  const handleSave = itemText => {
    const trimmedText = itemText.trim();
    if (trimmedText.length > 0) {
      const updatedItems = [...items, { id: v4(), text: itemText }];
      const updatedItemsValues = updatedItems.map(item => item.text);
      setItems(updatedItems);
      onChange(prepareChangeEvent(updatedItemsValues, 'array'));
      resetInput();
    }
  };

  const handleKeyPressed = (event, _) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!formValue) {
        return false;
      }

      handleSave(formValue);

      return true;
    }

    return false;
  };

  return (
    <FormControl>
      <FlexBoxWrapped>
        <InputLabel shrink>Entries</InputLabel>
        <Input
          placeholder="..."
          fullWidth
          margin="normal"
          value={formValue}
          onChange={handleChangeVal}
          onKeyPress={handleKeyPressed}
        />
        <Tooltip title="Add new item" placement="bottom">
          <IconButton aria-label="Add" onClick={() => handleSave(formValue)}>
            <Add />
          </IconButton>
        </Tooltip>
      </FlexBoxWrapped>
      <StyledList>
        {items
          .sort((a, b) => a.text.localeCompare(b.text))
          .map((item, index) => (
            <ListItem key={item.id} dense button>
              <ListItemText primary={item.text} />
              <ListItemSecondaryAction>
                <Tooltip title="Delete" placement="bottom">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </StyledList>
    </FormControl>
  );
};

export default MultiTextInput;

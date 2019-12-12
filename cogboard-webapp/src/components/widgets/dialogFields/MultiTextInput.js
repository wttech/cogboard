import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const getArrayValue = value => {
  return value && value.length ? JSON.parse(value) : [];
};
const removeIndex = (array, index) => {
  return array.filter((_, i) => i !== index);
};
const prepareEvent = (array, name) => {
  return {
    target: {
      value: JSON.stringify(array),
      type: name
    }
  };
};

const MultiTextInput = props => {
  const { value, name, onChange } = props;
  const [items, setItems] = useState(() => getArrayValue(value));
  const [formValue, setFormValue] = useState('');

  const onChangeVal = e => setFormValue(e.target.value);
  const resetInput = () => setFormValue('');
  const deleteItem = itemIndex => {
    setItems(removeIndex(items, itemIndex));
  };
  const saveItem = itemText => {
    const trimmedText = itemText.trim();
    if (trimmedText.length > 0) {
      let newVar = [...items, itemText];
      setItems(newVar);
      onChange(prepareEvent(newVar, name));
    }
  };

  return (
    <FormControl>
      <TextField
        label="Entries:"
        placeholder="..."
        fullWidth
        margin="normal"
        value={formValue}
        onChange={onChangeVal}
        onKeyPress={(event, _) => {
          if (event.which === 13 || event.keyCode === 13) {
            event.preventDefault();
            if (!formValue) return false;
            saveItem(formValue);
            resetInput();
            return true;
          }
          return false;
        }}
      />
      <List>
        {items.map((item, index) => (
          <ListItem key={index.toString()} dense button>
            <ListItemText primary={item} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => {
                  deleteItem(index);
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

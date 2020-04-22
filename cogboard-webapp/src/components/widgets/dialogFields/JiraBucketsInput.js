import React, { useState } from 'react';
import {
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { remove } from 'ramda';
import { v4 } from 'uuid';
import { prepareChangeEvent } from './helpers';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';

const JiraBucketsInput = ({ value, onChange }) => {
  const [jqlQueries, setJqlQueries] = useState(() =>
    (value || []).map(i => {
      return { id: v4(), jqlQuery: i };
    })
  );
  const [formValue, setFormValue] = useState('');

  const handleChangeVal = event => setFormValue(event.target.value);
  const resetInput = () => setFormValue('');
  const handleDelete = itemIndex => {
    let itemList = remove(itemIndex, 1, jqlQueries);
    setJqlQueries(itemList);
    onChange(prepareChangeEvent(itemList.map(item => item.jqlQuery), 'array'));
  };

  const handleSave = itemText => {
    const trimmedText = itemText.trim();
    if (trimmedText.length > 0) {
      const updatedItems = [...jqlQueries, { id: v4(), jqlQuery: itemText }];
      const updatedItemsValues = updatedItems.map(item => item.jqlQuery);
      setJqlQueries(updatedItems);
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
      <InputLabel shrink>Buckets</InputLabel>
      <Input placeholder="Bucket Name" margin="normal" />
      <Input
        placeholder="JQL Query"
        margin="normal"
        value={formValue}
        onChange={handleChangeVal}
        onKeyPress={handleKeyPressed}
      />
      <Fab
        onClick={() => handleSave(formValue)}
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
        Add bucket
      </Fab>
      <List>
        {jqlQueries.map((item, index) => (
          <ListItem key={item.id} dense button>
            <ListItemText primary={item.jqlQuery} />
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

export default JiraBucketsInput;

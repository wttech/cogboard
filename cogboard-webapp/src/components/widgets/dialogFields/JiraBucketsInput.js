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
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { remove } from 'ramda';
import { v4 } from 'uuid';
import { prepareChangeEvent } from './helpers';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';

const JiraBucketsInput = ({ value, onChange }) => {
  const [buckets, setBuckets] = useState(() =>
    (value || []).map(i => {
      return { id: v4(), bucketName: i.bucketName, jqlQuery: i.jqlQuery };
    })
  );
  const [formValue, setFormValue] = useState('');
  const [formValueBucket, setFormValueBucket] = useState('');
  const [editMode, setEditMode] = useState(false);
  const handleChangeVal = event => setFormValue(event.target.value);
  const handleChangeValBucket = event => setFormValueBucket(event.target.value);
  const resetInput = () => {
    setFormValue('');
    setFormValueBucket('');
  };
  const handleDelete = itemIndex => {
    let itemList = remove(itemIndex, 1, buckets);
    setBuckets(itemList);
    onChange(
      prepareChangeEvent(
        itemList.map(item => ({
          bucketName: item.bucketName,
          jqlQuery: item.jqlQuery
        })),
        'array'
      )
    );
  };
  const handleSave = items => {
    if (editMode && items.jqlQuery.length && items.bucketName.length) {
      const updatedItemId = buckets.findIndex(el => el.id === editMode);
      const updatedItems = buckets;
      updatedItems[updatedItemId] = {
        bucketName: items.bucketName,
        jqlQuery: items.jqlQuery
      };
      const updatedItemsValues = updatedItems.map(item => ({
        bucketName: item.bucketName,
        jqlQuery: item.jqlQuery
      }));
      setBuckets(updatedItems);
      onChange(prepareChangeEvent(updatedItemsValues, 'array'));
      resetInput();
      setEditMode(false);
    }
    if (!editMode && items.jqlQuery.length && items.bucketName.length) {
      const updatedItems = [
        ...buckets,
        { id: v4(), bucketName: items.bucketName, jqlQuery: items.jqlQuery }
      ];
      const updatedItemsValues = updatedItems.map(item => ({
        bucketName: item.bucketName,
        jqlQuery: item.jqlQuery
      }));
      setBuckets(updatedItems);
      onChange(prepareChangeEvent(updatedItemsValues, 'array'));
      resetInput();
    }
  };
  const handleKeyPressed = (event, items) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!formValue) {
        return false;
      }
      handleSave(items);
      return true;
    }
    return false;
  };
  const handleEdit = id => {
    const editJqlQuery = buckets.find(el => el.id === id);
    setFormValueBucket(editJqlQuery.bucketName);
    setFormValue(editJqlQuery.jqlQuery);
    setEditMode(editJqlQuery.id);
  };
  return (
    <FormControl>
      <InputLabel shrink>Buckets</InputLabel>
      <Input
        placeholder="Bucket Name"
        margin="normal"
        value={formValueBucket}
        onChange={handleChangeValBucket}
        onKeyPress={e =>
          handleKeyPressed(e, {
            jqlQuery: formValue,
            bucketName: formValueBucket
          })
        }
      />
      <Input
        placeholder="JQL Query"
        margin="normal"
        value={formValue}
        onChange={handleChangeVal}
        onKeyPress={e =>
          handleKeyPressed(e, {
            jqlQuery: formValue,
            bucketName: formValueBucket
          })
        }
      />
      <Fab
        onClick={() => {
          handleSave({ jqlQuery: formValue, bucketName: formValueBucket });
        }}
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
      >
        {editMode ? (
          <>
            <CheckIcon /> Edit Bucket
          </>
        ) : (
          <>
            <AddIcon /> Add bucket
          </>
        )}
      </Fab>
      <List>
        {buckets.map((item, index) => (
          <ListItem key={item.id} dense button selected={editMode === item.id}>
            <ListItemText primary={item.bucketName} secondary={item.jqlQuery} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Edit"
                disabled={editMode === item.id}
                onClick={() => {
                  handleEdit(item.id);
                }}
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
      </List>
    </FormControl>
  );
};
export default JiraBucketsInput;

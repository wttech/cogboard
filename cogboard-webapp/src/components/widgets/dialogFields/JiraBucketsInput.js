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
import styled from '@emotion/styled/macro';

const CustomInput = styled(Input)`
  margin-top: 16px;
  margin-bottom: 8px;
`;
const CustomFab = styled(Fab)`
  margin-top: 16px;
  margin-bottom: 8px;
`;
const CustomList = styled(List)`
  margin-top: 16px;
`;

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
  const handleDelete = bucketIndex => {
    let bucketList = remove(bucketIndex, 1, buckets);
    setBuckets(bucketList);
    onChange(prepareChangeEvent(bucketList, 'array'));
  };
  const handleSave = buckets => {
    if (editMode && buckets.jqlQuery.length && buckets.bucketName.length) {
      const updatedBucketId = buckets.findIndex(el => el.id === editMode);
      const updatedBuckets = buckets;
      updatedBuckets[updatedBucketId] = {
        id: buckets.id,
        bucketName: buckets.bucketName,
        jqlQuery: buckets.jqlQuery
      };
      setBuckets(updatedBuckets);
      onChange(prepareChangeEvent(updatedBuckets, 'array'));
      resetInput();
      setEditMode(false);
    }
    if (!editMode && buckets.jqlQuery.length && buckets.bucketName.length) {
      const updatedBuckets = [
        ...buckets,
        { id: v4(), bucketName: buckets.bucketName, jqlQuery: buckets.jqlQuery }
      ];
      setBuckets(updatedBuckets);
      onChange(prepareChangeEvent(updatedBuckets, 'array'));
      resetInput();
    }
  };
  const handleKeyPressed = (event, buckets) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!formValue) {
        return false;
      }
      handleSave(buckets);
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
      <CustomInput
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
      <CustomInput
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
      <CustomFab
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
            <CheckIcon /> Save Bucket
          </>
        ) : (
          <>
            <AddIcon /> Add bucket
          </>
        )}
      </CustomFab>
      <CustomList>
        {buckets.map((bucket, index) => (
          <ListItem
            onClick={() => {
              handleEdit(bucket.id);
            }}
            key={bucket.id}
            dense
            button
            selected={editMode === bucket.id}
          >
            <ListItemText primary={bucket.bucketName} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Edit"
                disabled={editMode === bucket.id}
                onClick={() => {
                  handleEdit(bucket.id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                disabled={editMode === bucket.id}
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </CustomList>
    </FormControl>
  );
};
export default JiraBucketsInput;

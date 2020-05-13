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
    (value || []).map(bucket => {
      return {
        id: v4(),
        bucketName: bucket.bucketName,
        jqlQuery: bucket.jqlQuery
      };
    })
  );
  const [formValueJqlQuery, setFormValueJqlQuery] = useState('');
  const [formValueBucketName, setFormValueBucketName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const handleChangeValJqlQuery = event =>
    setFormValueJqlQuery(event.target.value);
  const handleChangeValBucketName = event =>
    setFormValueBucketName(event.target.value);
  const resetInput = () => {
    setFormValueJqlQuery('');
    setFormValueBucketName('');
  };
  const handleDelete = itemIndex => {
    let itemList = remove(itemIndex, 1, buckets);
    setBuckets(itemList);
    onChange(prepareChangeEvent(itemList, 'array'));
  };
  const handleSave = items => {
    if (editMode && items.jqlQuery.length && items.bucketName.length) {
      const updatedItemId = buckets.findIndex(el => el.id === editMode);
      const updatedItems = buckets;
      updatedItems[updatedItemId] = {
        id: v4(),
        bucketName: items.bucketName,
        jqlQuery: items.jqlQuery
      };
      setBuckets(updatedItems);
      onChange(prepareChangeEvent(updatedItems, 'array'));
      resetInput();
      setEditMode(false);
    }
    if (!editMode && items.jqlQuery.length && items.bucketName.length) {
      const updatedItems = [
        ...buckets,
        { id: v4(), bucketName: items.bucketName, jqlQuery: items.jqlQuery }
      ];
      setBuckets(updatedItems);
      onChange(prepareChangeEvent(updatedItems, 'array'));
      resetInput();
    }
  };
  const handleKeyPressed = (event, _) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!formValueJqlQuery) {
        return false;
      }
      handleSave({
        id: v4(),
        jqlQuery: formValueJqlQuery,
        bucketName: formValueBucketName
      });
      return true;
    }
    return false;
  };
  const handleEdit = id => {
    const editJqlQuery = buckets.find(el => el.id === id);
    setFormValueJqlQuery(editJqlQuery.jqlQuery);
    setFormValueBucketName(editJqlQuery.bucketName);
    setEditMode(editJqlQuery.id);
  };
  return (
    <FormControl>
      <CustomInput
        data-cy="bucket-name"
        placeholder="Bucket Name"
        margin="normal"
        value={formValueBucketName}
        onChange={handleChangeValBucketName}
        onKeyPress={handleKeyPressed}
      />
      <CustomInput
        data-cy="jql-query"
        placeholder="JQL Query"
        margin="normal"
        value={formValueJqlQuery}
        onChange={handleChangeValJqlQuery}
        onKeyPress={handleKeyPressed}
      />
      <CustomFab
        data-cy="add-bucket"
        onClick={() => {
          handleSave({
            id: v4(),
            jqlQuery: formValueJqlQuery,
            bucketName: formValueBucketName
          });
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
        {buckets.map((item, index) => (
          <ListItem
            key={item.id}
            dense
            button
            selected={editMode === item.id}
            onClick={() => {
              handleEdit(item.id);
            }}
          >
            <ListItemText primary={item.bucketName} />
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
      </CustomList>
    </FormControl>
  );
};
export default JiraBucketsInput;

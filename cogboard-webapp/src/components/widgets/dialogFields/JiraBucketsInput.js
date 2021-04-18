import React, { useState } from 'react';
import { remove } from 'ramda';
import { v4 } from 'uuid';
import { prepareChangeEvent, RenderDragableList } from './helpers';
import { FormControl } from '@material-ui/core';
import { Add, Check } from '@material-ui/icons';
import { StyledInput, StyledFab } from './styled';

const JiraBucketsInput = ({ value, onChange }) => {
  const [formValueJqlQuery, setFormValueJqlQuery] = useState('');
  const [formValueBucketName, setFormValueBucketName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const handleChangeValJqlQuery = event =>
    setFormValueJqlQuery(event.target.value);
  const handleChangeValBucketName = event =>
    setFormValueBucketName(event.target.value);

  const [buckets, setBuckets] = useState(() =>
    (value || []).map(bucket => {
      return {
        id: v4(),
        bucketName: bucket.bucketName,
        jqlQuery: bucket.jqlQuery
      };
    })
  );

  const resetInput = () => {
    setFormValueJqlQuery('');
    setFormValueBucketName('');
  };

  const onSaveClick = () => {
    handleSave({
      id: v4(),
      jqlQuery: formValueJqlQuery,
      bucketName: formValueBucketName
    });
  };

  const handleSave = bucket => {
    let updatedItems;

    if (bucket.jqlQuery.length === 0 || bucket.bucketName.length === 0) {
      return;
    }

    if (editMode) {
      updatedItems = buckets;
      const updatedItemId = buckets.findIndex(el => el.id === editMode);
      updatedItems[updatedItemId] = {
        id: v4(),
        bucketName: bucket.bucketName,
        jqlQuery: bucket.jqlQuery
      };
      setEditMode(false);
    } else {
      updatedItems = [
        ...buckets,
        { id: v4(), bucketName: bucket.bucketName, jqlQuery: bucket.jqlQuery }
      ];
    }

    setBuckets(updatedItems);
    onChange(prepareChangeEvent(updatedItems, 'array'));
    resetInput();
  };

  const handleDelete = itemIndex => {
    const itemList = remove(itemIndex, 1, buckets);
    setBuckets(itemList);
    onChange(prepareChangeEvent(itemList, 'array'));
  };

  const handleKeyPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!formValueJqlQuery) {
        return;
      }

      handleSave({
        id: v4(),
        jqlQuery: formValueJqlQuery,
        bucketName: formValueBucketName
      });
    }

    return;
  };

  const handleEdit = id => {
    const editJqlQuery = buckets.find(el => el.id === id);
    setFormValueJqlQuery(editJqlQuery.jqlQuery);
    setFormValueBucketName(editJqlQuery.bucketName);
    setEditMode(editJqlQuery.id);
  };

  return (
    <FormControl>
      <StyledInput
        data-cy="bucket-name"
        placeholder="Bucket Name"
        margin="normal"
        value={formValueBucketName}
        onChange={handleChangeValBucketName}
        onKeyPress={handleKeyPressed}
      />
      <StyledInput
        data-cy="jql-query"
        placeholder="JQL Query"
        margin="normal"
        value={formValueJqlQuery}
        onChange={handleChangeValJqlQuery}
        onKeyPress={handleKeyPressed}
      />
      <StyledFab
        data-cy="add-bucket"
        onClick={onSaveClick}
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
      >
        {editMode ? (
          <>
            <Check /> Save Bucket
          </>
        ) : (
          <>
            <Add /> Add bucket
          </>
        )}
      </StyledFab>
      <RenderDragableList
        items={buckets}
        setEvent={setBuckets}
        onChange={onChange}
        prepareChangeEvent={prepareChangeEvent}
        editMode={editMode}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></RenderDragableList>
    </FormControl>
  );
};

export default JiraBucketsInput;

import React, { useState } from 'react';
import { remove } from 'ramda';
import { v4 } from 'uuid';
import { prepareChangeEvent } from './helpers';
import { hasError } from '../../../utils/components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip
} from '@material-ui/core';
import { Add, Edit, Check, Delete, Error } from '@material-ui/icons';
import {
  StyledFab,
  StyledInput,
  StyledList,
  StyledFormControl
} from './styled';
import { StyledFormHelperText } from '../../styled';

const LinkListInput = ({ value, onChange }) => {
  const [formValueTitle, setFormValueTitle] = useState('');
  const [formValueUrl, setFormValueUrl] = useState('');
  const [formError, setFormError] = useState();
  const [urlError, setUrlError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleChangeTitle = event => setFormValueTitle(event.target.value);
  const handleChangeUrl = event => {
    if (!event.target.value.match(/^(http|https|ws|ftp):\/\/.*([:.]).*/)) {
      setUrlError(true);
    } else {
      setUrlError(false);
    }

    setFormValueUrl(event.target.value);
  };

  const [linkList, setLinkList] = useState(() =>
    (value || []).map(linkItem => {
      return {
        id: linkItem.id,
        linkTitle: linkItem.linkTitle,
        linkUrl: linkItem.linkUrl
      };
    })
  );

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    const tempItems = linkList;
    const [reorderedItem] = tempItems.splice(result.source.index, 1);
    tempItems.splice(result.destination.index, 0, reorderedItem);

    setLinkList(tempItems);
    onChange(prepareChangeEvent(tempItems, 'array'));
  };

  const resetInput = () => {
    setFormValueTitle('');
    setFormValueUrl('');
  };

  const onSaveClick = () => {
    handleSave({
      linkTitle: formValueTitle,
      linkUrl: formValueUrl
    });
  };

  const handleSave = linkItem => {
    let updatedItems;

    if (urlError) {
      return;
    } else if (
      linkItem.linkUrl.length === 0 ||
      linkItem.linkTitle.length === 0
    ) {
      setFormError('Fill Title and Url field');
      return;
    } else {
      setFormError(undefined);
    }

    if (editMode) {
      updatedItems = linkList;
      const updatedItemId = linkList.findIndex(el => el.id === editMode);
      updatedItems[updatedItemId] = {
        id: updatedItems[updatedItemId].id,
        linkTitle: linkItem.linkTitle,
        linkUrl: linkItem.linkUrl
      };
      setEditMode(false);
    } else {
      updatedItems = [
        ...linkList,
        { id: v4(), linkTitle: linkItem.linkTitle, linkUrl: linkItem.linkUrl }
      ];
    }

    setLinkList(updatedItems);
    onChange(prepareChangeEvent(updatedItems, 'array'));
    resetInput();
  };

  const handleDelete = itemIndex => {
    const itemList = remove(itemIndex, 1, linkList);
    setLinkList(itemList);
    onChange(prepareChangeEvent(itemList, 'array'));
  };

  const handleKeyPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!formValueUrl) {
        return;
      }

      handleSave({
        id: v4(),
        linkUrl: formValueUrl,
        linkTitle: formValueTitle
      });
    }

    return;
  };

  const handleEdit = id => {
    const editItem = linkList.find(el => el.id === id);
    setFormValueTitle(editItem.linkTitle);
    setFormValueUrl(editItem.linkUrl);
    setEditMode(editItem.id);
  };

  return (
    <StyledFormControl error={hasError(formError) || urlError}>
      {formError && (
        <StyledFormHelperText>
          <Error />
          {formError}
        </StyledFormHelperText>
      )}
      <StyledInput
        data-cy="link-title"
        placeholder="Link Title"
        margin="normal"
        value={formValueTitle}
        onChange={handleChangeTitle}
        onKeyPress={handleKeyPressed}
      />
      <StyledInput
        data-cy="link-url"
        placeholder="Link Url"
        margin="normal"
        value={formValueUrl}
        onChange={handleChangeUrl}
        onKeyPress={handleKeyPressed}
      />
      {urlError && (
        <StyledFormHelperText>
          <Error />
          Invalid Url
        </StyledFormHelperText>
      )}
      <StyledFab
        data-cy="add-link-item"
        onClick={onSaveClick}
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
      >
        {editMode ? (
          <>
            <Check /> Save Link
          </>
        ) : (
          <>
            <Add /> Add Link
          </>
        )}
      </StyledFab>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {provided => (
            <StyledList {...provided.droppableProps} ref={provided.innerRef}>
              {linkList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {provided => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={item.id}
                      dense
                      button
                      selected={editMode === item.id}
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    >
                      <ListItemText primary={item.linkTitle} />
                      <ListItemSecondaryAction>
                        <Tooltip title="Edit" placement="bottom">
                          <IconButton
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                            aria-label="Edit"
                            disabled={editMode === item.id}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement="bottom">
                          <IconButton
                            aria-label="Delete"
                            disabled={editMode === item.id}
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledList>
          )}
        </Droppable>
      </DragDropContext>
    </StyledFormControl>
  );
};

export default LinkListInput;

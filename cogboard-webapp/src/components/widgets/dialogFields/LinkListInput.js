import React, { useState } from 'react';
import { remove } from 'ramda';
import { v4 } from 'uuid';
import { prepareChangeEvent } from './helpers';
import {
  FormControl,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import { Add, Edit, Check, Delete } from '@material-ui/icons';
import { StyledFab, StyledInput, StyledList } from './styled';

const LinkListInput = ({ value, onChange }) => {
  const [formValueLinkTitle, setFormValueLinkTitle] = useState('');
  const [formValueLinkHref, setFormValueLinkHref] = useState('');
  const [editMode, setEditMode] = useState(false);
  const handleChangeLinkTitle = event => setFormValueLinkTitle(event.target.value);
  const handleChangeLinkHref = event => setFormValueLinkHref(event.target.value);

  const [linkList, setLinkList] = useState(() =>
    (value || []).map(linkItem => {
      return {
        id: v4(),
        linkTitle: linkItem.linkTitle,
        linkHref: linkItem.linkHref
      };
    })
  );

  const resetInput = () => {
    setFormValueLinkTitle('');
    setFormValueLinkHref('');
  };

  const onSaveClick = () => {
    handleSave({
      id: v4(),
      linkTitle: formValueLinkTitle,
      linkHref: formValueLinkHref
    });
  }

  const handleSave = linkItem => {
    let updatedItems;
    if (linkItem.linkHref.length === 0 || linkItem.linkTitle.length === 0) {
      return;
    }
    if (editMode) {
      updatedItems = linkList;
      const updatedItemId = linkList.findIndex(el => el.id === editMode);
      updatedItems[updatedItemId] = {
        id: v4(),
        linkTitle: linkItem.linkTitle,
        linkHref: linkItem.linkHref
      };
      setEditMode(false);
    } else {
      updatedItems = [
        ...linkList,
        { id: v4(), linkTitle: linkItem.linkTitle, linkHref: linkItem.linkHref }
      ];
    }
    setLinkList(updatedItems);
    onChange(prepareChangeEvent(updatedItems, 'array'))
    resetInput()
  };

  const handleDelete = itemIndex => {
    let itemList = remove(itemIndex, 1, linkList);
    setLinkList(itemList);
    onChange(prepareChangeEvent(itemList, 'array'));
  };

  const handleKeyPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!formValueLinkHref) {
        return;
      }

      handleSave({
        id: v4(),
        linkHref: formValueLinkHref,
        linkTitle: formValueLinkTitle
      });

      return;
    }

    return;
  };

  const handleEdit = id => {
    const editItem = linkList.find(el => el.id === id);
    setFormValueLinkTitle(editItem.linkTitle);
    setFormValueLinkHref(editItem.linkHref);
    setEditMode(editItem.id);
  };

  return (
    <FormControl>
      <StyledInput
        data-cy="link-title"
        placeholder="Link Title"
        margin="normal"
        value={formValueLinkTitle}
        onChange={handleChangeLinkTitle}
        onKeyPress={handleKeyPressed}
      />
      <StyledInput
        data-cy="link-href"
        placeholder="Link Href"
        margin="normal"
        value={formValueLinkHref}
        onChange={handleChangeLinkHref}
        onKeyPress={handleKeyPressed}
      />
      <StyledFab
        data-cy="add-link-tiem"
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
      <StyledList>
        {linkList.map((item, index) => (
          <ListItem
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
              <IconButton
                onClick={() => {
                  handleEdit(item.id);
                }}
                aria-label="Edit"
                disabled={editMode === item.id}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="Delete"
                disabled={editMode === item.id}
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </StyledList>
    </FormControl>
  );
};

export default LinkListInput;

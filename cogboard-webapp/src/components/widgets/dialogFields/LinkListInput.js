import React, { useState } from 'react';
import { remove } from 'ramda';
import { v4 } from 'uuid';
import { prepareChangeEvent, RenderDragableList } from './helpers';
import { hasError } from '../../../utils/components';
import { Add, Check, Error } from '@material-ui/icons';
import { StyledFab, StyledInput, StyledFormControl } from './styled';
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
      <RenderDragableList
        items={linkList}
        setEvent={setLinkList}
        onChange={onChange}
        prepareChangeEvent={prepareChangeEvent}
        editMode={editMode}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></RenderDragableList>
    </StyledFormControl>
  );
};

export default LinkListInput;

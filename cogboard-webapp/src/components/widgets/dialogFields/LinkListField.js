import React, {useState} from 'react';

import {Divider, IconButton} from '@material-ui/core';
import {Add, Delete} from '@material-ui/icons';
import TextInput from "./TextInput";
import {deepCopy} from "../../helpers";

const blankProps = {
  nameProps: {
    name: 'name',
    label: 'Name',
    value: "",
    placeholder: "Link name..."
  },
  pathProps: {
    name: 'path',
    label: 'Path',
    value: "",
    placeholder: "Example: www.google.com"
  }
};

const LinkListField = ({ handleChangeWithValue, value }) => {
  const initDialogLinks = value || [deepCopy(blankProps)];
  const [dialogLinks, setDialogsLinks] = useState(initDialogLinks);

  const handleAddButtonClick = () => {
    setDialogsLinks([...dialogLinks, deepCopy(blankProps)]);
    handleChangeWithValue(dialogLinks);
  };

  const handleDeleteButtonClick = (index) => () => {
    dialogLinks.splice(index, 1);
    setDialogsLinks([...dialogLinks]);
    handleChangeWithValue(dialogLinks);
  };

  const onFormChange = (event, index) => {
    const targetName = event.target.name + 'Props';
    dialogLinks[index][targetName].value = event.target.value;
    setDialogsLinks([...dialogLinks]);
    handleChangeWithValue(dialogLinks);
  };

  return (
    <>
      {
        dialogLinks.map((properties, index) => {
          const {nameProps, pathProps} = properties;
          return (
            <>
              <TextInput
                onChange={(event) => {
                  onFormChange(event, index)
                }}
                {...nameProps}
              />
              <TextInput
                onChange={(event) => {
                  onFormChange(event, index)
                }}
                {...pathProps}
              />
              <IconButton
                onClick={handleDeleteButtonClick(index)}
                color='primary'
                label='delete'
                data-cy={'button-delete-link-' + index}
              >
                <Delete edge="start"/>
              </IconButton>
              <Divider/>
            </>)
        })}
      <IconButton
        onClick={handleAddButtonClick}
        color='primary'
        label='Add'
        data-cy='button-add-link'
      >
        <Add/>
      </IconButton>
    </>
  );
};

export default LinkListField;
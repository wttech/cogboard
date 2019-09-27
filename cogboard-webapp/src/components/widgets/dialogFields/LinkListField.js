import React, {useState} from 'react';

import {Divider, IconButton} from '@material-ui/core';
import {Add, Delete} from '@material-ui/icons';
import TextInput from "./TextInput";

const blankProps = {
  nameProps: {
    name: 'name',
    label: 'Name',
    value: "",
  },
  pathProps: {
    name: 'path',
    label: 'Path',
    value: "",
  }
};

const LinkListField = ({ links }) => {
  if (!links || !links.length) {
    links.push(JSON.parse(JSON.stringify(blankProps)))
  }
  const [dialogLinks, setDialogsLinks] = useState(links);

  const handleAddButtonClick = () => {
    setDialogsLinks([...dialogLinks, JSON.parse(JSON.stringify(blankProps))])
  };

  const handleDeleteButtonClick = (index) => () => {
    dialogLinks.splice(index, 1);
    setDialogsLinks([...dialogLinks])
  };

  const onInputChange = (event, index) => {
    const targetName = event.target.name + 'Props';
    dialogLinks[index][targetName].value = event.target.value;
    setDialogsLinks([...dialogLinks])
  };

  return (
    <>
      {
        dialogLinks.map((properties, index) => {
          const {nameProps, pathProps} = properties;
          return (
            <>
              <TextInput
                onChange={(event) => onInputChange(event, index)}
                {...nameProps}
              />
              <TextInput
                onChange={(event) => onInputChange(event, index)}
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
import React, {useState} from 'react';

import { TextField, IconButton, Divider } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';

const LinkListField = props => {
  const {links} = props;
  const [dialogLinks, setDialogsLinks] = useState(links);

  const handleAddButtonClick = () => {
    setDialogsLinks([...dialogLinks,
      {
        nameProps: {
          name: 'name',
          label: 'Name',

        },
        pathProps: {
          name: 'path',
          label: 'Path',
        },
      }])
  };

  const handleDeleteButtonClick = (index) => () => {
    dialogLinks.splice(index,1);
    setDialogsLinks([...dialogLinks])
  };

  const onInputChange = (event, index) => {
    dialogLinks[index][event.target.name+'Props'].value = event.target.value;
    setDialogsLinks([...dialogLinks])
  };

  return (
      <>
        {
          dialogLinks.map((properties, index) => {
            const {nameProps, pathProps} = properties;
            return (
                <>
                  <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => onInputChange(event, index)}
                      margin="normal"
                      {...nameProps}
                  />
                  <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => onInputChange(event, index)}
                      margin="normal"
                      {...pathProps}
                  />
                  <IconButton
                      onClick={handleDeleteButtonClick(index)}
                      color='primary'
                      alignItems="right"
                      label='delete'
                      myProp={index}
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
        >
          <Add/>
        </IconButton>
      </>
  );
};

export default LinkListField;
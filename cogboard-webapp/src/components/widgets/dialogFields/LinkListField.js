import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import {IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider'

const LinkListField = props => {
  const {links} = props;
  const [dialogLinks, setDialogsLinks] = useState(links)

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
  }

  const handleDeleteButtonClick = (index) => () => {
    dialogLinks.splice(index,1)
    setDialogsLinks([...dialogLinks])
  }

  const onInputChange = (event, index) => {
    dialogLinks[index][event.target.name+'Props'].value = event.target.value;
    setDialogsLinks([...dialogLinks])
  }

  return (
      <>
        {
          dialogLinks.map((properties, index) => {
            const {nameProps, pathProps} = properties
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
                    <DeleteIcon edge="start"/>
                  </IconButton>
                  <Divider/>

                </>)
          })}
        <IconButton
            onClick={handleAddButtonClick}
            color='primary'
            label='Add'
        >
          <AddIcon/>
        </IconButton>
      </>
  );
};

export default LinkListField;
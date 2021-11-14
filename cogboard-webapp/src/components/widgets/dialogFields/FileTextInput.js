import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { StyledValidationMessages } from '../../WidgetForm/styled';
import {
  DeleteButton,
  StyledHorizontalStack,
  StyledLabel,
  StyledVerticalStack
} from './styled';

const FileTextInput = ({ error, dataCy, onChange }) => {
  const [filename, setFilename] = useState('');

  const getFileContents = async event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async event => {
      const text = event.target.result;
      event.target.value = text;
      onChange(event);
    };
    reader.readAsText(file);
    setFilename(file.name);
  };

  const deleteFile = event => {
    event.preventDefault();
    setFilename('');
    event.target.value = '';
    onChange(event);
  };

  const fileInfo =
    filename === '' ? null : (
      <StyledHorizontalStack>
        <p>{filename}</p>
        <DeleteButton variant="contained" onClick={e => deleteFile(e)}>
          Delete
        </DeleteButton>
      </StyledHorizontalStack>
    );

  return (
    <StyledVerticalStack>
      <StyledLabel>SSH Key</StyledLabel>
      <StyledHorizontalStack>
        <Button variant="contained" component="label">
          Upload a File
          <input type="file" hidden onChange={e => getFileContents(e)} />
        </Button>
        {fileInfo}
      </StyledHorizontalStack>
      <StyledValidationMessages messages={error} data-cy={`${dataCy}-error`} />
    </StyledVerticalStack>
  );
};

export default FileTextInput;

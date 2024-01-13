import React, { useState, useRef } from 'react';

import { Button, IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { StyledValidationMessages } from '../../WidgetForm/styled';
import {
  StyledHorizontalStack,
  StyledLabel,
  StyledVerticalStack
} from './styled';

const FileTextInput = ({ error, dataCy, onChange }) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef(null);

  const getFileContents = async event => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async event => {
        const text = event.target.result;
        event.target.value = text;
        onChange(event);
      };
      reader.readAsText(file);
      setFilename(file.name);
    }
  };

  const deleteFile = event => {
    event.preventDefault();
    inputRef.current.value = null;
    setFilename('');
    event.target.value = '';
    onChange(event);
  };

  return (
    <StyledVerticalStack>
      <StyledLabel>SSH private key</StyledLabel>
      <StyledHorizontalStack>
        <Button variant="contained" component="label">
          {filename || `Upload a File`}
          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={e => getFileContents(e)}
          />
        </Button>
        {filename && (
          <Tooltip title="Delete" placement="bottom">
            <IconButton onClick={e => deleteFile(e)}>
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </StyledHorizontalStack>
      <StyledValidationMessages
        className={'Mui-error MuiFormHelperText-root'}
        messages={error}
        data-cy={`${dataCy}-error`}
      />
    </StyledVerticalStack>
  );
};

export default FileTextInput;

import React from 'react';
import { string, number } from 'prop-types';
import styled from '@emotion/styled/macro';

import { useFormData } from '../hooks';

import { FormControl, TextField } from '@material-ui/core';

const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;
`;

const BoardForm = ({ renderActions, ...initialFormValues }) => {
  const { values, handleChange } = useFormData(initialFormValues);

  return (
    <>
      <StyledFieldset component="fieldset">
        <TextField
          onChange={handleChange('title')}
          id="title"
          InputLabelProps={{
            shrink: true
          }}
          label="Title"
          margin="normal"
          value={values.title}
        />
        <TextField
          onChange={handleChange('columns')}
          id="columns"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: 1
          }}
          label="Columns"
          margin="normal"
          value={values.columns}
          type="number"
        />
      </StyledFieldset>
      {renderActions(values)}
    </>
  );
};

BoardForm.propTypes = {
  columns: number,
  title: string,
};

BoardForm.defaultProps = {
  columns: 8,
  title: 'Board',
};

export default BoardForm;
import React from 'react';
import styled from '@emotion/styled/macro';


const FormMessages = ({className, messages}) => {
  return (
    <ul className={className}>
      {
        messages.map(message => 
            <li>{message}</li>)
      }
    </ul>
  )
}

const StyledFormMessages = styled(FormMessages)`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export default StyledFormMessages;
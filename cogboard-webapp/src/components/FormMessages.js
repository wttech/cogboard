import React from 'react';
import styled from '@emotion/styled/macro';


const FormMessages = ({className, messages, ...others}) => {

  if (messages) {
    return (
      <ul className={className} {...others}>
        {
          messages.map(message => 
              <li>{message}</li>)
        }
      </ul> 
    );
  } else {
    return null;
  }
}

const StyledFormMessages = styled(FormMessages)`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export default StyledFormMessages;
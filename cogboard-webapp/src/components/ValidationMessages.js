import React from 'react';


const ValidationMessages = ({className, messages, ...others}) => {

  if (messages === undefined) {
    return null;
  }

  return (
    <ul className={className} {...others}>
      {
        messages.map((message, index) => 
            <li key={index}>{message}</li>)
      }
    </ul> 
  );
}

export default ValidationMessages;
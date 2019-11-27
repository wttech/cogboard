import React from 'react';

const ValidationMessages = ({ className, messages, ...others }) => (
  <>
    {messages !== undefined && (
      <ul className={className} {...others}>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    )}
  </>
);

export default ValidationMessages;

import React from 'react';
import { Error } from '@material-ui/icons';

const ValidationMessages = ({ className, messages, ...others }) => (
  <>
    {messages !== undefined && (
      <ul className={className} {...others}>
        {messages.map((message, index) => (
          <li key={index}>
            <Error />
            {message}
          </li>
        ))}
      </ul>
    )}
  </>
);

export default ValidationMessages;

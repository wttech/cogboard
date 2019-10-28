import { useEffect, useRef, useState } from 'react';

import { splitPropsGroupName } from '../helpers';

export const useToggle = (initialState = false) => {
  const [isOpened, setOpened] = useState(initialState);

  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  return [isOpened, handleOpen, handleClose];
};

export const useFormData = (data) => {
  const [values, setValues] = useState(data);

  const setFieldValue = (fieldName, fieldValue) => {
    const [groupName, propName] = splitPropsGroupName(fieldName);

    if (groupName) {
      const groupValues = values[groupName];

      setValues({
        ...values,
        [groupName]: { ...groupValues, [propName]: fieldValue }
      });

      return;
    }

    setValues({ ...values, [propName]: fieldValue});
  };

  const handleChange = fieldName => event => {
    const { target: { type, value, checked } } = event;
    const valueType = {
      checkbox: checked,
      number: Number(value),
    };
    const fieldValue = valueType[type] !== undefined ? valueType[type] : value;

    setFieldValue(fieldName, fieldValue);
  };

  return { values, handleChange };
};

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

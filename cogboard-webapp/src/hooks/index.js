import { useEffect, useRef, useState } from 'react';

import { splitPropsGroupName } from '../components/helpers';
import useForm from 'react-hook-form';

export const useToggle = () => {
  const [isOpened, setOpened] = useState(false);

  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  return [isOpened, handleOpen, handleClose];
};

export const useFormData = (data) => {
  // const [values, setValues] = useState(data);

  const { register, setValues, values, errors } = useForm;

  for (const key in Object.keys(data)) {
    register({name: key});
    setValues(key, data[key]);
  }

  // const setFieldValue = (fieldName, fieldValue) => {
  //   const [groupName, propName] = splitPropsGroupName(fieldName);

  //   if (groupName) {
  //     const groupValues = values[groupName];

  //     setValues({
  //       ...values,
  //       [groupName]: { ...groupValues, [propName]: fieldValue }
  //     });

  //     return;
  //   }

  //   setValues({ ...values, [propName]: fieldValue});
  // };

  const handleChange = fieldName => event => {
    const { target: { type, value, checked } } = event;
    const valueType = {
      checkbox: checked,
      number: Number(value),
    };
    const fieldValue = valueType[type] !== undefined ? valueType[type] : value;

    setValues(fieldName, fieldValue)
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

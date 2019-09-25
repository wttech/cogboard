import { useEffect, useRef, useState } from 'react';

import { splitPropsGroupName, parseYupErrors } from '../components/helpers';

export const useToggle = () => {
  const [isOpened, setOpened] = useState(false);

  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  return [isOpened, handleOpen, handleClose];
};

export const useFormData = (data, validationSchema=null) => {
  const [values, setValues] = useState(data);

  const [status, setStatus] = useState({
    submited: false,
    onChange: false,
  })

  const [errors, setErrors] = useState({});

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

    const newValues = { ...values, [propName]: fieldValue};
    validateField(fieldName, newValues);

    setValues(newValues);
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

  const validateField = (fieldName, fieldsValues) => {
    if (status.submited || status.onChange) {
      validationSchema.validateAt(fieldName, fieldsValues, {abortEarly: false})
        .then(() => {
          if (fieldName in errors) {
            const errorsTmp = {...errors}
            delete errorsTmp[fieldName]
            setErrors(errorsTmp)
          }
        }).catch(e => {
          setErrors({...errors, ...parseYupErrors(e)})
        })
    }
  }

  const handleSubmit = func => event => {
    event.preventDefault();
    setStatus({...status, submited: true})
    if(validationSchema) {
      validationSchema.validate(values, {abortEarly: false})
        .then(value => {
          func(value);
        })
        .catch(errors => {
          setErrors(parseYupErrors(errors))
        })
    } else {
      func(values);
    }
  }

  return { values, handleChange, handleSubmit, errors };
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

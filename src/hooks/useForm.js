import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, validations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState])

  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])


  const isFormValid = useMemo(() => {
    for (const value of Object.keys(formValidation)) {
      if (formValidation[value] !== null) return false;
    }
    return true;
  }, [formValidation])


  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value //computed properties accessor
    });
  };

  const resetForm = () => { setFormState(initialForm) }

  const createValidators = () => {
    const checkedValues = {};

    for (const field of Object.keys(validations)) {
      const [fn, errorMessage] = validations[field]
      checkedValues[`${field}Valid`] = fn(formState[field]) ? null : errorMessage;
    }

    setFormValidation(checkedValues);
    // console.log(checkedValues);
  }

  return {
    ...formState, formState, onInputChange, resetForm,
    ...formValidation, isFormValid
  };
}
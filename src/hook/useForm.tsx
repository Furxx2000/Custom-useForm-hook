import { useState, useEffect } from 'react';

interface LoginReq {
  account: string;
  pwd: string;
}

interface ValidationRule {
  account: (v: string) => boolean;
  pwd: (v: string) => boolean;
}

interface Validation {
  account: {
    isError: boolean;
    error: string;
  };
  pwd: {
    isError: boolean;
    error: string;
  };
  allFieldsValid: () => boolean;
}

export function useForm(loginReq: LoginReq, validationRule: ValidationRule) {
  const [account, setAccount] = useState(loginReq.account);
  const [pwd, setPwd] = useState(loginReq.pwd);
  const [validationResult, setValidationResult] = useState<Validation>({
    account: {
      isError: false,
      error: 'Please enter at least 9 characters',
    },
    pwd: {
      isError: false,
      error: 'Please enter at least 13 characters',
    },
    allFieldsValid: () => {
      let isValid = true;

      if (!validationRule.account(account)) {
        console.log(account);
        isValid = false;
        const newValidationResult = {
          ...validationResult,
          account: {
            ...validationResult.account,
            isError: true,
          },
        };
        setValidationResult(newValidationResult);
        return isValid;
      }

      if (!validationRule.pwd(pwd)) {
        isValid = false;
        const newValidationResult = {
          ...validationResult,
          pwd: {
            ...validationResult.pwd,
            isError: true,
          },
        };
        setValidationResult(newValidationResult);
        return isValid;
      }

      return isValid;
    },
  });

  function handleSetAccount(value: string) {
    console.log(account);
    setAccount(value.trim());
  }

  function handleSetPwd(value: string) {
    console.log(value);
    setPwd(value.trim());
  }

  // function handleInputError(inputField: string) {
  //   const newValidationResult = {};
  // }

  return {
    loginReq: { account, pwd },
    formSetter: { account: handleSetAccount, pwd: handleSetPwd },
    validationResult,
  };
}

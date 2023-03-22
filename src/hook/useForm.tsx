import { useReducer, useState, useEffect } from 'react';

export function useForm<T, U extends {}>(reqProps: T, validationRule: U) {
  const [loginReq, dispatch] = useReducer(
    (state: T, action: any) => ({
      ...state,
      ...action,
    }),
    reqProps
  );
  const [validationResult, setValidationResult] = useState(() =>
    convertRuleToResult(validationRule)
  );

  function convertRuleToResult(obj: U) {
    const keyArr = Object.keys(obj);
    const keyObj = keyArr.reduce((accumulator, value) => {
      return {
        ...accumulator,
        [value]: { error: !validationRule[value](loginReq[value]) },
        allFieldsValid: () =>
          keyArr.every((key) => validationRule[key](loginReq[key])),
      };
    }, {});
    console.log(keyObj);
    return keyObj;
  }

  useEffect(() => {
    const keyArr = Object.keys(validationResult);
    setValidationResult(convertRuleToResult(validationRule));
    // const newObj = keyArr.reduce((accumulator, value) => {
    //   return {
    //     ...accumulator,
    //     [value]: { error: !validationRule[value](loginReq[value]) },
    //   };
    // }, {});
    // setValidationResult(newObj);
  }, [loginReq]);

  function handleSetAccount(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ account: e.target.value });
  }

  function handleSetPwd(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ pwd: e.target.value });
  }

  return {
    loginReq,
    formSetter: { account: handleSetAccount, pwd: handleSetPwd },
    validationResult,
  };
}

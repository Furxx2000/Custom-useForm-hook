import { useReducer, useState } from 'react';

export function useForm<T, U>(reqProps: T, validationRule: U) {
  const [loginReq, dispatch] = useReducer(
    (state: T, action: any) => ({
      ...state,
      ...action,
    }),
    reqProps
  );

  function result(props: T) {
    const vResult = {};
  }

  const [validationResult, setValidationResult] = useState();

  function handleSetAccount(value: string) {
    dispatch({ account: value });
  }

  function handleSetPwd(value: string) {
    dispatch({ pwd: value });
  }

  return {
    loginReq,
    formSetter: { account: handleSetAccount, pwd: handleSetPwd },
    validationResult,
  };
}

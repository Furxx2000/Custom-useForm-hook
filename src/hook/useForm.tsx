import {
  useReducer,
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';

// Type of validation result
type ValidationResult<U> = {
  [K in keyof U]: { error: boolean };
} & { allFieldsValid: () => boolean };

// Type of use reducer action
type Action<T> = { [K in keyof T]: T[K] };

export function useFormSource<
  T extends Record<string, string>,
  U extends Record<string, (v: any) => boolean>
>(reqProps: T, validationRule: U) {
  // State of login request
  const [loginReq, dispatch] = useReducer(
    (state: T, action: Action<T>) => ({
      ...state,
      ...action,
    }),
    reqProps
  );

  // State of
  const [isReqSubmitted, setIsReqSubmitted] = useState<boolean>();

  // State of validation result
  const [validationResult, setValidationResult] = useState<ValidationResult<U>>(
    () => convertRuleToResult(validationRule)
  );

  // Check validation result when login request value change
  useEffect(() => {
    if (!isReqSubmitted) setIsReqSubmitted(true);
    setValidationResult(convertRuleToResult(validationRule));
  }, [loginReq]);

  function convertRuleToResult(obj: U) {
    const keyArr = Object.keys(obj);
    const keyObj = keyArr.reduce((accumulator, value) => {
      return {
        ...accumulator,
        [value]: { error: !validationRule[value](loginReq[value]) },
      };
    }, {} as { [K in keyof U]: { error: boolean } });

    return {
      ...keyObj,
      allFieldsValid: () =>
        keyArr.every((key) => validationRule[key](loginReq[key])),
    };
  }

  function handleSetAccount(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ account: e.target.value } as unknown as Action<T>);
  }

  function handleSetPwd(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ pwd: e.target.value } as unknown as Action<T>);
  }

  function handleIsReqSubmitted(value: boolean) {
    setIsReqSubmitted(value);
  }

  return {
    loginReq,
    formSetter: { account: handleSetAccount, pwd: handleSetPwd },
    validationResult,
    isReqSubmitted,
    handleIsReqSubmitted,
  };
}

// UseContext
export const FormContext = createContext<ReturnType<typeof useFormSource>>(
  null as unknown as ReturnType<typeof useFormSource>
);

export function useForm() {
  return useContext(FormContext);
}

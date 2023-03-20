interface Props {
  loginReq: { account: string; pwd: string };
  formSetter: {
    account: (value: string) => void;
    pwd: (value: string) => void;
  };
  validationResult: {
    account: {
      isError: boolean;
      error: string;
    };
    pwd: {
      isError: boolean;
      error: string;
    };
    allFieldsValid: () => boolean;
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Form({
  loginReq,
  formSetter,
  validationResult,
  handleSubmit,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-control'>
        <label htmlFor='account'>Account</label>
        <input
          type='text'
          value={loginReq?.account}
          onChange={(e) => formSetter.account(e.target.value)}
        />
        <div className='invalid'>
          {validationResult?.account.isError &&
            validationResult?.account?.error}
        </div>
      </div>

      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={loginReq?.pwd}
          onChange={(e) => formSetter.pwd(e.target.value)}
        />
        <div className='invalid'>
          {validationResult?.pwd.isError && validationResult?.pwd?.error}
        </div>
      </div>

      <button className='submit-button'>Submit</button>
    </form>
  );
}

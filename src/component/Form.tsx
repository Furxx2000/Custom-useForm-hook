import { useForm } from '../hook/useForm';

const validationRule = {
  account: (v: string) => v.length > 8,
  pwd: (v: string) => v.length > 12,
};

const defaultReq = {
  account: '',
  pwd: '',
};

export function Form() {
  const { loginReq, formSetter, validationResult } = useForm(
    defaultReq,
    validationRule
  );

  return (
    <form>
      <div className='form-control'>
        <label htmlFor='account'>Account</label>
        <input
          type='text'
          value={loginReq?.account}
          onChange={(e) => formSetter.account(e.target.value)}
        />
        <div className='invalid'>
          {/* {validationResult?.account.isError &&
            validationResult?.account?.error} */}
          {loginReq.account}
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
          {/* {validationResult?.pwd.isError && validationResult?.pwd?.error} */}
          {loginReq.pwd}
        </div>
      </div>

      <button className='submit-button'>Submit</button>
    </form>
  );
}

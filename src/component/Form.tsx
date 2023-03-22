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

  function doSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validationResult.allFieldsValid()) {
      console.log('Valid');
    } else {
      console.log('Not valid');
    }
  }

  return (
    <form onSubmit={doSubmit}>
      <div className='form-control'>
        <label htmlFor='account'>Account</label>
        <input
          type='text'
          value={loginReq?.account}
          onChange={formSetter.account}
        />
        <div className='invalid'>
          {validationResult?.account?.error && 'Please enter valid characters'}
        </div>
      </div>

      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={loginReq?.pwd}
          onChange={formSetter.pwd}
        />
        <div className='invalid'>{validationResult?.pwd?.error}</div>
      </div>

      <button className='submit-button'>Submit</button>
    </form>
  );
}

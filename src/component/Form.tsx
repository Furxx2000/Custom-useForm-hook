import { useForm } from '../hook/useForm';

export function Form() {
  const {
    loginReq,
    formSetter,
    validationResult,
    isReqSubmitted,
    handleIsReqSubmitted,
  } = useForm();

  function doSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleIsReqSubmitted(true);

    if (validationResult.allFieldsValid()) {
      console.log('Valid');
      console.log(loginReq);
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
          onChange={formSetter?.account}
        />
        <div className='invalid'>
          {validationResult?.account?.error &&
            isReqSubmitted &&
            'Please enter at least 9 characters'}
        </div>
      </div>

      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={loginReq?.pwd}
          onChange={formSetter?.pwd}
        />
        <div className='invalid'>
          {validationResult?.pwd?.error &&
            isReqSubmitted &&
            'Please enter at least 13 characters'}
        </div>
      </div>

      <button className='submit-button'>Submit</button>
    </form>
  );
}

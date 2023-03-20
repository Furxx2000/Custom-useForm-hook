import { HelloWorld } from './component/HelloWorld';
import { Form } from './component/Form';
import { useForm } from './hook/useForm';
import { apiCall } from './ApiCall';
import './css/App.css';

// interface LoginReq {
//   account: string;
//   pwd: string;
// }

const validationRule = {
  account: (v: string) => v.length > 8,
  pwd: (v: string) => v.length > 12,
};

function App() {
  const { loginReq, formSetter, validationResult } = useForm(
    {
      account: '',
      pwd: '',
    },
    validationRule
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValid = validationResult.allFieldsValid();

    if (isValid) {
      console.log('Valid');
    } else {
      console.log('Submit fail!');
    }

    // if (validationResult.allFieldsValid()) {
    //   console.log('All fields valid');
    // } else {
    //   console.log('Submit fail');
    // }
  }

  function foo() {
    return apiCall(3, 'Hello world!');
  }

  function bar() {
    return apiCall(4, 2023);
  }

  return (
    <main>
      <HelloWorld foo={foo} bar={bar} />
      <Form
        loginReq={loginReq}
        formSetter={formSetter}
        validationResult={validationResult}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}

export default App;

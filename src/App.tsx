import { FormContext, useFormSource } from './hook/useForm';
import { useForm } from './hook/useForm';
import { HelloWorld } from './component/HelloWorld';
import { Form } from './component/Form';
import { apiCall } from './ApiCall';
import './css/App.css';

interface LoginReq {
  [key: string]: any;
}

interface ValidationRule {
  [key: string]: (v: any) => boolean;
}

const validationRule = {
  account: (v: string) => v.length > 8,
  pwd: (v: string) => v.length > 12,
};

const defaultReq = {
  account: '',
  pwd: '',
};

function App() {
  function foo() {
    return apiCall(3, 'Hello world!');
  }

  function bar() {
    return apiCall(4, 2023);
  }

  function user() {
    return apiCall(3);
  }

  return (
    <FormContext.Provider
      value={useFormSource<LoginReq, ValidationRule>(
        defaultReq,
        validationRule
      )}
    >
      <main>
        <HelloWorld foo={foo} bar={bar} />
        <Form />
      </main>
    </FormContext.Provider>
  );
}

export default App;

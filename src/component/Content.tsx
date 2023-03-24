import { HelloWorld } from './HelloWorld';
import { apiCall } from '../ApiCall';
import { Form } from './Form';
import { useForm } from '../hook/useForm';

export function Content() {
  const { loginReq } = useForm();

  function foo() {
    return apiCall(3, 'Hello world!');
  }

  function bar() {
    return apiCall(4, 2023);
  }

  function user() {
    return apiCall(3, loginReq.account);
  }

  return (
    <main>
      <HelloWorld foo={foo} bar={bar} user={user} />
      <Form />
    </main>
  );
}

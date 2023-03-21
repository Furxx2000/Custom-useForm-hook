import { HelloWorld } from './component/HelloWorld';
import { Form } from './component/Form';
import { apiCall } from './ApiCall';
import './css/App.css';

function App() {
  function foo() {
    return apiCall(3, 'Hello world!');
  }

  function bar() {
    return apiCall(4, 2023);
  }

  return (
    <main>
      <HelloWorld foo={foo} bar={bar} />
      <Form />
    </main>
  );
}

export default App;

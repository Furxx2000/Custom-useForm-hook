import { FormContext, useFormSource } from './hook/useForm';

import { Content } from './component/Content';
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
  return (
    <FormContext.Provider
      value={useFormSource<LoginReq, ValidationRule>(
        defaultReq,
        validationRule
      )}
    >
      <Content />
    </FormContext.Provider>
  );
}

export default App;

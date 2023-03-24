import { LoadingWrapper } from './LoadingWrapper';
import { useForm } from '../hook/useForm';

interface Apis {
  foo(): Promise<string>;
  bar(): Promise<number>;
  user(): Promise<string>;
}

export function HelloWorld({ foo, bar, user }: Apis) {
  const { isReqSubmitted, validationResult } = useForm();

  return (
    <div className='hello-world'>
      <LoadingWrapper
        loadData={() => foo()}
        renderData={(data: string) => <div className='respond'>{data}</div>}
      />

      {isReqSubmitted && validationResult.allFieldsValid() && (
        <LoadingWrapper
          loadData={() => user()}
          renderData={(data: string) => <div className='respond'>{data}</div>}
        />
      )}

      <LoadingWrapper
        loadData={() => bar()}
        renderData={(data: number) => <div className='respond'>{data}</div>}
      />
    </div>
  );
}

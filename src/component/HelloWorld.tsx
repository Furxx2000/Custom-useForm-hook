import { LoadingWrapper } from './LoadingWrapper';

interface Apis {
  foo(): Promise<string>;
  bar(): Promise<number>;
}

export function HelloWorld({ foo, bar }: Apis) {
  return (
    <div className='hello-world'>
      <LoadingWrapper
        loadData={() => foo()}
        renderData={(data: string) => <div className='respond'>{data}</div>}
      />

      {/* <LoadingWrapper
        loadData={() => foo()}
        renderData={(data: string) => <div className='respond'>{data}</div>}
      /> */}

      <LoadingWrapper
        loadData={() => bar()}
        renderData={(data: number) => <div className='respond'>{data}</div>}
      />
    </div>
  );
}

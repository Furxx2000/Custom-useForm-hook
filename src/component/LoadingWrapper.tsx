import React, { useEffect, useState } from 'react';
import { Loading } from './Loading';

interface Props {
  loadData: () => Promise<any>;
  renderData(data: string | number): React.ReactNode;
}

export function LoadingWrapper({ loadData, renderData }: Props) {
  const [data, setData] = useState();

  const getLoadData = async () => {
    const data = await loadData();
    if (data) setData(data);
  };

  useEffect(() => {
    getLoadData();
  }, []);

  return <div>{data ? renderData(data) : <Loading />}</div>;
}

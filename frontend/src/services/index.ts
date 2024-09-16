import axios from 'axios';
import useSWR from 'swr';

export function useAxiosSwr(url: string) {
  const { data, error, isLoading, mutate }: any = useSWR(url, axios.get);

  const resData = data?.data;

  return {
    error,
    isLoading,
    data: resData?.data ?? resData,
    mutate,
  };
}

import { useState } from 'react';

export const useGetCoins = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const getCoins = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = (await fetch('https://api-eu.okotoki.com/coins')).json();
      return response;
    } catch (err) {
      setIsError(err as string);
    } finally {
      setIsLoading(false);
    }
  };
  return { getCoins, isLoading, isError };
};

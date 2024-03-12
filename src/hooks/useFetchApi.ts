import { useState } from "react";

export const useFetchApi = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const base_url = "http://localhost:8081";

  const fetchApi = async (endpoint: string, body: FormData, method: string) => {
    const url = base_url + endpoint
    setIsLoading(true);
    const result = await fetch(url, {
      method,
      body,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("🚀 ~ .then ~ result:", result);
        setIsLoading(false);
        setData(result);
        return result
      })
      .catch((error) => setError(error));  

    return result
  };

  return {
    isLoading,
    data,
    error,
    fetchApi,
  };
};

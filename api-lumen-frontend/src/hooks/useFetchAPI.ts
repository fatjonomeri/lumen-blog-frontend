import { useState } from "react";

export const useFetchApi = (endpoint: string, body: FormData, method: string) => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const base_url = "http://localhost:8081";
  const url = base_url + endpoint;

  const fetchApi = async () => {
    setIsLoading(true);
    await fetch(url, {
      method,
      body,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("🚀 ~ .then ~ result:", result);
        setIsLoading(false);
        setData(result);
      })
      .catch((error) => setError(error));
  };

  return {
    isLoading,
    data,
    error,
    fetchApi,
  };
};

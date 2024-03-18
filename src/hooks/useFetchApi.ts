import { useState, useEffect } from "react";

export const useFetchApi = (endpoint, method) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

   const base_url = "http://localhost:8081";
  const url = base_url + endpoint;

  useEffect(() => {
  //   const fetchApi = async () => {
  //   setIsLoading(true);
  //   await fetch(url, {
  //     method,
  //   })
  //     .then((response) => response.text())
  //     .then((result) => {
  //       console.log("🚀 ~ .then ~ result:", result);
  //       setIsLoading(false);
  //       setData(result);
  //     })
  //     .catch((error) => setError(error));
  // };

  const fetchApi = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(url, {
      method,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json(); // Parse response data as JSON
    setData(result);
    setIsLoading(false);
  } catch (error) {
    setError(error);
    setIsLoading(false);
  }
};


    fetchApi();
  }, [endpoint, method]);

  return {
    isLoading,
    data,
    error,
  };
};

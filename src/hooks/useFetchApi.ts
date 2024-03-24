import { Post } from "../features/homepage/postsSlice.ts";
import { useState, useEffect } from "react";

export const useFetchApi = (endpoint: string, method: string) => {
  const [data, setData] = useState<Post | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

   const base_url = "http://localhost:8081";
  const url = base_url + endpoint;

  useEffect(() => {
  const fetchApi = async () => {
  setIsLoading(true);
  try {
      const response = await fetch(url, {
        method,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: Post = await response.json(); // Parse response data as JSON
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

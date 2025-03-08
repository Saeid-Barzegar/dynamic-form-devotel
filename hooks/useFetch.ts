"use client";

import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  isPending: boolean;
  error: string | null;
}

const useFetch = <T,>(endpoint: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isPending: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      const API_BASE_URL = process.env.API_BASE_URL;
      if (!API_BASE_URL) {
        throw new Error("API base URL is missing in environment variables.");
      }

      const response = await fetch(`/api/proxy?url=${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result: T = await response.json();
      setState({ data: result, isPending: false, error: null });
    } catch (err) {
      setState({ data: null, isPending: false, error: (err as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return state;
};

export default useFetch;

"use client";

import { useState, useCallback } from "react";

interface MutationState<T> {
  data: T | null;
  isPending: boolean;
  error: string | null;
}

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

interface MutationOptions {
  method: MutationMethod;
  body?: unknown;
  headers?: HeadersInit;
}

const useMutation = <T,>(endpoint: string) => {
  const [state, setState] = useState<MutationState<T>>({
    data: null,
    isPending: false,
    error: null,
  });

  const callMutation = useCallback(
    async ({ method, body, headers }: MutationOptions) => {
      try {
        setState({ data: null, isPending: true, error: null });

        const API_BASE_URL = process.env.API_BASE_URL;
        if (!API_BASE_URL) {
          throw new Error("API base URL is missing in environment variables.");
        }

        const url = `/api/proxy?url=${API_BASE_URL}${endpoint}`;
        const fetchOptions: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: T = await response.json();
        setState({ data: result, isPending: false, error: null });
      } catch (err) {
        setState({ data: null, isPending: false, error: (err as Error).message });
      }
    },
    [endpoint]
  );

  return { ...state, callMutation };
};

export default useMutation;

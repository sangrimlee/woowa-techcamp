/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface useMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData) => void;
  onFailure?: (error: string) => void;
  onMutate?: (variables: TVariables) => void;
}

interface MutationState<TData> {
  data: TData | null;
  error?: string;
  isError: boolean;
  isLoading: boolean;
}

export default function useMutation<TData = any, TVariables = any>(
  requestFunc: (variables: TVariables) => Promise<TData>,
  { onMutate, onSuccess, onFailure }: useMutationOptions<TData, TVariables>
) {
  const [state, setState] = useState<MutationState<TData>>({
    data: null,
    error: '',
    isError: false,
    isLoading: false,
  });

  const mutate = async (variables: TVariables) => {
    let success = true;
    onMutate && onMutate(variables);
    setState({
      ...state,
      isLoading: true,
    });
    try {
      const data = await requestFunc(variables);
      setState({
        ...state,
        data,
      });
      onSuccess && onSuccess(data);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setState({
        ...state,
        isError: true,
        error: errorMessage,
      });
      onFailure && onFailure(errorMessage);
      success = false;
    } finally {
      setState({
        ...state,
        isLoading: false,
      });
    }
    return success;
  };

  return {
    mutate,
    ...state,
  };
}

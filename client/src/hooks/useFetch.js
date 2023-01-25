import { useState, useEffect } from "react";

export const useFetch = (url, trigger = "") => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const getFetch = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    const resp = await fetch(url);
    const data = await resp.json();

    setState({
      data,
      isLoading: false,
      hasError: null,
    });
  };
  useEffect(() => {
    getFetch();
  }, [trigger]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};

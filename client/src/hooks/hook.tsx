import { useCallback, useLayoutEffect, useReducer, useRef } from "react";

function useSafeDispatch(dispatch: any) {
  const mounted = useRef(false);
  useLayoutEffect((): any => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);
  return useCallback(
    (...args: any) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

const defaultInitialState = { status: "idle", data: null, error: null };

function useAsync(initialState?: any) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const [{ status, data, error }, setState] = useReducer(
    (s: any, a: any) => ({ ...s, ...a }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (data: any) => safeSetState({ data, status: "resolved" }),
    [safeSetState]
  );

  const setError = useCallback(
    (error: any) => safeSetState({ error, status: "rejected" }),
    [safeSetState]
  );

  const reset = useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returninthing?`
        );
      }
      safeSetState({ status: "pending" });
      return promise.then(
        (data: any) => {
          setData(data);
          return data;
        },
        (error: any) => {
          console.error(error);

          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );
  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };

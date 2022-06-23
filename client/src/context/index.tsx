import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";

type Props = {
  children?: React.ReactNode;
};

const AppProvider: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry(failureCount, error: any) {
          if (error.status === 404) return false;
          else if (failureCount < 2) return true;
          else return false;
        },
      },
      mutations: {
        onError: (err, variables, recover) =>
          typeof recover === "function" ? recover() : null,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default AppProvider;

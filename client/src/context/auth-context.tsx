import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import FullPageErrorFallback from "src/components/FullPageErrorFallback";
import { Employee, LoginUserInput } from "src/generated/generates";
import graphqlRequestClient from "src/utils/graphqlRequestClient";
import * as auth from "src/hooks/auth-provider";
import { useAsync } from "src/hooks/hook";

async function bootstrapAppData() {
  let user: Employee | null = null;
  const accessToken = await auth.getToken();

  if (accessToken) {
    user = await auth.currentUser(accessToken);
  }

  return user;
}

const AuthContext = createContext<Employee | null>(null);

function AuthProvider(props: any) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    setData,
    run,
  } = useAsync();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = useCallback(
    (form: LoginUserInput) =>
      auth.login(form).then((user: Employee) => setData(user)),
    [setData]
  );

  const logout = useCallback(() => {
    auth.logout();
    setData(null);
    queryClient.clear();
    navigate("/");
  }, [setData, queryClient]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  if (isLoading || isIdle) return <p>الرجاء الانتظار.....</p>;

  if (isError) return <FullPageErrorFallback error={error} />;

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }
  throw new Error(`unexpected state ${status}`);
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

function useAuthClient() {
  const { user }: any = useAuth();
  const { archiveName, projectId, archiveId } = auth.useProjectId();
  const accessToken = user.accessToken;

  return {
    client: useCallback(() => graphqlRequestClient(accessToken), [accessToken]),
    projectId,
    archiveName,
    archiveId,
  };
}
export { AuthProvider, useAuth, useAuthClient };

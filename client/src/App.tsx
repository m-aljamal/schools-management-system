import Auth from "./authentication/Auth";
import UnAuth from "./authentication/UnAuth";
import { useAuth } from "./context/auth-context";

function App() {
  const { user }: any = useAuth();

  return user ? <Auth /> : <UnAuth />;
}

export default App;

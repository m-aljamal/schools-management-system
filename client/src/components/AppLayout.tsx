import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { useAuth } from "src/context/auth-context";
import FullPageErrorFallback from "./FullPageErrorFallback";
import Nav from "./Nav";

const AppLayout = () => {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div className="flex justify-between   " style={{ direction: "rtl" }}>
        <div className="bg-slate-900 min-h-screen  text-gray-200 p-2 w-80 pt-5 sticky top-0  text-center ">
          <UserInfo />
          <Nav />
        </div>
        <main className="  w-full  ">
          <Header />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default AppLayout;

function ErrorFallback({ error }: any) {
  return (
    <div role="alert">
      <p>يوجد مشكلة في التطبيق.</p>
      <pre>{error.response.errors[0].message}</pre>
      {/* <p>{error.stack}</p> */}
    </div>
  );
}

const UserInfo = () => {
  const { logout, user }: any = useAuth();

  return (
    <div>
      <div className=" ">
        <button onClick={logout} className="bg-gray-600 rounded-full p-2 mb-2 ">
          Logout
        </button>
      </div>
      {/* <p> العام الدراسي: {user?.project?.current_archive_name}</p>
      <div className="w-24 h-24 mx-auto mt-8 mb-3">image</div>
      <div className="mb-8">
        <p className=" text-white text-lg">{user.name}</p>
        <p className="text-sm">{user.username}</p>
      </div> */}
    </div>
  );
};

const Header = () => {
  return (
    <div className="shadow-sm  px-4 ">
      <div className="flex justify-between   my-4 ">icons</div>
      <hr className="-mx-4" />
    </div>
  );
};

import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import FullPageErrorFallback from "./FullPageErrorFallback";
import Nav from "./Nav";

const AppLayout = () => {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div className="flex justify-between " style={{ direction: "rtl" }}>
        <div className="bg-slate-900 text-gray-200 h-screen p-2 w-80 pt-5 sticky top-0  text-center ">
          <UserInfo />
          <Nav />
        </div>
        <main className="w-full">
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
  return (
    <div>
      <div className="flex justify-around">icons</div>
      <div className="w-24 h-24 mx-auto mt-8 mb-3">image</div>
      <div className="mb-8">
        <p className=" text-white text-lg">Mohammad jamal</p>
        <p className="text-sm">m-jamal</p>
      </div>
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

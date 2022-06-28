import { useForm } from "react-hook-form";
import { useAuth } from "src/context/auth-context";
import { LoginRole, LoginUserInput } from "src/generated/generates";
import { useAsync } from "src/hooks/hook";

const UnAuth = () => {
  return (
    <div className="bg-sky-900 w-full h-screen flex items-center ">
      <div className=" w-1/2 mx-auto bg-gray-200 rounded-lg text-center  ">
        <LoginForm title="دخول الطلاب" loginRole={LoginRole.Student} />
        <LoginForm title="دخول الموظفين" loginRole={LoginRole.Employee} />
      </div>
    </div>
  );
};

export default UnAuth;

const LoginForm = ({
  title,
  loginRole,
}: {
  title: string;
  loginRole: LoginRole;
}) => {
  const { login }: any = useAuth();
  const { isLoading, run, data } = useAsync();
  const onSubmit = (data: LoginUserInput) => {
    run(
      login({
        ...data,
        loginRole,
      })
    );
  };

  const { register, handleSubmit } = useForm<LoginUserInput>();
  return (
    <div className="my-4">
      <p>{title}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username")}
          placeholder="username"
          className="block my-4 mx-auto"
        />
        <input
          {...register("password")}
          placeholder="password"
          className="block my-4 mx-auto"
        />
        <button
          className="bg-sky-900 text-white w-28 rounded-md "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

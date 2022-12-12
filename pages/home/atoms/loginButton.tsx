import { login } from "../../../functions/login";

const LoginButton = () => {
  return (
    <button
      onClick={login}
      className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs lg:w-8 xl:w-8 md:w-8 sm:w-8 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      login
    </button>
  );
};

export default LoginButton;

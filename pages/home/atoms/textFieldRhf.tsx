import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../../firebaseConfig";

export type Inputs = {
  example: string;
};

const TextFiedlRhf = ({ onAddEnteredValue }: { onAddEnteredValue: any }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [user, loading, errorOfAuthState] = useAuthState(auth);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    onAddEnteredValue(data);
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={user ? handleSubmit(onSubmit) : undefined}
      className="flex justify-center"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <input
        defaultValue="256"
        {...register("example")}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
      />
      <input
        type="submit"
        className="text-white w-24 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      />
    </form>
  );
};
export default TextFiedlRhf;

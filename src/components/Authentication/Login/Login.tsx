import { Button } from "@/components/ui/button";
import { SERVER_BASE_URL } from "@/config";
import { useAuthContext } from "@/context/AuthProvider";
import { LoginData, useLoginContext } from "@/context/Login.Provider";
import { ApiRequest } from "@/services/api.services";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { loginData, handleInputChange } = useLoginContext();
  const { tokenDispatch } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: loginMutation, isPending }: any = useMutation({
    mutationFn: (data: LoginData) =>
      new ApiRequest(`${SERVER_BASE_URL}/api/auth/login`, "post").apiRequest(
        data,
        {
          "Content-Type": "application/json",
        },
        ""
      ),
    mutationKey: ["login"],
    onSuccess: (data: any) => {
      tokenDispatch({ type: "LOGIN", payload: data.data.accessToken });
      toast.success(data.data.msg);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.msg || error.message);
    },
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    loginMutation({ ...loginData });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col mx-auto bg-white rounded-lg pt-12 overflow-hidden">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10 rounded-sm">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={handleSubmit}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign In
                </h3>
                <p className="mb-4 text-grey-700">
                  Enter your email and password
                </p>

                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">or</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label className="mb-2 text-sm text-start text-grey-900">
                  Email*
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  value={loginData.email}
                  onChange={handleInputChange}
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
                />
                <label className="mb-2 text-sm text-start text-grey-900">
                  Password*
                </label>
                <input
                  required
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
                />

                <Button className="text-center  px-6  mb-5 text-sm font-bold leading-none text-black transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                  {!isPending ? "Log in" : "loading..."}
                </Button>
                <p className="text-sm leading-relaxed text-grey-900">
                  Not registered yet?{" "}
                  <Link to={"/signup"} className="font-bold text-grey-700">
                    Create an Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

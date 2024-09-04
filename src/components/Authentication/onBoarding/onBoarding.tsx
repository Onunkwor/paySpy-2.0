import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { multiStepForm } from "@/helpers/multiform";
import { OnboardData, useOnboardContext } from "@/context/OnBoarding.Provider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "@/config";

export const StepOne = () => {
  const { handleInputChange, onboardData } = useOnboardContext();

  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Username</span>
        </div>
        <input
          name="username"
          onChange={handleInputChange}
          required
          type="text"
          placeholder="Enter username"
          className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
          value={onboardData.username}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          onChange={handleInputChange}
          value={onboardData.email}
          name="email"
          required
          type="email"
          placeholder="Enter email address"
          className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Phone number</span>
        </div>
        <input
          onChange={handleInputChange}
          name="phoneNumber"
          value={onboardData.phoneNumber}
          required
          type="text"
          placeholder="Enter phone number"
          className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
        />
      </label>
    </>
  );
};
export const StepTwo = () => {
  const { handleInputChange, onboardData } = useOnboardContext();

  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">First name</span>
        </div>
        <input
          name="firstName"
          onChange={handleInputChange}
          value={onboardData.firstName}
          required
          type="text"
          placeholder="Type here"
          className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Last name</span>
        </div>
        <input
          onChange={handleInputChange}
          name="lastName"
          value={onboardData.lastName}
          required
          type="text"
          placeholder="Type here"
          className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
        />
      </label>
    </>
  );
};
export const StepThree = () => {
  const { handleInputChange, onboardData } = useOnboardContext();

  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          name="password"
          onChange={handleInputChange}
          value={onboardData.password}
          required
          type="password"
          placeholder="Enter a strong password"
          className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Confirm password</span>
        </div>
        <input
          onChange={handleInputChange}
          name="confirmPassword"
          value={onboardData.confirmPassword}
          required
          type="password"
          placeholder="Repeat the same password"
          className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border"
        />
      </label>
    </>
  );
};

export const OnBoarding = () => {
  const navigate = useNavigate();

  const stepsHeader = [
    {
      text: "Basic info",
    },
    {
      text: "Personal details",
    },
    {
      text: "Account security",
    },
  ];
  const {
    currentStepIndex,
    next,
    previous,
    canMoveBackward,
    canMoveForward,
    steps,
  } = multiStepForm([<StepOne />, <StepTwo />, <StepThree />]);
  const { onboardData } = useOnboardContext();
  const { mutate: onboardMutation, isPending }: any = useMutation({
    mutationFn: (data: OnboardData) =>
      axios.post(
        `${SERVER_BASE_URL}/api/auth/signup`,
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    mutationKey: ["onboard"],
    onError: (error: any) => {
      toast.error(error.response?.data?.msg || error.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.msg);
      navigate("/");
    },
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (onboardData.password !== onboardData.confirmPassword) {
      toast.error("Please enter correct password");
      return;
    }
    await onboardMutation({ ...onboardData });
  };
  return (
    <>
      <div className="w-screen flex flex-col items-center">
        <form
          className="flex flex-col items-center p-10 rounded-sm"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
            Register
          </h3>

          <div className="w-full flex flex-col gap-2 mt-5 items-center justify-center">
            <div className="flex items-center flex-col ">
              {steps[currentStepIndex]}
            </div>
            <div className="w-full  flex justify-between ">
              {canMoveBackward && (
                <Button onClick={previous} type="button">
                  Back
                </Button>
              )}

              {canMoveForward && (
                <Button onClick={next} type="button">
                  Next
                </Button>
              )}
              {!canMoveForward && (
                <Button onClick={next} type="submit">
                  {isPending ? "Loading" : "Register"}
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm leading-relaxed text-grey-900 mt-5">
            Already registered?{" "}
            <Link to={"/login"} className="font-bold text-grey-700">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

import React, {
  Context,
  createContext,
  FormEvent,
  useContext,
  useState,
} from "react";

export interface OnboardData {
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface OnboardingContextType {
  onboardData: OnboardData;
  setOnboardData: any;
  handleInputChange: any;
}

const OnBoardingContext: Context<OnboardingContextType> = createContext({
  onboardData: {
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    email: "",
  },
  setOnboardData: () => {},
  handleInputChange: () => {},
});

export const OnBoardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onboardData, setOnboardData] = useState<OnboardData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
  });
  const handleInputChange = (e: FormEvent) => {
    const { name, value } = e.target as any;
    setOnboardData({
      ...onboardData,
      [name]: value,
    });
  };
  return (
    <OnBoardingContext.Provider
      value={{ onboardData, setOnboardData, handleInputChange }}
    >
      {children}
    </OnBoardingContext.Provider>
  );
};

export default OnBoardingContext;

export const useOnboardContext = () => useContext(OnBoardingContext);

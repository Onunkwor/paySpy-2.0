import React, { createContext, FormEvent, useContext, useState } from "react";

//  the loginData interface separately for clarity
export interface LoginData {
  email: string;
  password: string;
}

// the context type
export interface LoginContextType {
  loginData: LoginData;
  setLoginData: any;
  handleInputChange: any;
}

//  the context with a default value
const LoginContext = createContext<LoginContextType>({
  loginData: {
    email: "",
    password: "",
  },
  setLoginData: () => {}, // Default function,
  handleInputChange: () => {},
});

//the provider component
export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <LoginContext.Provider
      value={{ loginData, setLoginData, handleInputChange }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;

export const useLoginContext = () => useContext(LoginContext);

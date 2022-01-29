import React from "react";
import { LoginData, LoginDataContext } from "./LoginDataContext";

const LoginDataProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<LoginData>();

  return (
    <LoginDataContext.Provider
      value={{
        data: data,
        setData: setData,
      }}
    >
      {children}
    </LoginDataContext.Provider>
  );
};

export default LoginDataProvider;

export const useLoginData = () => React.useContext(LoginDataContext);

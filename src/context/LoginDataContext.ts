import React from "react";

export interface LoginData {
  token: string;
  username: string;
  nim: string;
  kd_kelas: string;
  nama_mhs: string;
  expired: string;
}

interface ILoginDataContext {
  data?: LoginData;
  setData?: (data: LoginData | undefined) => void;
}

export const LoginDataContext = React.createContext<ILoginDataContext>({});

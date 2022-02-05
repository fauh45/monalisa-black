import splitbee from "@splitbee/web";
import { Box, TextInput, Text, Button, Heading } from "grommet";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { LoginData } from "../context/LoginDataContext";
import { useLoginData } from "../context/LoginDataProvider";
import { NIMtoData } from "../helper/nim";

interface LoginProps {}

interface LoginFormInput {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = (props) => {
  const { data: authData, setData } = useLoginData();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const rawResponse = await fetch(
      `${process.env.REACT_APP_REVERSE_PROXY}https://api.polban.ac.id/mpm/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        referrerPolicy: "unsafe-url",
        body: JSON.stringify(data),
      }
    );
    const result: { status: number; message: string; data: LoginData } =
      await rawResponse.json();

    if (result.status !== 1) {
      setError("username", {
        type: "value",
        message: "Password/Username tidak benar, coba validasikan kembali",
      });
    } else {
      await splitbee.user.set(NIMtoData(result.data.username));

      setData!(result.data);
    }
  };

  if (authData) return <Navigate to="/" replace />;

  return (
    <Box fill align="center" alignContent="center" gap="small">
      <Heading level="3" margin="small">
        Login
      </Heading>
      <Text textAlign="center">
        Gunakan login akademik Polban untuk mengakses versi unofficial MONALISA.
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          rules={{ required: true }}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Box pad={{ top: "small" }}>
              <TextInput
                {...field}
                disabled={isSubmitting}
                placeholder="NIM"
                type={"number"}
              />
              <Text color="red">{error?.message}</Text>
            </Box>
          )}
        />
        <Controller
          name="password"
          rules={{ required: true }}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Box pad={{ top: "small", bottom: "medium" }}>
              <TextInput
                {...field}
                disabled={isSubmitting}
                placeholder="Password"
                type={"password"}
              />
              <Text color="red">{error?.message}</Text>
            </Box>
          )}
        />
        <Button
          fill={"horizontal"}
          primary
          type="submit"
          label={isSubmitting ? "Loading..." : "Submit"}
          disabled={isSubmitting}
        />
      </form>

      <Box margin={{ top: "large" }}>
        <Text>
          Dibuat oleh{" "}
          <a href="https://twitter.com/fauh45" target="_blank" rel="noreferrer">
            fauh45
          </a>
          .
        </Text>
      </Box>
    </Box>
  );
};

export default Login;

import { Box, Button, Header, Heading, Text } from "grommet";
import React from "react";
import IzinKhususQR from "../component/IzinKhususQR";
import KuliahQR from "../component/KuliahQR";
import { useLoginData } from "../context/LoginDataProvider";

interface HomeProps {}

enum HomeState {
  KULIAH,
  IZIN,
}

const Home: React.FC<HomeProps> = (props) => {
  const { data, setData } = useLoginData();
  const [state, setState] = React.useState<HomeState>(HomeState.KULIAH);

  const logOut = () => {
    setData!(undefined);
  };

  return (
    <Box fill>
      <Header background="brand" align="center" margin={{ vertical: "small" }}>
        <Box pad="small">
          <Text>MONALISA-unofficial</Text>
        </Box>
        <Box pad="small">
          <Button
            secondary
            label="Logout"
            alignSelf="end"
            onClick={() => logOut()}
          />
        </Box>
      </Header>

      <Heading level="4" margin="0">
        Masuk sebagai {data?.nama_mhs}
      </Heading>
      <Heading level="5" margin="0">
        NIM {data?.nim}
      </Heading>

      <Box pad={{ top: "medium" }}>
        <Button
          secondary
          label={`Ambil Izin ${
            state === HomeState.KULIAH ? "Khusus Kuliah" : "Kuliah"
          } Hari Ini`}
          fill={"horizontal"}
          onClick={() => {
            setState(
              state === HomeState.KULIAH ? HomeState.IZIN : HomeState.KULIAH
            );
          }}
        />
      </Box>

      <Box align="center" alignContent="center" pad={{ top: "medium" }}>
        <Heading level="4" margin="0">
          Data QR {state === HomeState.KULIAH ? "Kuliah" : "Izin Khusus"}
        </Heading>

        {state === HomeState.KULIAH ? <KuliahQR /> : <IzinKhususQR />}
      </Box>

      <Box align="center" pad={{ top: "small" }}>
        <Text style={{ fontSize: "0.8em" }}>
          Tweet{" "}
          <a
            href="https://twitter.com/intent/tweet?screen_name=fauh45&ref_src=twsrc%5Etfw"
            target="_blank"
            rel="noreferrer"
          >
            @fauh45
          </a>{" "}
          untuk Bantuan atau Saran.
        </Text>
      </Box>
    </Box>
  );
};

export default Home;

import { Box, Text } from "grommet";
import React from "react";
import { Buffer } from "buffer";
import { useLoginData } from "../context/LoginDataProvider";
import QRCode from "react-qr-code";

interface IzinKhususQRProps {}

interface GetKuliahResponse {
  status: number;
  message: string;
  jml_data: number;
  data: {
    nim: string;
    kode_qr: string | null;
    keterangan_izin: string | null;
  };
}

const IzinKhususQR: React.FC<IzinKhususQRProps> = (props) => {
  const { data, setData } = useLoginData();
  const [izinKuliahData, setIzinKuliahData] = React.useState<GetKuliahResponse>();

  React.useEffect(() => {
    if (!izinKuliahData) {
      getKuliahData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [izinKuliahData]);

  const getKuliahData = async () => {
    const authToken = Buffer.from(`${data?.username}:${data?.token}`).toString(
      "base64"
    );

    const rawResponse = await fetch(
      `${process.env.REACT_APP_REVERSE_PROXY}https://api.polban.ac.id/mpm/getIzinKhususToday`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        referrerPolicy: "unsafe-url",
        body: JSON.stringify({ nim: data?.nim }),
      }
    );
    const result: GetKuliahResponse = await rawResponse.json();

    setIzinKuliahData(result);
  };

  if (izinKuliahData && izinKuliahData.status === 2) {
    setData!(undefined);
  }

  return (
    <Box>
      {!izinKuliahData ? (
        <Text textAlign="center">Mengambil Data Kuliah...</Text>
      ) : (
        <Box align="center">
          <Box pad={{ top: "small" }}>
            {!izinKuliahData.data.kode_qr ? (
              <Text color="status-error" textAlign="center">
                Tidak ada izin khusus perkuliahan
              </Text>
            ) : (
              <>
                <QRCode value={izinKuliahData.data.kode_qr} />
                <Text textAlign="center">
                  Keterangan Izin : {izinKuliahData.data.keterangan_izin}
                </Text>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default IzinKhususQR;

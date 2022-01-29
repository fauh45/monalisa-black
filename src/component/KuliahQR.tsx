import { Box, Text } from "grommet";
import React from "react";
import { Buffer } from "buffer";
import { useLoginData } from "../context/LoginDataProvider";
import QRCode from "react-qr-code";

interface KuliahQRProps {}

interface GetKuliahResponse {
  status: number;
  message: string;
  jml_data: number;
  data: {
    nim: string;
    kode_qr: string | null;
  };
  status_jadwal: number;
  status_vaksin: number;
  status_ortu: number;
  status_ver: number;
}

const KuliahQR: React.FC<KuliahQRProps> = (props) => {
  const { data, setData } = useLoginData();
  const [kuliahData, setKuliahData] = React.useState<GetKuliahResponse>();

  React.useEffect(() => {
    if (!kuliahData) {
      getKuliahData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kuliahData]);

  const getKuliahData = async () => {
    const authToken = Buffer.from(`${data?.username}:${data?.token}`).toString(
      "base64"
    );

    const rawResponse = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.polban.ac.id/mpm/getKuliahToday",
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

    setKuliahData(result);
  };

  if (kuliahData && kuliahData.status === 2) {
    setData!(undefined);
  }

  return (
    <Box>
      {!kuliahData ? (
        <Text>Mengambil Data Kuliah...</Text>
      ) : (
        <Box align="center">
          <Text>
            Status Jadwal :{" "}
            {kuliahData.status_jadwal === 1 ? "Ada Jadwal" : "Tidak Ada Jadwal"}
          </Text>
          <Text>
            Status Vaksin :{" "}
            {kuliahData.status_vaksin === 1
              ? "Sudah Vaksin"
              : "Belum Vaksin/Belum isi surat vaksin"}
          </Text>
          <Text>
            Status Izin Orang Tua :{" "}
            {kuliahData.status_vaksin === 1
              ? "Sudah Diizinkan"
              : "Belum isi surat izin orang tua"}
          </Text>
          <Text>
            Status Verifikasi Prodi :{" "}
            {kuliahData.status_vaksin === 1
              ? "Sudah Diverifikasi"
              : "Belum Diverifikasi"}
          </Text>

          <Box pad={{ top: "small" }}>
            {!kuliahData.data.kode_qr ? (
              <Text color="status-error">Tidak ada izin perkuliahan</Text>
            ) : (
              <QRCode value={kuliahData.data.kode_qr} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default KuliahQR;

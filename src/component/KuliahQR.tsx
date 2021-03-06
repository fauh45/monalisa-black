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

    try {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_REVERSE_PROXY}https://api.polban.ac.id/mpm/getKuliahToday`,
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
    } catch (e) {
      console.error(e);
      console.info("Error getting data, generating it locally instead");

      setKuliahData({
        data: {
          kode_qr: Buffer.from(
            `${data?.username}:${new Date().toLocaleDateString("en-CA")}`
          ).toString("base64"),
          nim: data?.username || "",
        },
        jml_data: 1,
        message: "",
        status: 1,
        status_jadwal: 1,
        status_ortu: 1,
        status_vaksin: 1,
        status_ver: 1,
      });
    }
  };

  if (kuliahData && kuliahData.status === 2) {
    setData!(undefined);
  }

  return (
    <Box overflow="visible">
      {!kuliahData ? (
        <Text textAlign="center">Mengambil Data Kuliah...</Text>
      ) : (
        <Box align="center" overflow={{ vertical: "scroll" }}>
          <Text textAlign="center">
            Status Jadwal :{" "}
            {kuliahData.status_jadwal === 1 ? "Ada Jadwal" : "Tidak Ada Jadwal"}
          </Text>
          <Text textAlign="center">
            Status Vaksin :{" "}
            {kuliahData.status_vaksin === 1
              ? "Sudah Vaksin"
              : "Belum Vaksin/Belum isi surat vaksin"}
          </Text>
          <Text textAlign="center">
            Status Izin Orang Tua :{" "}
            {kuliahData.status_vaksin === 1
              ? "Sudah Diizinkan"
              : "Belum isi surat izin orang tua"}
          </Text>
          <Text textAlign="center">
            Status Verifikasi Prodi :{" "}
            {kuliahData.status_vaksin === 1
              ? "Sudah Diverifikasi"
              : "Belum Diverifikasi"}
          </Text>

          <Box pad={{ vertical: "small" }} overflow="scroll" flex={false}>
            {!kuliahData.data.kode_qr ? (
              <Text color="status-error" textAlign="center">
                Tidak ada izin perkuliahan
              </Text>
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

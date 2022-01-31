import { Box, Main } from "grommet";
import React from "react";

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      fill
      align="center"
      alignContent="center"
      overflow={{ vertical: "scroll" }}
    >
      <Main pad="medium" width={{ width: "100%", max: "768px" }}>
        {children}
      </Main>
    </Box>
  );
};

export default MainLayout;

import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import LoginDataProvider, { useLoginData } from "./context/LoginDataProvider";
import Home from "./routes/Home";
import Login from "./routes/Login";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const loginData = useLoginData();
  const location = useLocation();

  if (!loginData.data) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <LoginDataProvider>
      <MainLayout>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </MainLayout>
    </LoginDataProvider>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Main from "../Main/Main";
import { Profile } from "../Profile/Profile";
import ProtectedRouter from "../ProtectedRouter";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route
          path="profile"
          element={
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

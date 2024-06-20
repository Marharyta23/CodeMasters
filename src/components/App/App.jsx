import SharedLayout from "../SharedLayout/SharedLayout";
import HomePage from "../../pages/HomePage/HomePage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import TrackerPage from "../../pages/TrackerPage/TrackerPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;

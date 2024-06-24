import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";

import SharedLayout from "../SharedLayout/SharedLayout";
import HomePage from "../../pages/HomePage/HomePage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import TrackerPage from "../../pages/TrackerPage/TrackerPage";
// import { Route, Routes } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <SharedLayout>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}

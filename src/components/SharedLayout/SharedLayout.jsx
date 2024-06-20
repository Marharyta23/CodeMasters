import { Suspense } from "react";

export default function SharedLayout({ children }) {
  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}

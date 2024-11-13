import React from "react";
import "../src/app/globals.css";
import { SessionProvider } from "next-auth/react";

import PagesLayout from "../components/PagesLayout"; // Adjust the path to your PagesLayout component

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <PagesLayout>
        <Component {...pageProps} />
      </PagesLayout>
    </SessionProvider>
  );
}

export default MyApp;

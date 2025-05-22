import Providers from "./providers";
import "./globals.css";

import type { Metadata } from "next";
import type { LayoutProps } from "@/types/common";

export const metadata: Metadata = {
  title: "cliffhangr",
  description: "The best place for your favourite TV shows",
};

const RootLayout = ({ children }: LayoutProps): React.JSX.Element => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;

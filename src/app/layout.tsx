import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layouts/header";
import localFont from "next/font/local";

const pretendard = localFont({
  src: [
    {
      path: "../../public/font/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Tech Blog by blan19",
  description: "Tech Blog by blan19",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pretendard.variable} font-pretendard bg-greyscale-0 text-greyscale-9 dark:bg-greyscale-9 dark:text-greyscale-0`}
    >
      <body>
        <Header />
        <main className="responsive pt-12">{children}</main>
      </body>
    </html>
  );
}

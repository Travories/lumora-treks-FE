import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Pattaya, Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pattaya = Pattaya({
  variable: "--font-pattaya",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lumora Treks | Travel Beyond Destinations",
  description:
    "Discover expertly crafted itineraries, local experiences, and seamless bookings that turn every journey into a story worth telling.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${pattaya.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

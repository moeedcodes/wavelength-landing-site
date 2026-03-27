import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wavelength — Find Your Frequency",
  description:
    "Connect with people who share your music taste. Wavelength uses Spotify data to calculate music compatibility and help you discover your people.",
  keywords: ["music", "social", "spotify", "compatibility", "playlist", "connection"],
  openGraph: {
    title: "Wavelength — Find Your Frequency",
    description: "Your music taste says more about you than your bio ever could.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0F0F23] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}

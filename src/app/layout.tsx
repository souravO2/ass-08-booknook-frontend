import { Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/homepage/Footer";
import { Metadata } from "next";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "BookNook",
    template: "BookNook | %s",
  },
  description: "A place to discover and share your favorite books.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={fraunces.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              success: "!bg-[#E4F1EA] !text-forest-deep !border-forest",
              error: "!bg-[#FBE9E7] !text-error !border-error",
            },
          }}
        />
      </body>
    </html>
  );
}

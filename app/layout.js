import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Imagify",
  description: "Text to Image",
  keywords: ["Text to image", "AI image", "AI Art", "Generate Image"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "ca434bedbcbd4519b38644b222f93aee"}'
        ></script>
      </body>
    </html>
  );
}

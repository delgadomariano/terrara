import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terrara | Naturaleza, Terrarios y Plantas",
  description: "Descubre el mundo de los terrarios y las plantas exóticas. Compra macetas, accesorios y lee nuestro blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}

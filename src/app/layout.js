import { Inter } from "next/font/google";
import "./globals.css";
import { MainProvider } from "../contexts/MainContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema de Chamados",
  description: "Consiste em um sistema no qual o usuário pode abrir chamados para solicitar serviços de um outro setor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  );
}

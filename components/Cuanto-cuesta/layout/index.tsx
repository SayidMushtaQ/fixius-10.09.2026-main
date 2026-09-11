import React from "react";
import HeroImage from "./HeroImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="Container">
        <Header />
      </header>
      <HeroImage />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

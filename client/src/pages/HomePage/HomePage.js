import React from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import HomePageBody from "./HomePageBody";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

function HomePage() {
  return (
    <>
      <HeaderComponent />
      <HomePageBody />
      <FooterComponent />
    </>
  );
}

export default HomePage;

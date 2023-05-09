import React from "react";

//components
import HeroBanner from "./heroBanner/HeroBanner";
//css
import "./Home.scss";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default HomePage;

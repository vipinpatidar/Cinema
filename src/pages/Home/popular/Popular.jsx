import React, { useState } from "react";
//component
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTabs/SwitchTab";
import Carousel from "../../../components/carousel/Carousel";
//custom hook
import useFetch from "../../../hooks/useFetch";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, isLoading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    const tabArr = tab.split(" ");
    setEndpoint(tabArr[0].toLowerCase());
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTab data={["Movie", "Tv Show"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel
        media_type={endpoint}
        data={data?.results}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Popular;

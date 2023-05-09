import React from "react";
import { useParams } from "react-router-dom";
//fetching data
import useFetch from "../../hooks/useFetch";
//css
import "./Details.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./detailsCarousel/Similar";
import Recommendation from "./detailsCarousel/Recommended";

const DetailsPage = () => {
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, isLoading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} isLoading={creditsLoading} />
      <VideosSection data={data} isLoading={isLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default DetailsPage;

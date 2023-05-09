import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//css
import "./HeroBanner.scss";
//custom hook
import useFetch from "../../../hooks/useFetch";
//components
import Image from "../../../components/lazyImage/Image";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const base_url = "https://image.tmdb.org/t/p/original";

  const { isLoading, data, error } = useFetch("/movie/upcoming");

  useEffect(() => {
    const random = Math.floor(Math.random() * 20);
    const bgUrl = data?.results[random]?.backdrop_path;
    setBackground(bgUrl);
  }, [data]);

  const searchQueryHandler = (event, isClicked) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    } else if (isClicked === "clicked" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <Image
          src={
            background
              ? `${base_url}${background}`
              : "https://image.tmdb.org/t/p/original/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg"
          }
          alt="upcoming movies images"
        />
      </div>

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={(event) => searchQueryHandler(event, "clicked")}>
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;

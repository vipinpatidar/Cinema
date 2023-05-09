import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
//icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import dayjs from "dayjs";
//components
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Image from "../lazyImage/Image";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
//images
import PosterFallback from "../../assets/no-poster.png";
import noResult from "../../assets/no-results.png";
//css
import "./Carousel.scss";

const Carousel = ({ data, isLoading, media_type, title }) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();

  //!giving vertical scrolling

  const navigation = (side) => {
    const container = carouselContainer.current;

    const scrollAmount =
      side === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skltanItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        {data?.length > 0 ? (
          <>
            <span
              className="carouselLeftNav arrow"
              onClick={() => navigation("left")}
            >
              <MdKeyboardArrowLeft className="icon" />
            </span>
            <span
              className="carouselRighttNav arrow"
              onClick={() => navigation("right")}
            >
              <MdKeyboardArrowRight className="icon" />
            </span>
          </>
        ) : (
          ""
        )}

        {!isLoading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.length > 0 ? (
              <>
                {data?.map((item) => {
                  const base_url = "https://image.tmdb.org/t/p/original";

                  const posterUrl = item?.poster_path
                    ? `${base_url}${item?.poster_path}`
                    : PosterFallback;

                  return (
                    <div
                      className="carouselItem"
                      key={item.id}
                      onClick={() =>
                        navigate(`/${item.media_type || media_type}/${item.id}`)
                      }
                    >
                      <div className="posterBlock">
                        <Image src={posterUrl} alt="poster of movies" />
                        <CircleRating rating={item.vote_average.toFixed(1)} />
                        <Genres ids={item?.genre_ids.slice(0, 2)} />
                      </div>
                      <div className="textBlock">
                        <span className="title">{item.title || item.name}</span>
                        <span className="date">
                          {dayjs(item.release_date).format("MMM DD, YYYY")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="noVideo">
                  <img
                    src={noResult}
                    alt="noresult found"
                    width={100}
                    height={100}
                  />
                  <span className="resultNotFound">{`Sorry No Recommendtions Found!`}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skltanItem()}
            {skltanItem()}
            {skltanItem()}
            {skltanItem()}
            {skltanItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;

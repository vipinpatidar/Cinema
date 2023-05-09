import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import "./MovieCard.scss";
import Image from "../lazyImage/Image";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const base_url = "https://image.tmdb.org/t/p/original";

  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? base_url + data.poster_path
    : PosterFallback;
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Image className="posterImg" src={posterUrl} />
        {/* {!fromSearch && ( */}
        <React.Fragment>
          <CircleRating rating={data.vote_average.toFixed(1)} />
          <Genres ids={data.genre_ids.slice(0, 2)} />
        </React.Fragment>
        {/* )} */}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;

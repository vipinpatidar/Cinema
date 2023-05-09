import React from "react";
import { useSelector } from "react-redux";

//css
import "./Genres.scss";
const Genres = ({ ids }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {ids?.map((id, index) => {
        return (
          <div className="genre" key={index}>
            {genres[id]?.name || "Romance Comedy"}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;

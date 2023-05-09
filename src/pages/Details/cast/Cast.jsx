import React from "react";

import "./Cast.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Image from "../../../components/lazyImage/Image";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, isLoading }) => {
  const base_url = "https://image.tmdb.org/t/p/original";

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!isLoading ? (
          <div className="listItems">
            {data?.map((item) => {
              const imgUrl = item?.profile_path
                ? `${base_url}${item?.profile_path}`
                : avatar;
              return (
                <a
                  style={{ textDecoration: "none" }}
                  href={`https://en.wikipedia.org/wiki/${item?.name}`}
                  target="_blank"
                  rel="noreferrer"
                  key={item.id}
                >
                  <div className="listItem">
                    <div className="profileImg">
                      <Image src={`${imgUrl}`} />
                    </div>
                    <div className="name">{item?.name}</div>
                    <div className="character">{item?.character}</div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;

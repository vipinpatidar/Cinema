import React, { useState } from "react";

import "./VideosSection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../playBtn/PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Image from "../../../components/lazyImage/Image";
import noResult from "../../../assets/no-results.png";

const VideosSection = ({ data, isLoading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!isLoading ? (
          <div className="videos">
            {data?.results?.length > 0 ? (
              <>
                {data?.results?.map((video) => (
                  <div
                    className="videoItem"
                    key={video.key}
                    onClick={() => {
                      setShow(true);
                      setVideoId(video.key);
                    }}
                  >
                    <div className="videoThumbnail">
                      <Image
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        alt="youtube video"
                      />
                      <PlayIcon />
                    </div>
                    <div className="videoTitle">{video.name}</div>
                  </div>
                ))}
              </>
            ) : (
              <div className="noVideo">
                <img
                  src={noResult}
                  alt="noresult found"
                  width={80}
                  height={80}
                />
                <span className="resultNotFound">{`Sorry No Video Found!`}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;

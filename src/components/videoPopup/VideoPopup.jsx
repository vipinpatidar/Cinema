import React from "react";
import ReactPlayer from "react-player/youtube";

import "./VideoPopup.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>

        {videoId ? (
          <ReactPlayer
            url={`${show ? `https://www.youtube.com/watch?v=${videoId}` : ""}`}
            controls
            width="100%"
            height="100%"
            // playing={true}
          />
        ) : (
          <div className="noTrailer">
            <h2>No trailer available</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPopup;

import React from "react";
import "./Error.scss";
//components
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const ErrorPage = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
        <br />
        <span className="smallText">
          Or Try again with mobile network if There is page not found error{" "}
        </span>
      </ContentWrapper>
    </div>
  );
};

export default ErrorPage;

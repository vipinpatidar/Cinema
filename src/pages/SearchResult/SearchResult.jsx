import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
//fetch data function
import { fetchDataFromApi } from "../../utils/api";
//components
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

//css
import "./SearchResult.scss";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);
    const response = await fetchDataFromApi(
      `/search/multi?query=${query}&page=${pageNum}`
    );

    setData(response);
    setPageNum((prev) => prev + 1);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const response = await fetchDataFromApi(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    if (data.results) {
      setData((prev) => ({
        ...prev,
        results: prev?.results.concat(response?.results),
      }));
    } else {
      setData(response);
    }
    setPageNum((prev) => prev + 1);
  };

  // console.log(data);

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
    //eslint-disable-next-line
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "Results" : "Result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, idx) => {
                  //eslint-disable-next-line
                  if (item.media_type === "person") return;
                  return <MovieCard key={idx} data={item} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="noResult">
              <span className="resultNotFound">{`Sorry No Results Found as "${query}" !`}</span>
              <img
                src={noResults}
                alt="noresult found"
                width={300}
                height={300}
              />
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;

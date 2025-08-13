import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//react router setup
import { BrowserRouter, Routes, Route } from "react-router-dom";
//css
import "./App.css";
//api call function
import { fetchDataFromApi } from "./utils/api";
//components
import {
  Header,
  Footer,
  Home,
  Details,
  SearchResult,
  Explore,
  Error,
} from "./index";
// store action functions
import { getGenres } from "./store/homeSlice";

function App() {
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data?.map(({ genres }) => {
      if (genres === undefined) {
        setIsError(true);
      }
      return genres?.map((item) => (allGenres[item.id] = item));
    });

    // console.log(allGenres);

    dispatch(getGenres(allGenres));
  };

  useEffect(() => {
    genresCall();
    //eslint-disable-next-line
  }, []);

  if (isError) return <Error />;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route errorElement={<Error />}>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

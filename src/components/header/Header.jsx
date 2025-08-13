import React, { useState, useEffect } from "react";
//icons
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
// react router dom
import { useNavigate, useLocation } from "react-router-dom";
//css file
import "./Header.scss";
//img
import logo from "../../assets/cinema1.png";
//components
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);

      setShowSearch(false);
      setQuery("");
    }
  };

  //navigate to explore page
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else if (type === "show") {
      navigate("/explore/tv");
    } else {
      navigate("/");
    }
    setMobileMenu(false);
  };

  //making page on top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // on scroll hide and show menu
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 10) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
          setShow("hide");
        } else {
          setShow("show");
        }
      } else {
        setShow("top");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () =>
      window.removeEventListener("scroll", scrollHandler, { passive: true });
  }, [lastScrollY, mobileMenu]);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate(`/`)}>
          <img src={logo} alt="logo img" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("home")}>
            Home
          </li>
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("show")}>
            Tv Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;

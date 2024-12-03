import { Link, useLocation } from "react-router-dom";
import FetchData from "../../fetching/FetchData";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import "./homeLoves.css";
import Error from "../../error/Error";

const HomeLoves = () => {
  const location = useLocation();
  let type = location.search.slice(1);
  if(!location.search.slice(1))
    type = undefined
  const { data, loading, error } = FetchData(`/hotel/find?${type ? "type=" + type : ""}`);

    const CheckStatusRating = (item) => {
      if (item < 10 && item > 9)
        return("Exceptional");
      else if (item > 8)
        return("Fabulous");
      else if (item > 6.5)
        return("Very good");
      else if (item > 5)
        return("Good");
      else if (item > 3.5)
        return("Excellent");
      else if (item > 1)
        return("Review score");
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="homelv">
        <div className="homelvWrapper">
          <h1>Discover all the hotels you might like</h1>
          <h2 className="homeType">{type ? <span>Type: <b>{type}</b></span> : <span>Type: <b>All types</b></span>}</h2>
          {data.length === 0 && <span className="noResult">Oops..There is no current  <b> {type}</b></span>}
          {!error ? (!loading) ?
            <div className="carts">
            {data.map((item) => (
              <div className="homeCart">
                <img src={item.photos[0]} alt="" />
                <div className="bottomCart">
                  <div className="bottomInfo">
                    <span className="bottomtitle">{item.title}</span>
                    <span className="bottomCity">{item.city}</span>
                  </div>
                  <div className="bottomRating">
                    <span className="buttonRating"> {item.rating}</span>
                    <span className="bottomStatus">{CheckStatusRating(item.rating)}</span>
                  </div>
                  <div className="bottomItems">
                    <div className="bottomSee">
                      <p className="bottomDesc">{item.desc}</p>
                      <span className="seeMore">See more.</span>
                    </div>
                    <Link  to={`/hotels/${item._id}`}><button className="bottomButton">Reserve now!</button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
              : <div className="loadingHome">
                  <span className="cercelHome first"></span>
                  <span className="cercelHome second"></span>
                  <span className="cercelHome third"></span>
              </div>
              : <Error type="" message="Not found this type!"/>
        }
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeLoves;

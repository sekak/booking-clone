import { useContext, useEffect, useState } from "react";
import FetchData from "../../fetching/FetchData";
import "./featured.css";
import Sketeton from "../../skeleton/Sketeton";
import Error from "../../error/Error";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/searchContext";

const Featured = () => {
  const [delay, setDelay] = useState(false);
  const navigate = useNavigate();
  const consumer = useContext(SearchContext)
  useEffect(() => {
    setTimeout(() => {
      setDelay(true);
    }, 1000);
  }, []);
  const { data, loading, error } = FetchData(
    "/hotel/countByCity?city=Marrakech,Fès,Essaouira,Chefchaouene,Rabat"
  );
  const handleClick = (destination) => {
    consumer.dispatch({type:'NEW_SEARCH',payload:{city: destination,
      dates: [
        { startDate: new Date(), endDate: new Date(), key: "selection" },
      ],
      options: { room: 0, adulte: 0, children: 0 }}})
      navigate("/hotels");
  };

  return (
    <div className="featured">
      {!error ? (
        delay && !loading ? (
          <>
            <div className="rowOne">
              <div
                className="featuredItem"
                onClick={() => handleClick("Marrakech")}
              >
                <img
                  src="https://cf.bstatic.com/xdata/images/city/540x270/579739.jpg?k=210a39c70f4d63a2cde9b2cf09cadbf5b9abfebf992fa2efa4f107ccf3cfd815&o="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Marrakech</h1>
                  <h2>{data[0]} properties</h2>
                </div>
              </div>
              <div className="featuredItem" onClick={() => handleClick("Fès")}>
                <img
                  src="https://media.istockphoto.com/id/1127640950/fr/vid%C3%A9o/vue-panoramique-sur-la-m%C3%A9dina-de-f%C3%A8s-au-maroc-sous-un-ciel-nuageux-au-premier-plan-on-peut.jpg?s=640x640&k=20&c=BLMU5RzcuD8GuAfNW7OFMVOsoqfcO6a1dQI93dp42G0="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Fès</h1>
                  <h2>{data[1]} properties</h2>
                </div>
              </div>
              <div
                className="featuredItem"
                onClick={() => handleClick("Essaouira")}
              >
                <img
                  src="https://skymoroccotrips.com/wp-content/uploads/2018/11/DSCN5514.jpg"
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Essaouira</h1>
                  <h2>{data[2]} properties</h2>
                </div>
              </div>
            </div>
            <div className="rowOne">
              <div
                className="featuredItem"
                onClick={() => handleClick("Rabat")}
              >
                <img
                  src="https://i.ytimg.com/vi/H5KadZK_mg8/maxresdefault.jpg"
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Rabat</h1>
                  <h2>{data[4]} properties</h2>
                </div>
              </div>
              <div
                className="featuredItem"
                onClick={() => handleClick("Chefchaouene")}
              >
                <img
                  src="https://i.pinimg.com/736x/72/25/dd/7225dddde709cd145f5f1bb46e23fad8.jpg"
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Chefchaouene</h1>
                  <h2>{data[3]} properties</h2>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Sketeton type="featured" />
        )
      ) : (
        <Error type="data" message="can't fetch data" />
      )}
    </div>
  );
};

export default Featured;

import { useContext, useEffect, useState } from "react";
import FetchData from "../../fetching/FetchData";
import "./reserve.css";
import { IoIosCloseCircle } from "react-icons/io";
import { SearchContext } from "../../Context/searchContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Error from "../../error/Error";

const Reserve = ({ setOpenModal, id }) => {
  const { data, error, loading } = FetchData(`/hotel/rooms/${id}`);
  const [reserveRoom, setReserveRoom] = useState([]);
  const [blocked, setBlocked] = useState(false);
  const handleClick = (e) => {
    const checked = e.target.checked;
    setReserveRoom(
      checked
        ? [...reserveRoom, e.target.value]
        : reserveRoom.filter((id) => id !== e.target.value)
    );
  };

  const { dates } = useContext(SearchContext);
  const getDatesInRange = () => {
    let list = [];
    // if reserved
    const start = new Date(dates[0]?.startDate);
    const end = new Date(dates[0]?.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    // if not reserved , automatically reserves 1 day
    const dateStart = new Date();
    const dateEnd = new Date();
    dateStart.setHours(0, 0, 0, 0);
    dateEnd.setHours(0, 0, 0, 0);
    const datestart = new Date(dateStart);
    const dateend = new Date(dateEnd);

    if (dates[0]?.startDate && dates[0]?.endDate ) {
      while (start <= end) {
        console.log("object1")
        list.push(new Date(start).getTime());
        console.log("data store: " ,new Date(start))

        start.setDate(start.getDate() + 1);
      }
    } else {
      while (datestart <= dateend) {
        console.log("object2")
        list.push(new Date(datestart).getTime());
        console.log("data store: " ,new Date(datestart))
        datestart.setDate(datestart.getDate() + 1);
      }
    }
    return list;
  };

  const isAvailable = (rootNumber) => {
    return rootNumber.unavailableDates.some((op) =>
      getDatesInRange().includes(new Date(op).getTime())
    );
  };

  console.log("=>>>", getDatesInRange());
  const handleClickReserve = async () => {
    setOpenModal(false);
    try {
      for (const _id of reserveRoom) {
        await axios.put(`https://booking-clone-3.onrender.com/api/room/availablity/${_id}`, {
          unavailableDates: getDatesInRange(),
        });
      }
    } catch (err) {
      console.log("error");
    }
  };
  useEffect(() => {
    const handleChecked = () => {
      reserveRoom.length > 0 ? setBlocked(true) : setBlocked(false);
    };
    const target = document.getElementById("input");
    if (target) target.addEventListener("click", handleChecked());
  }, [reserveRoom]);

  return (
    <div className="reserve">
      {!error ? (
        !loading ? (
          <div className="reserveWrapper">
            <IoIosCloseCircle
              className="close"
              onClick={() => setOpenModal(false)}
            />
            {data.length > 0 && <h1 className="resTitle">Select rooms</h1>}
            {data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">Price: {item.price}</div>
                  <div className="rRrooms">
                    <div className="rRoom">
                      <label>{item.roomNumbers.number}</label>
                      <input
                        id="input"
                        type="checkbox"
                        disabled={isAvailable(item.roomNumbers)}
                        value={item._id}
                        onClick={handleClick}
                        className={isAvailable(item.roomNumbers) && "disable"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {data.length <= 0 ? (
              <>
                <h1 className="rNrooms">
                  Sorry, there are no rooms available at moment!
                </h1>
                <Link to="/HomeLoves">
                  <button className="rNroomsButton">
                    Homes you might like
                  </button>
                </Link>
              </>
            ) : (
              <button
                className={`reserveButton ${!blocked && `blockReserveButton`}`}
                onClick={handleClickReserve}
              >
                Reserve Now
              </button>
            )}
          </div>
        ) : (
          <div className="loadingHome reserveLoadin">
            <span className="cercelHome first"></span>
            <span className="cercelHome second"></span>
            <span className="cercelHome third"></span>
          </div>
        )
      ) : (
        <Error type="white" message="Not found 404!" />
      )}
    </div>
  );
};

export default Reserve;

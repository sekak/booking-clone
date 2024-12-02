import { Link, json } from "react-router-dom";
import "./navbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import axios from "axios";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import FetchData from "../../fetching/FetchData";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const refe = useRef(null);
  
  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    window.location.reload();
  };
  
  const token = JSON.parse(localStorage.getItem("token"));
  let user = JSON.parse(localStorage.getItem("user"));

  const { data } = FetchData(`/users/${user?._id}`);
  const [image, setImage] = useState("");
  
  const SaveImage = async (e) => {
    const img = e.target.files[0].name;
    const file = e.target.files[0];
    const storageRef = ref(storage, img);

    console.log("storageRef",storageRef)
    try {
      await uploadBytes(storageRef, file)  
      await getDownloadURL(storageRef)
      .then((url) => {
        axios.put(
          `https://booking-clone-3.onrender.com/api/users/${user._id}`,
          {
            img:url,
          },
          { headers: { Authorization: `Bearer ${token}` } }
          );
          setImage(url)
          console.log("url",url)
        })
        .catch((err) => console.log(err));
        console.log("save image to firebase!");
      } catch (err) {
        console.log("dont save image to firebase!");
        console.log(err);
      }
      
    };
    
    
  const handleClickImg = () => {
    if (refe.current) refe.current.click();
  };
  return (
    <div className="navbar">
    <div className="navContainer">
    <Link to="/">
    <span className="logo">Booking</span>
    </Link>
        <div className="navItems">
          {state.user ? (
            <div className="navUser">
              <div className="navImgIcon">
                <img
                  className="navImage"
                  src={image ? image : data.img ? data.img : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                  alt=""
                />
                <MdOutlineAddCircleOutline
                  className="iconAdd"
                  onClick={handleClickImg}
                />
              </div>

              <input
                style={{ display: "none" }}
                ref={refe}
                type="file"
                onChange={(e) => SaveImage(e)}
              />
              <span className="navUsername">{state.user.username}</span>
              <button onClick={handleClick} className="navButton">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/register">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

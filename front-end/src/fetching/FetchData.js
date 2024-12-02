import axios from "axios";
import { useEffect, useState } from "react";

const FetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await axios.get(
          "https://booking-clone-3.onrender.com/api" + url,
          token && {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    console.log("in reFetch data", url);
    setLoading(true);
    try {
      const res = await axios.get("https://booking-clone-3.onrender.com/api" + url);
      setData(res.data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default FetchData;

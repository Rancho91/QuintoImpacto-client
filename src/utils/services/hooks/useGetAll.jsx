/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import instanceAxios from "../axiosConfig";
import { LOCAL_URL } from "../constants";

const useGetAll = (props) => {
  const { url, token, needsAuth, refresh } = props;
  const [data, setData] = useState(null);
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    if (needsAuth) {
      return await instanceAxios.get(`${LOCAL_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (!needsAuth) {
      return await instanceAxios.get(`${LOCAL_URL}/${url}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getAllDataPromise = getData();
    getAllDataPromise
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setError({
          status: true,
          message: "Cannot get data",
        });
        setData(null);
        setLoading(false);
      });
  }, [url, refresh]);

  return { data, error, loading };
};

export default useGetAll;

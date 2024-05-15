import { useState, useEffect } from "react";
import axios from "axios";
import instanceAxios from "../axiosConfig";

export const useGetToken = (url, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await instanceAxios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, token]);

  return { data, loading, error };
};

export default useGetToken;

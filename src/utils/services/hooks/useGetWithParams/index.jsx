import React, { useEffect, useState } from "react";
import instanceAxios from "../../axiosConfig";
import { LOCAL_URL } from "../../constants";

const useGetWithParams = (props) => {
    const { url, size, pageNumber, category } = props;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const getData = async () => {
        if (!category) {
            return await instanceAxios.get(`${LOCAL_URL}/${url}`, {
                params: { size: size, pageNumber: pageNumber },
            });
        }

        if (category) {
            return await instanceAxios.get(`${LOCAL_URL}/${url}`, {
                params: { id: category, size: size, pageNumber: pageNumber },
            });
        }
    };

    useEffect(() => {
        setLoading(true);
        const getDataPromise = getData();
        getDataPromise
            .then((data) => {
                setData(data);
                setError(false);
                setLoading(false);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setData(null);
                setError({
                    error: true,
                    message: error,
                });
                setLoading(false);
            });
    }, [url, size, pageNumber]);

    return { data, error, loading };
};

export default useGetWithParams;

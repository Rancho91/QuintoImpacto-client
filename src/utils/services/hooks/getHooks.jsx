import { useEffect, useState } from "react";
import instanceAxios from "../axiosConfig";
import { SuppliersData } from "../../data/suppliersMock";

export default function useGetByNameHook(props) {
  const { url, name, size, pageNumber } = props;
  const [data, setData] = useState(null);
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      try {
        if (!name) {
          setData(null)
          return
        }
        const response = await instanceAxios.get(url, { params: { name: name, size: size, pageNumber: pageNumber } });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError({ status: true, message: "No se pudo traer la informacion" });
        setData(null)
      }
    };
    get();
  }, [url, name, size, pageNumber]);

  return { data, loading, error };
}

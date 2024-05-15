import instanceAxios from "../axiosConfig";
import { LOCAL_URL } from "../constants";

const useGetPulblication = async ({ url, token }) => {

    try {
        const data = await instanceAxios.get(`${LOCAL_URL}/${url}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return { data };

    } catch (error) {
        throw error
    }
  
};

export default useGetPulblication;
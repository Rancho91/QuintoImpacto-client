import instanceAxios from "../axiosConfig";
import { LOCAL_URL } from "../constants";



const useDelete = async ({ url, token }) => {

    try {
        const data = await instanceAxios.delete(`${LOCAL_URL}/${url}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return { data };

    } catch (error) {
        throw error
    }
  


};

export default useDelete;
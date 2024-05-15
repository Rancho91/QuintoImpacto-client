import instanceAxios from "../axiosConfig";
import { LOCAL_URL } from "../constants";



const useUpdate = async ({ url, body, token }) => {

    try {
        const data = await instanceAxios.put(`${LOCAL_URL}/${url}`,body, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return { data };

    } catch (error) {
        throw error
    }
  


};

export default useUpdate;
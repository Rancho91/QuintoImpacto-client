import instanceAxios from "../axiosConfig"
import { LOCAL_URL } from "../constants"

const useGetWithoutEffect = async ({ url }) => {
  try {
    const data = await instanceAxios.get(`${LOCAL_URL}/${url}`)
    return { data }
  } catch (error) {
    throw error
  }
}

export default useGetWithoutEffect

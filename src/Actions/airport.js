import axios from "axios";

export const getAllAirports = async () => {
  try {
    const res = await axios.get("/airport.json", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get airport");
  }
};

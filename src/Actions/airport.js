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

export const getAllOneWay = async (data) => {
  const myHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    apikey: "ITT88534696524514",
    secretecode: "BOUINpK3g7kUI9TJ9eVgaK8l1stXNzz4YC5KiOBotf9",
  };

  console.log("first", data);

  try {
    const response = await axios.post(
      "https://devapi.innotraveltech.com/flight/search",
      data,
      {
        headers: myHeaders,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to perform flight search"
    );
  }
};
// export const getMulticity = async () => {
//   const data = {
//     "journey_type": "MultiCity",
//     "segment": [
//       {
//         "departure_airport_type": "AIRPORT",
//         "departure_airport": "RUH",
//         "arrival_airport_type": "AIRPORT",
//         "arrival_airport": "JED",
//         "departure_date": "2023-12-20"
//       },
//       {
//         "departure_airport_type": "AIRPORT",
//         "departure_airport": "JED",
//         "arrival_airport_type": "AIRPORT",
//         "arrival_airport": "AHB",
//         "departure_date": "2023-12-22"
//       },
//       {
//         "departure_airport_type": "CITY",
//         "departure_airport": "AHB",
//         "arrival_airport_type": "AIRPORT",
//         "arrival_airport": "JED",
//         "departure_date": "2023-12-25"
//       }
//     ],
//     "travelers_adult": 1,
//     "travelers_child": 0,
//     "travelers_child_age": 0,
//     "travelers_infants": 0,
//     "travelers_infants_age": [""],
//     "preferred_carrier": [null],
//     "non_stop_flight": "any",
//     "baggage_option": "any",
//     "booking_class": "Economy",
//     "supplier_uid": "all",
//     "partner_id": "",
//     "language": "en"
//   };

//   const myHeaders = {
//     "Accept": "application/json",
//     "Content-Type": "application/json",
//     "apikey": "ITT88534696524514",
//     "secretecode": "BOUINpK3g7kUI9TJ9eVgaK8l1stXNzz4YC5KiOBotf9"
//   };

//   axios.post("https://devapi.innotraveltech.com/flight/search", data, {
//     headers: myHeaders
//   })
//   .then((response) => {
//     console.log(response.data); // Log the response data
//   })
//   .catch((error) => {
//     console.error(error); // Log any errors
//   });
// };
// export const getRoundTrip = async () => {
//   const data = {
//     "journey_type": "RoundTrip",
//     "segment": [
//       {
//         "departure_airport_type": "CITY",
//         "departure_airport": "RUH",
//         "arrival_airport_type": "AIRPORT",
//         "arrival_airport": "JED",
//         "departure_date": "2023-12-20",
//         "arrival_date": "2023-12-30"
//       }
//     ],
//     "travelers_adult": 1,
//     "travelers_child": 0,
//     "travelers_child_age": 0,
//     "travelers_infants": 0,
//     "travelers_infants_age": [""],
//     "preferred_carrier": [null],
//     "non_stop_flight": "any",
//     "baggage_option": "any",
//     "booking_class": "Economy",
//     "supplier_uid": "all",
//     "partner_id": "",
//     "language": "en"
//   };

//   const myHeaders = {
//     "Accept": "application/json",
//     "Content-Type": "application/json",
//     "apikey": "ITT88534696524514",
//     "secretecode": "BOUINpK3g7kUI9TJ9eVgaK8l1stXNzz4YC5KiOBotf9"
//   };

//   axios.post("https://devapi.innotraveltech.com/flight/search", data, {
//     headers: myHeaders
//   })
//   .then((response) => {
//     console.log(response.data); // Log the response data
//   })
//   .catch((error) => {
//     console.error(error); // Log any errors
//   });
// };

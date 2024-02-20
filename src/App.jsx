import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import axios from "axios";

const getAllOneWay = async () => {
  console.log("from inner");
 


const myHeaders = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "apikey": "ITT88534696524514",
  "secretecode": "BOUINpK3g7kUI9TJ9eVgaK8l1stXNzz4YC5KiOBotf9"
};

const data = {
  "journey_type": "OneWay",
  "segment": [
    {
      "departure_airport_type": "AIRPORT",
      "departure_airport": "DAC",
      "arrival_airport_type": "AIRPORT",
      "arrival_airport": "JED",
      "departure_date": "2024-05-20"
    }
  ],
  "travelers_adult": 1,
  "travelers_child": 0,
  "travelers_child_age": 0,
  "travelers_infants": 0,
  "travelers_infants_age": [""],
  "preferred_carrier": [null],
  "non_stop_flight": "any",
  "baggage_option": "any",
  "booking_class": "Economy",
  "supplier_uid": "all",
  "partner_id": "",
  "language": "en"
};

axios.post("https://devapi.innotraveltech.com/flight/search", data, {
  headers: myHeaders
})
.then((response) => {
  // console.log(response.data);
})
.catch((error) => {
  // console.error(error);
});

   

};

function App() {
  useEffect(() => {
    getAllOneWay();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;

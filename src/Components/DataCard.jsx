import React from "react";
import CheapestTab from "./CheapestTab";
import BaggageComponent from "./BaggageComponent";
import { FaShare } from "react-icons/fa6";
import { MdNoMealsOuline } from "react-icons/md";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FaShoppingBag, FaShoppingBasket } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const DataCard = ({ f }) => {
  const {
    tracking_id,
    flight_key,
    hold_possible,
    package_option,
    last_ticket_time,
    offer_id,
    routingIdentifier,
    search_parameter,
    pax_options,
    supplier,
    flight_group,
    price,
    sell,
    margin,
    price_breakdown,
    baggage,
    fare_rules,
    filter,
    filter_unique_filter_code,
    total_price,
    destination_reach_time,
    destination_reach_timestamp,
  } = f;

  const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpened = () => {
    setOpened(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClosed = () => {
    setOpened(false);
  };

  return (
    <div>
      {/* {
        filter_data=="cheapest_flight"? <CheapestTab />:""
      } */}
      <div className="card lg:card-side hover:border-[#e3b1b3] hover:border-2 mb-7 font-medium bg-[#ffffff] shadow-2xl">
        <div className="overflow-x-auto  flex flex-col justify-between  gap-2">
          <div className="flex flex-row justify-between  gap-2">
            {" "}
            <table className="table lg:w-[54vw] 2xl:w-[44vw] ">
              {/* head */}
              <thead className="bg-[#f8f8f8] text-lg font-medium px-4 py-2 ">
                <tr>
                  <th>Airline</th>
                  <th>Details</th>
                  <th className="text-center">Deparature</th>
                  <th className="text-center">Arrival</th>
                  <th>Duration</th>
                  <th className=" flex gap-1 items-center justify-center">
                    Baggage
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>
                    {flight_group.map((flight) => (
                      <div key={flight.routes[0].air_segment_key}>
                        {/* Displaying operating carrier logo */}
                        <img
                          className="w-10 h-10 rounded-full border-2"
                          src={`https://gtrs-airlineimages.s3.ap-southeast-1.amazonaws.com/icon/${flight.routes[0].marketing.carrier}.png`}
                          alt="Operating Carrier Logo"
                        />
                      </div>
                    ))}
                  </th>
                  <td>
                    {" "}
                    {flight_group.map((flight) => (
                      <div key={flight.routes[0].air_segment_key}>
                        {" "}
                        <p>
                          {flight.routes[0].marketing.carrier}
                          {" -"}
                          {flight.routes[0].marketing.flight_number}
                        </p>{" "}
                      </div>
                    ))}
                  </td>
                  <td>
                    <div>
                      {flight_group.map((flight, index) => (
                        <div key={index}>
                          {/* Parse arrival time and format */}
                          {flight.routes[0]?.departure_time && (
                            <div className="text-center">
                              <h4 className="text-xl font-semibold">
                                {flight.routes[0].origin}
                              </h4>
                              <p className="text-xs text-neutral">
                                {new Date(
                                  flight.routes[0].departure_time
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                })}
                              </p>
                              <p className="text-xs text-neutral">
                                {new Date(
                                  flight.routes[0].departure_time
                                ).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              <p className="text-[#b5b5b5] text-[10px]">
                                Terminal {flight.routes[0]?.origin_terminal}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td>
                    <div>
                      {flight_group.map((flight, index) => (
                        <div key={index}>
                          {/* Parse arrival time and format */}
                          {flight.routes[0]?.arrival_time && (
                            <div className="text-center">
                              <h4 className="text-xl font-semibold">
                                {flight.routes[0].destination}
                              </h4>
                              <p className="text-xs text-neutral">
                                {new Date(
                                  flight.routes[0].arrival_time
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                })}
                              </p>
                              <p className="text-xs text-neutral">
                                {new Date(
                                  flight.routes[0].arrival_time
                                ).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              <p className="text-[#b5b5b5] text-[10px]">
                                Terminal{" "}
                                {flight.routes[0]?.destination_terminal}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td>
                    {flight_group.map((flight, index) => (
                      <div key={index}>
                        <p> {flight.routes[0].flight_time.substring(2)}</p>
                      </div>
                    ))}
                  </td>

                  <td className="  text-center ">
                    <div className="flex flex-row justify-center gap-1 items-center">
                      {flight_group.map((flight, index) => (
                        <div key={index}>
                          {flight.routes[0].baggages?.checked?.ADT?.title}
                        </div>
                      ))}
                      for{" "}
                      {flight_group.map((flight, index) => (
                        <div key={index}>
                          {
                            flight.routes[0].baggages?.checked?.ADT
                              ?.passenger_type
                          }
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>

                {flight_group?.map((f, index) => (
                  <React.Fragment key={index}>
                    {f.routes[1] && (
                      <>
                        <tr className="bg-[#f8e9ea] rounded-full px-2">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="text-xs  flex  gap-1 text-center">
                            Transit Time:{" "}
                            <p> {f.routes[1]?.lay_over.substring(5)}</p>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr className="">
                          <th>
                            {flight_group.map((flight) => (
                              <div key={flight?.routes[1]?.air_segment_key}>
                                {/* Displaying operating carrier logo */}
                                <img
                                  className="w-10 h-10 rounded-full border-2"
                                  src={`https://gtrs-airlineimages.s3.ap-southeast-1.amazonaws.com/icon/${flight?.routes[1]?.marketing?.carrier_logo}`}
                                  alt="Operating Carrier Logo"
                                />
                              </div>
                            ))}
                          </th>
                          <td>
                            {" "}
                            {flight_group?.map((flight) => (
                              <div key={flight?.routes[1]?.air_segment_key}>
                                {" "}
                                <p>
                                  {flight?.routes[1]?.marketing?.carrier}
                                  {" -"}
                                  {flight?.routes[1]?.marketing?.flight_number}
                                </p>{" "}
                              </div>
                            ))}
                          </td>
                          <td>
                            <div>
                              {flight_group.map((flight, index) => (
                                <div key={index}>
                                  {/* Parse arrival time and format */}
                                  {flight.routes[1]?.departure_time && (
                                    <div className="text-center">
                                      <h4 className="text-xl font-semibold">
                                        {flight.routes[1].origin}
                                      </h4>
                                      <p className="text-xs text-neutral">
                                        {new Date(
                                          flight.routes[1].departure_time
                                        ).toLocaleDateString("en-US", {
                                          weekday: "short",
                                          year: "numeric",
                                          month: "short",
                                          day: "2-digit",
                                        })}
                                      </p>
                                      <p className="text-xs text-neutral">
                                        {new Date(
                                          flight.routes[1].departure_time
                                        ).toLocaleTimeString("en-US", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </p>
                                      <p className="text-[#b5b5b5] text-[10px]">
                                        Terminal{" "}
                                        {flight.routes[1]?.origin_terminal}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>

                          <td>
                            <div>
                              {flight_group.map((flight, index) => (
                                <div key={index}>
                                  {/* Parse arrival time and format */}
                                  {flight.routes[1]?.arrival_time && (
                                    <div className="text-center">
                                      <h4 className="text-xl font-semibold">
                                        {flight.routes[1].destination}
                                      </h4>
                                      <p className="text-xs text-neutral">
                                        {new Date(
                                          flight.routes[1].arrival_time
                                        ).toLocaleDateString("en-US", {
                                          weekday: "short",
                                          year: "numeric",
                                          month: "short",
                                          day: "2-digit",
                                        })}
                                      </p>
                                      <p className="text-xs text-neutral">
                                        {new Date(
                                          flight.routes[1].arrival_time
                                        ).toLocaleTimeString("en-US", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </p>
                                      <p className="text-[#b5b5b5] text-[10px]">
                                        Terminal{" "}
                                        {flight.routes[1]?.destination_terminal}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td>
                            {flight_group.map((flight, index) => (
                              <div key={index}>
                                <p>
                                  {" "}
                                  {flight.routes[1].flight_time.substring(2)}
                                </p>
                              </div>
                            ))}
                          </td>
                          <td className="  text-center ">
                            <div className="flex flex-row justify-center gap-1 items-center">
                              {flight_group.map((flight, index) => (
                                <div key={index}>
                                  {
                                    flight.routes[1].baggages?.checked?.ADT
                                      ?.title
                                  }
                                </div>
                              ))}
                              for{" "}
                              {flight_group.map((flight, index) => (
                                <div key={index}>
                                  {
                                    flight.routes[1].baggages?.checked?.ADT
                                      ?.passenger_type
                                  }
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <h3 className="flex flex-col justify-center gap-2 items-center p-5  ml-auto font-semibold text-center">
              <span className="text-sm">Per 1 Passenger</span>₨ {total_price}
              <button className="btn py-3 px-6 text-rose-700 border-rose-700">
                Select
              </button>
              <span className="text-sm">All Passengers</span>₨ {total_price}
            </h3>
          </div>
          <div className="px-4 flex  justify-between py-4 bg-gray-100 w-full">
            <div className="flex items-center gap-5">
              {" "}
              <img
                className="h-5 w-5 bg-gray-100 border-2 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/3280/3280084.png"
                alt=""
              />
              <div className="flex items-center gap-2 text-yellow-400">
                {" "}
                <FaShare />
                Share
              </div>
            </div>
            <div className="flex flex-row justify-evenly gap-2">
              <React.Fragment>
                <Button onClick={handleOpen}>Flight Options</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style, width: 700 }}>
                    <h2
                      id="child-modal-title"
                      className="bg-[#3b0764] h-auto text-white p-3 text-xl"
                    >
                      Filght Options
                    </h2>
                    <div id="child-modal-description">
                      {flight_group.map((flight, index) => (
                        <React.Fragment key={index}>
                          <div className="flex border-2 flex row justify-between font-semibold">
                            <div className=" flex p-2 flex-col">
                              <span className="text-xl font-bold py-4 px-3">
                                Option {index + 1}
                              </span>
                              <p className="px-3 text-xs ">
                                Class of Service:
                                {flight.routes[0]?.booking_class?.cabin_class}
                              </p>
                              <p className="px-3 flex items-center gap-2 text-rose-600">
                                <FaShoppingBag /> Baggage:{" "}
                                {
                                  flight.routes[0]?.baggages?.checked?.ADT
                                    ?.title
                                }
                              </p>
                              <p className="px-3 flex items-center gap-2 text-blue-300">
                                <FaShoppingBasket /> Hand Baggage:{" "}
                                {
                                  flight?.routes[0]?.baggages.checked.ADT
                                    .pieceCount
                                }{" "}
                                pieces
                              </p>
                            </div>
                            <div className="flex flex-col justify-center gap-2 items-center p-5  ml-auto font-semibold text-center">
                              ₨ {total_price}
                              <span className="text-sm">{filter.refund}</span>
                              <button className="btn py-3 px-6 text-rose-700 border-rose-700">
                                Select
                              </button>
                            </div>
                          </div>
                          {flight?.routes[1] && (
                            <div className="flex border-2 flex-row justify-between">
                              <div key={index} className=" flex p-2 flex-col">
                                <span className="text-xl font-bold py-4 px-3">
                                  Option {index + 2}
                                </span>
                                <p className="px-3">
                                  Class of Service :
                                  {flight.routes[1]?.booking_class?.cabin_class}
                                </p>
                                <p className="px-3 flex items-center gap-2 text-rose-600">
                                  <FaShoppingBag />
                                  Baggage:
                                  {
                                    flight.routes[1]?.baggages?.checked?.ADT
                                      ?.title
                                  }
                                </p>
                                <p className="px-3 flex items-center gap-2 text-blue-300">
                                  <FaShoppingBasket />
                                  Hand Baggage:{" "}
                                  {
                                    flight?.routes[1]?.baggages.checked.ADT
                                      .pieceCount
                                  }{" "}
                                  pieces
                                </p>
                              </div>
                              <div className="flex flex-col justify-center gap-2 items-center p-5  ml-auto font-semibold text-center">
                                ₨ {total_price}
                                <span className="text-sm">{filter.refund}</span>
                                <button className="btn py-3 px-6 text-rose-700 border-rose-700">
                                  Select
                                </button>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <Button
                      className="transform translate-x-[620px]"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </Box>
                </Modal>
              </React.Fragment>
              <React.Fragment>
                <Button onClick={handleOpened}>Fare Summary</Button>
                <Modal
                  open={opened}
                  onClose={handleClosed}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style, width: 700 }}>
                    <h2
                      id="child-modal-title"
                      className="bg-[#3b0764] h-auto text-white p-3 text-xl"
                    >
                      Fare BreakDown
                    </h2>
                    <div id="child-modal-description">
                      {flight_group.map((flight, index) => (
                        <React.Fragment key={index}>
                          <div className="overflow-x-auto">
                            <table className="table table-xs">
                              <thead>
                                <tr>
                                  <th className="border">Fare Summary</th>
                                  <th className="border">Base fare</th>
                                  <th className="border">Taxes + Fees</th>
                                  <th className="border">Per passenger</th>
                        
                                </tr>
                              </thead>
                              <tbody>
                              {price_breakdown.map((breakdown, idx) => (
            <tr key={idx}>
              <td className="border">{breakdown.passenger_type}</td>
              <td className="border">{breakdown.base_fare.amount}</td>
              <td className="border">{breakdown.tax.amount}</td>
              <td className="border">{breakdown.total.amount}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{total_price}</td>
          </tr>
                              </tbody>
                            </table>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>

                    <Button
                      className="transform translate-x-[620px]"
                      onClick={handleClosed}
                    >
                      Close
                    </Button>
                  </Box>
                </Modal>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
{
  /*<div style={style} className="bg-white min-w-2xl  ">
  <div className="bg-[#3b0764] h-10 w-full text-white p-2 text-xl">
    {" "}
    Flight Options
  </div>

  {flight_group.map((flight, index) => (
    <div key={index}>
      <span className="text-xl font-bold py-4 px-3"> Option {index + 1}</span>
      Baggage: {flight.routes[1]?.baggages?.checked?.ADT?.title}
      Hand Baggage: {flight?.routes[0]?.baggages.checked.ADT.pieceCount} pieces
      {/* Add more flight details as needed */
}

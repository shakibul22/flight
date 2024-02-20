import React from "react";

const DataCard = ({ f }) => {
  const { baggage,filter } = f;
  console.log(f);
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="overflow-x-auto flex flex-row justify-between gap-5">
          <table className="table ">
            {/* head */}
            <thead className="bg-gray-300  px-4 py-2 ">
              <tr>
                <th>Airline</th>
                <th>Details</th>
                <th>Deparature</th>
                <th>Arrival</th>
                <th>Duration</th>
                <th>Baggage</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>
                    Quality Control Specialist</td>
                <td>Blue</td>
                <td>Blue</td>
                <td>
                  {baggage.map((b) => (
                    <p key={b.Id}>
                      {b.title} kg for {b.passenger_type}
                    </p>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <h3 className="">sdjfdic</h3>
        </div>
      </div>
    </div>
  );
};

export default DataCard;

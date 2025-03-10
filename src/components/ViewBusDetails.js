import React, {  useContext } from "react";
import { DContext } from "../context/Datacontext";


const ViewBusDetails = () => {
  
  const {Buses}=useContext(DContext)



  const handleclickBus = (id) => {
    if(id){
      window.location.href=`/Tracking-Bus/${id}`
    }
  }


  if (Buses === null) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Bus Details</h2>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="px-4 py-2 border">SL.no</th>
              <th className="px-4 py-2 border">Bus Number</th>
              <th className="px-4 py-2 border">Bus Source</th>
              <th className="px-4 py-2 border">Bus Destination</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {Buses.map((bus, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border text-center">{bus.busNo}</td>
                <td className="px-4 py-2 border text-center">{bus.startPoint}</td>
                <td className="px-4 py-2 border text-center">{bus.endPoint}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className=" text-white px-4 py-2 rounded-md  transition w-full sm:w-auto"
                    onClick={() =>handleclickBus(bus.busNo)}
                  >
                    👁️ 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBusDetails;



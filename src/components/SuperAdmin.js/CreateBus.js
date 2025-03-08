import React, { useState } from "react";
import PowermangeUser from '../../assets/57121.jpg'

const CreateBus = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const [busData, setBusData] = useState({
    busNo: "",
    startPoint: "",
    endPoint: "",
    seatCapacity : "",
  });

  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (busData) {
      fetch(`${apiurl}/Create-bus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(busData),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.success === true){
            alert(data.message);
            console.log("buses",data.Bus)

          }
        })
        .catch((err) => {
          console.log("Troubleing Error to Create bus may be network issue please try again later", err);
          alert("Troubleing Error to Create bus may be network issue please try again later");
        });
    } else {
      alert("Data value not declared");
    }

    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
                {/* Image Section */}
                <div className="hidden md:flex md:w-1/2 p-6 justify-center items-center">
          <img
            src={PowermangeUser}
            alt="Register Illustration"
            className="w-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Create Bus</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bus Number */}
          <div>
            <label className="block text-sm font-medium">Bus Number</label>
            <input
              type="text"
              name="busNo"
              value={busData.busNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 pr-10"
              placeholder="Enter Bus Number"
              required
            />
          </div>

          {/* Start Point */}
          <div>
            <label className="block text-sm font-medium">Start Point</label>
            <input
              type="text"
              name="startPoint"
              value={busData.startPoint}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 pr-10"
              placeholder="Enter Start Location"
              required
            />
          </div>

          {/* End Point */}
          <div>
            <label className="block text-sm font-medium">End Point</label>
            <input
              type='text'
              name="endPoint"
              value={busData.endPoint}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 pr-10"
              placeholder="Enter End Location"
              required
            />
          </div>

            {/* End Point */}
            <div>
            <label className="block text-sm font-medium">End Point</label>
            <input
              type="number"
              name="seatCapacity"
              value={busData.seatCapacity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 pr-10"
              placeholder="Enter End Location"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full  text-white p-2 rounded-lg bg-black hover:bg-slate-800 transition"
          >
            Create Bus
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default CreateBus;


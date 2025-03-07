import React from "react";
import Bus from '../../assets/traffic-vehicle-urban-reflections-city.jpg'
import Admin from '../../assets/young-beautiful-woman-casual-clothes-holding-laptop-happy-positive-looking-smiling-confident-showing-thumb-up.jpg'

const SuperAdminPage = () => {
    

    const handleAdmin = () => {
        window.location.href='/CreateAdmin'
    }

    const handleBus = () => {
        window.location.href='/CreateBus'
    }


  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-6 p-4 bg-gray-100">
      {/* Admin Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center w-full md:w-1/3" onClick={handleAdmin}>
        <img
          src={Admin}
          alt="Admin"
          className=" object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold">Create Admin</h2>
      </div>

      {/* Bus Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center w-full md:w-1/3" onClick={handleBus}>
        <img
          src={Bus}
          alt="Bus"
          className="object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold">Create Bus</h2>
      </div>
    </div>
  );
};

export default SuperAdminPage;


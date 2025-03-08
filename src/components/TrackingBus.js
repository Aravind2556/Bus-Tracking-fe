import React, { useEffect, useState } from "react";

export const TrackingBus = () => {
    const [busData, setBusData] = useState(null);

    // Mapping numbers to places
    const locationMapping = {
        0: "Waiting...",
        1: "Salem",
        2: "Erode",
        3: "Coimbatore",
        4: "Coimbatore",
        5: "Erode",
        6: "Salem"
    };

    

    const fetchBusTracking = () => {
        fetch(`https://api.thingspeak.com/channels/2868165/feeds.json?api_key=0N40M3MTD5GOKG48`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data feeding",data)
                if (data && data.feeds.length > 0) {
                    // Get the latest data
                    const latestBusData = data.feeds[data.feeds.length - 1];

                    // Split the received string into parts
                    const values = latestBusData.field1?.split(",") || [];

                    console.log("valus",values)

                    if (values.length > 0 ) {
                        setBusData({
                            busNumber: values[0], // Bus Number
                            seatingCapacity: values[1], // Seating Capacity
                            availableSeats: values[2], // Available Seats
                            longitude: values[3], // Longitude
                            latitude: values[4], // Latitude
                            fromLocation: locationMapping[values[5]] , // From Location
                            toLocation: locationMapping[values[6]] , // To Location
                        });
                    }
                }
            })
            .catch((err) => {
                console.error("Error fetching bus tracking data:", err);
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchBusTracking();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // 📌 **Navigate to Google Maps with LIVE Tracking**
    const openLiveTracking = () => {
        if (busData?.latitude && busData?.longitude) {
            window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${busData.latitude},${busData.longitude}&travelmode=driving`,
                "_blank"
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-6 min-h-screen bg-gray-100">
            {busData ? (
                <>
                    {/* Bus Number */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 border border-gray-300">
                        <h2 className="text-lg font-semibold text-gray-700">Bus Number</h2>
                        <p className="text-xl font-bold text-blue-600">{busData.busNumber}</p>
                    </div>

                    {/* Seating Capacity */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 border border-gray-300">
                        <h2 className="text-lg font-semibold text-gray-700">Seating Capacity</h2>
                        <p className="text-xl font-bold text-green-600">{busData.seatingCapacity}</p>
                    </div>

                    {/* Available Seats */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 border border-gray-300">
                        <h2 className="text-lg font-semibold text-gray-700">Available Seats</h2>
                        <p className="text-xl font-bold text-red-600">{busData.availableSeats}</p>
                    </div>

                    {/* From Location */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 border border-gray-300">
                        <h2 className="text-lg font-semibold text-gray-700">From</h2>
                        <p className="text-xl font-bold text-purple-600">{busData.fromLocation}</p>
                    </div>

                    {/* To Location */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 border border-gray-300">
                        <h2 className="text-lg font-semibold text-gray-700">To</h2>
                        <p className="text-xl font-bold text-orange-600">{busData.toLocation}</p>
                    </div>

                    {/* Live Tracking Button */}
                    <div 
                        className="bg-blue-500 shadow-md rounded-lg p-6 text-center w-64 border border-gray-300 cursor-pointer hover:bg-blue-600 text-white"
                        onClick={openLiveTracking}
                    >
                        <h2 className="text-lg font-semibold">📍 Live Tracking</h2>
                        <p className="text-xl font-bold">Click Here</p>
                    </div>
                </>
            ) : (
                <p className="text-gray-700 text-lg font-semibold">Loading bus data...</p>
            )}
        </div>
    );
};

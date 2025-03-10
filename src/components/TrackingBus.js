import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DContext } from "../context/Datacontext";
import Loading from "./createAccount/Loading";

export const TrackingBus = () => {
    const { Buses } = useContext(DContext);
    const [busData, setBusData] = useState(null);
    const { id } = useParams();

    const TrackingPlace = {
        0: "N/A",
        1: "Salem",
        2: "Erode",
        3: "Cbe",
        4: "Cbe",
        5: "Erode",
        6: "Salem"
    };

    // Fetch live bus tracking data
    const fetchBusTracking = () => {
        fetch(`https://api.thingspeak.com/channels/2868165/feeds.json?api_key=0N40M3MTD5GOKG48`)
            .then((res) => res.json())
            .then((data) => {
                console.log("think speak data", data);
                if (data && data.feeds.length > 0) {
                    const latestBusData = data.feeds[data.feeds.length - 1];
                    const values = latestBusData.field1?.split(",") || [];
                    if (values.length > 0) {
                        setBusData({
                            busNumber: values[0],
                            seatingCapacity: values[1],
                            availableSeats: values[2],
                            longitude: values[3],
                            latitude: values[4],
                            TrackingpointA: values[5],
                            TrackingpointB: values[6]
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

    // Open Google Maps for live tracking
    const openLiveTracking = () => {
        if (busData?.latitude && busData?.longitude) {
            window.open(
                `https://www.google.com/maps?q=${busData.longitude},${busData.latitude}`,
                "_blank"
            );
        }
    };

    // Show loading state if data is not available
    if (!Buses || !busData) {
        return <Loading />;
    }

    // Check if bus data matches the ID
    const isBusAvailable = busData.busNumber === id;

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-6">
            {isBusAvailable ? (
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

                    {/* Tracking Point A */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 border border-gray-300">
                        <h2 className="text-lg font-semibold text-gray-700">Tracking Point A</h2>
                        <p className="text-xl font-bold text-purple-600">
                            {busData.TrackingpointA}
                        </p>
                    </div>

                    {/* Tracking Point B */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 border border-gray-300">
                        <h2 className="text-lg font-semibold text-gray-700">Tracking Point B</h2>
                        <p className="text-xl font-bold text-purple-600">
                            {busData.TrackingpointB}
                        </p>
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
                <p className="text-gray-700 text-lg font-semibold">Bus not available: {id}</p>
            )}
        </div>
    );
};

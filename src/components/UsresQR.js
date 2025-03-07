import { useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const UsresQR = () => {
  const [scannedData, setScannedData] = useState(null);
  const scannerRef = useRef(null);

  const startScanner = () => {
    setScannedData(null);
    if (scannerRef.current) {
      scannerRef.current.clear();
    }

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        scanner.clear();
        window.location.href = decodedText;
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
    scannerRef.current = scanner;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      {!scannedData ? (
        <div id="qr-reader" className="w-64 h-64 bg-white rounded-lg shadow-md"></div>
      ) : (
        <p className="text-lg text-green-600 font-semibold">Scanned: {scannedData}</p>
      )}
      {scannedData && (
        <button
          onClick={startScanner}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Rescan
        </button>
      )}
      {!scannedData && (
        <button
          onClick={startScanner}
          className="mt-4 px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-lg shadow "
        >
          Start Scanning
        </button>
      )}

      <a href="/login" >GO to Login</a> 
    </div>
  );
};

export default UsresQR;

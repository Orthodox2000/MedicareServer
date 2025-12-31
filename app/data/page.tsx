'use client'
import { useState } from 'react';
import axios from 'axios';
const DataEntryPage: React.FC = () => {
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [bp, setBp] = useState<string>('');
    const [walkedDistance, setwalkedDistance] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string>('');

    const validateInputs = (): boolean => {
        const h = parseFloat(height);
        const w = parseFloat(weight);
        const b = parseFloat(bp);
        const t = parseFloat(walkedDistance);

        if (isNaN(h) || h <= 0 || h > 300) {
            setErrorMessage('Height must be a positive number less than 300.');
            return false;
        }
        if (isNaN(w) || w <= 0 || w > 400) {
            setErrorMessage('Weight must be a positive number less than 400.');
            return false;
        }
        if (isNaN(b) || b <= 0 || b > 200) {
            setErrorMessage('Blood Pressure (bp) must be a positive number less than 200.');
            return false;
        }
        if (isNaN(t) || t <= 0 || t > 10000) {
            setErrorMessage('Talked Distance must be a positive number less than 10000.');
            return false;
        }

        setErrorMessage(null);
        return true;
    };
    //new function
    const handleSubmit = async () => {
        const currentTime = new Date().toISOString();
        const device = navigator.userAgent; // Client device info
       // const approxlocation =  navigator.geolocation.getCurrentPosition(
  //(position) => { in work
   // return(position.coords.latitude.toString()+position.coords.longitude.toString())});
        if (!validateInputs()) {
            return;
        }
        const data = {
            height: parseFloat(height),
            weight: parseFloat(weight),
            bp: parseFloat(bp),
            walkedDistance: parseFloat(walkedDistance)
        };

        // Construct query string
        const queryParams = new URLSearchParams({
            height: data.height.toString(),
            weight: data.weight.toString(),
            bp: data.bp.toString(),
            walkedDistance: data.walkedDistance.toString(),
            uploadTime: currentTime.toString(),
            deviceInfo: device.toString() 
        });

        try { // Send to server
            const response = await axios.get('http://localhost:3000/api/add', { params: queryParams });

            if (response.status >= 200 && response.status < 300) {
                // Successful response
                const result = response.data;
                setStatusMessage(`Data sent successfully `);
            } else {
                // Handle server errors
                const errorText = response.data || 'An error occurred';
                setStatusMessage(`Error: ${errorText}`);
            }
            setShowPopup(true);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Axios error, can access error.response, error.message, etc.
                if (error.response) {
                    const errorMsg = error.response.data || error.message;
                    setStatusMessage(`Server Error: ${errorMsg}`);
                } else if (error.request) {
                    setStatusMessage('No response from server. Please try again.');
                } else {
                    setStatusMessage(`Error: ${error.message}`);
                }
            } else {
                // Non-Axios error
                setStatusMessage('An unexpected error occurred.');
            }
            setShowPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
            <div className="max-w-xl w-full bg-white-400 p-8 rounded shadow-lg relative">
                <h2 className="text-2xl font-bold mb-6 text-center">Data Entry Form</h2>
                {/* Input fields */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="height">Height (cm)</label>
                    <input
                        id="height"
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Enter height"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="width">Weight (KG)</label>
                    <input
                        id="weight"
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter weight"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="bp">Blood Pressure (mm Hg)</label>
                    <input
                        id="bp"
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={bp}
                        onChange={(e) => setBp(e.target.value)}
                        placeholder="Enter blood pressure"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="talkedDistance">Talked Distance (meters)</label>
                    <input
                        id="talkedDistance"
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={walkedDistance}
                        onChange={(e) => setwalkedDistance(e.target.value)}
                        placeholder="Enter talked distance"
                    />
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-4 text-red-300 text-sm">{errorMessage}</div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Submit
                </button>

                {/* Success Popup */}
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white-500 p-6 rounded shadow-lg max-w-sm w-full relative">
                            <h3 className="text-xl font-semibold mb-4">Success</h3>
                            <p className="mb-4">{statusMessage}</p>
                            <button
                                onClick={handleClosePopup}
                                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataEntryPage;
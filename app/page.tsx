"use client";

import { useState, useRef,useEffect } from "react";
import registerAPI from "./DatabaseComponents/registerAPI"; 

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || loading) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await registerAPI(email); 
        //call function

      if (res.inserted) {
        setApiKey(res.key??null);
        setMessage("Registration successful! Your API key:");
      } else {
        setMessage("Error: " + res.message);
      }
    } catch (error) {
      setMessage("Unexpected error occurred");
    } finally {
      setLoading(false);
      // Start cooldown
      setDisabled(true);
      timerRef.current = setTimeout(() => {
        setDisabled(false);
      }, 10000); // 10 seconds
    }
  };

  // Cleanup timer on unmount
 useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg border mt-24 border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-blue-400 text-center">
        Register API Access
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <label className="block text-white font-medium" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />

        <button
          type="submit"
          disabled={disabled || loading}
          className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition ${
            disabled || loading ? "cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
          {message}
          {apiKey && (
            <div className="mt-2">
              <h3 className="font-semibold">Your API Key:</h3>
              <p className="break-all font-mono mt-1 bg-gray-100 p-2 rounded">{apiKey}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
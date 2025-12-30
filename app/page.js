"use client" 
const React=require('react');
const {useState}=require('react');
import registerAPI from './DatabaseComponents/registerAPI';

function generateUUID() {
  // Generate a UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
      
   
    return v.toString(16);
  });
}

const Page = () => {
  const [key, setKey] = useState('');
  const [copied, setCopied] = useState(false);
  var ReisterStatus,Message;
  const handleGenerate = () => {
    const newKey = generateUUID(); // or generate a cryptographic key
    setKey(newKey);
    setCopied(false); 
    RegisterStatus,Message=registerAPI(newKey);
    console.log(ReisterStatus,Message);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 font-sans">
      <h2 className="text-2xl font-semibold mb-6">API Key Generator</h2>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
        onClick={handleGenerate}
      >
        Generate Key
      </button>
      {key && (
        <div className="flex items-center mt-6 space-x-3 w-full max-w-xl px-4">
          <input
            type="text"
            value={key}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onFocus={(e) => e.target.select()}
          />
          <button
            className={`px-4 py-2 rounded shadow text-white transition ${
              copied ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button> 
        </div>
      )}
    </div>
  );
};

export default Page;
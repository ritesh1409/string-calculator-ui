import { useState } from "react";

export default function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:3000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numbers: input }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">String Calculator</h2>
        <input
          type="text"
          placeholder="Enter numbers (e.g., 1,2,3)"
          className="w-full p-2 border rounded mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={calculate}
        >
          Calculate
        </button>
        {result !== null && (
          <p className="mt-4 text-green-600 font-semibold">Result: {result}</p>
        )}
        {error && (
          <p className="mt-4 text-red-500">Error: {error}</p>
        )}
      </div>
    </div>
  );
}

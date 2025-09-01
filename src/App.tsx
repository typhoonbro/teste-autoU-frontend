import { useState } from "react";
import EmailForm from "./components/EmailForm";
import ResultsDisplay from "./components/ResultsDisplay";

export default function App() {
  const [result, setResult] = useState({
    category: "",
    suggested_response: "",
  });

  const [error, setError] = useState("");
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="home min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans p-4">
      <div className="home-backdrop w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        {result.suggested_response === "" && (
          <EmailForm
            setResult={setResult}
            setError={setError}
            error={error}
            result={result}
            setText={setText}
            text={text}
            setFile={setFile}
            file={file}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {result.suggested_response !== "" && (
          <ResultsDisplay
            result={result}
            setText={setText}
            setResult={setResult}
            setFile={setFile}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
}

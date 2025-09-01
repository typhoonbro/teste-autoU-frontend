import { useState } from "react";
import EmailForm from "./components/EmailForm";
import ResultsDisplay from "./components/ResultsDisplay";

export default function App() {
  
  const [result, setResult] = useState({category: "", suggested_response: ""});

  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Contato 
        </h1>

        <EmailForm setResult={setResult} setError={setError} error={error} result={result} setText={setText} text={text} setFile={setFile} file={file} setIsLoading={setIsLoading} isLoading={isLoading}/>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {result && (
         <ResultsDisplay result={result} />
        )}
      </div>
    </div>
  );
}

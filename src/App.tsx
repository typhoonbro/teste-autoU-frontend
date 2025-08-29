import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState({category: "", suggested_response: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return setError("Please select a file.");
    }
    setFile(e.target.files[0] as any);
    setText(""); // Limpa o texto se um arquivo for selecionado
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setFile(null); // Limpa o arquivo se o texto for digitado
  };
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text && !file) {
      setError("Por favor, escreva uma mensagem ou anexe um arquivo");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult({ category: "", suggested_response: "" });

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("text", text);
    }

    try {
      const response = await fetch("http://localhost:8000/process-email/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "An error occurred.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Contato 
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email-text"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
            Escreva a sua mensagem 
            </label>
            <textarea
              id="email-text"
              rows={8}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e as any)}
              placeholder="Escreva sua mensagem"
            />
          </div>

          <div className="text-center my-4 font-semibold text-gray-500">OR</div>

          <div className="mb-6">
            <label
              htmlFor="email-file"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Anexos
            </label>
            <input
              id="email-file"
              type="file"
              accept=".txt,.pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:bg-blue-300"
            >
              {isLoading ? "Processando..." : "Email enviado"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="mb-2">
                <strong className="font-semibold text-gray-700">
                 Categoria: 
                </strong>{" "}
                <span
                  className={
                    result.category === "Productive"
                      ? "text-green-600 font-bold"
                      : "text-orange-600 font-bold"
                  }
                >
                  {result.category}
                </span>
              </p>
              <p className="whitespace-pre-wrap">
                <strong className="font-semibold text-gray-700">
                  Resposta sugerida:
                </strong>{" "}
                {result.suggested_response}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

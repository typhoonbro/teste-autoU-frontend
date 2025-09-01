import React from "react";

interface EmailFormProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  result: { category: string; suggested_response: string };
  setResult: React.Dispatch<
    React.SetStateAction<{ category: string; suggested_response: string }>
  >;
}

export default function EmailForm(props: EmailFormProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return props.setError("Please select a file.");
    }
    props.setFile(e.target.files[0] as any);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!props.text && !props.file) {
      props.setError("Por favor, escreva uma mensagem ou anexe um arquivo");
      return;
    }

    props.setIsLoading(true);
    props.setError("");
    props.setResult({ category: "", suggested_response: "" });

    const formData = new FormData();
    if (props.file) {
      formData.append("file", props.file);
    }
    if (props.text) {
      formData.append("email_text", props.text);
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "An error occurred.");
      }

      const data = await response.json();
      props.setResult(data);
    } catch (err: any) {
      props.setError(err.message || "An unknown error occurred.");
    } finally {
      props.setIsLoading(false);
    }
  };
  return (
    <>
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
            value={props.text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleTextChange(e as any)
            }
            placeholder="Escreva sua mensagem"
          />
        </div>

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
            disabled={props.isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:bg-blue-300"
          >
            {props.isLoading ? "Processando..." : "Enviar"}
          </button>
        </div>
      </form>
    </>
  );
}

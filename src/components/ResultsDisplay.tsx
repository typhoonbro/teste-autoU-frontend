interface ResultsDisplayProps {
  result: {
    category: string;
    suggested_response: string;
   
  },
   setText: React.Dispatch<React.SetStateAction<string>>;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<{ category: string; suggested_response: string }>>;
}

export default function ResultsDisplay(props: ResultsDisplayProps)  {
     const resetForm = () => {
       props.setText("");
       props.setFile(null);
       props.setError("");
       props.setResult({ category: "", suggested_response: "" });
     };
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Classificação e sugestão de resposta:</h2>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="mb-2">
          <strong className="font-semibold text-gray-700">Categoria:</strong>{" "}
          <span
            className={
              props.result.category === "Produtivo"
                ? "text-green-600 font-bold"
                : "text-orange-600 font-bold"
            }
          >
            {props.result.category}
          </span>
        </p>
        <p className="whitespace-pre-wrap">
          <strong className="font-semibold text-gray-700">
            Resposta sugerida:
          </strong>{" "}
          {props.result.suggested_response}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline disabled:bg-blue-300"
          onClick={resetForm}
        >
          Nova mensagem
        </button>
      </div>
    </div>
  );
};



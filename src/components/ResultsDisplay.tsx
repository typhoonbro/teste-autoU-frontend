import React from 'react';

interface ResultsDisplayProps {
  result: {
    category: string;
    suggested_response: string;
  };
}

export default function ResultsDisplay(props: ResultsDisplayProps)  {
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="mb-2">
          <strong className="font-semibold text-gray-700">
            Categoria:
          </strong>{" "}
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
    </div>
  );
};



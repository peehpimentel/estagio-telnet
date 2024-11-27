"use client";

import React, { useCallback, useState } from "react";
import ButtonLayout from "../layout/buttonTicket";
import AutocompleteInputProps from '../common/AutoCompleteInput'

export default function ParentComponent() {
  const [text, setText] = useState(""); // State to hold the text value
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const body = { message: text }; // Include the text value in the API request body


  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Value from textarea:", text); // Access the text value here

    try {
      const res = await fetch('api/ixc', { 
        method: 'POST',
        body: JSON.stringify(body), 
      });
      console.log("Dados recebidos: ", res);
      if (!res.ok) {
        throw new Error(
          res.status === 404
            ? "API não encontrada."
            : "Impossível de acessar a API."
        );
      }
      const result = await res.json();
      
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ButtonLayout
      loading={loading}
      btnError={error}
      onSearchAction={handleSearch}
      text={text} // Pass the text value to ButtonLayout
      setTextAction={setText} // Pass the setText function to update text
    />
  );
}

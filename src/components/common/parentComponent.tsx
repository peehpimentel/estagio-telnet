"use client";

import React, { useCallback, useState } from "react";
import ButtonLayout from "../layout/buttonTicket";

export default function ParentComponent() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ixc');
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
    />
  );
}

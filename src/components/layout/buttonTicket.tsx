"use client";

import { Button, Textarea, Label, Radio } from "flowbite-react";
import React from "react";

type ButtonLayoutProps = {
  loading: boolean;
  btnError: string | null;
  onSearchAction: (e: React.FormEvent) => void;
};

export default function ButtonLayout({ loading, btnError, onSearchAction }: ButtonLayoutProps) {
  return (
    <form
      className=" flex flex-col justify-center items-center"
      onSubmit={onSearchAction} // Substituído o evento de clique por onSubmit
    >
      <Textarea
        id="comment"
        placeholder="Sua mensagem..."
        required
        rows={4}
        className=" w-full mb-2 bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
      />
      <fieldset className="relative w-64 mb-2 bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500">
        <div className="flex items-center gap-2">
          <legend>Prioridade: </legend>
          <Radio id="baixa" name="prioridade" value="B" />
          <Label htmlFor="baixa" className="text-gray-200">
            Baixa
          </Label>
          <Radio id="normal" name="prioridade" value="N" />
          <Label htmlFor="normal" className="text-gray-200">
            Normal
          </Label>
          <Radio id="alta" name="prioridade" value="A" />
          <Label htmlFor="alta" className="text-gray-200">
            Alta
          </Label>
        </div>
      </fieldset>
      <Button
        color="dark"
        type="submit"
        className="mb-2"
        disabled={loading} // Desabilitado com base na prop de loading
      >
        {loading ? "Carregando..." : "Pesquisar"}
      </Button>
      {btnError && <p style={{ color: "red" }}>{btnError}</p>}
    </form>
  );
}

"use client";

import { Button, Textarea, Label, Radio } from "flowbite-react";
import React, { useState } from "react";

type ButtonLayoutProps = {
  loading: boolean;
  btnError: string | null;
  onSearchAction: (e: React.FormEvent) => void;
  text: string; // Add `text` prop
  setTextAction: React.Dispatch<React.SetStateAction<string>>; // Add `setText` prop
};

export default function ButtonLayout({ loading, btnError, onSearchAction, text, setTextAction }: ButtonLayoutProps) {
  function mensagemCliente(event: { target: { value: React.SetStateAction<string> } }) {
    setTextAction(event.target.value); // Update text using `setText` from props
  }

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={onSearchAction}
    >
      <Textarea
        id="comment"
        placeholder="Sua mensagem..."
        required
        rows={4}
        className="w-full mb-2 bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
        value={text} // Controlled value
        onChange={(e) => setTextAction(e.target.value)}
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
        disabled={loading}
      >
        {loading ? "Carregando..." : "Pesquisar"}
      </Button>
      {btnError && <p style={{ color: "red" }}>{btnError}</p>}
    </form>
  );
}


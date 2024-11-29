"use client";

import { useState } from 'react';
import AutocompleteInput from '../common/AutoCompleteInput';
import { Textarea } from "flowbite-react";
import RadioGroupPrioridade from '../common/RadioGroupPrioridade';

interface Option {
  id: number;
  name: string;
}

interface TicketFormProps {
  clientesData: Option[];
  assuntoData: Option[];
  clientesError: boolean;
  assuntoError: boolean;
}

export default function TicketForm({
  clientesData,
  assuntoData,
  clientesError,
  assuntoError,
}: TicketFormProps) {

  const [cliente, setCliente] = useState<Option | null>(null);
  const [assunto, setAssunto] = useState<Option | null>(null);
  const [prioridade, setPrioridade] = useState<string>(''); 
  const [mensagem, setMensagem] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const submitData = async (payload: any) => {
    try {
      const response = await fetch('/api/ixc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Formulário enviado com sucesso!');
      } else {
        alert('Ocorreu um erro ao enviar o formulário.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente || !assunto || !prioridade || !mensagem) {
      alert('Preencha todos os campos antes de enviar.');
      return;
    }

    const payload = {
      "id_cliente": cliente.id,
      "id_assunto": assunto.id,
      "prioridade": prioridade,
      "mensagem": mensagem,
      "tipo": "C",
      "titulo": "Teste API",
      "id_ticket_setor": "5",
      "su_status": "N",
    };
    console.log(payload);
    

    setIsLoading(true);
    submitData(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
      <AutocompleteInput
        placeholder="Escolha o cliente"
        initialData={clientesData}
        hasError={clientesError}
        onChange={(value) => setCliente(value)} 
        value={cliente?.name || ''} 
      />

      <AutocompleteInput
        placeholder="Escolha o assunto"
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
      />
     <RadioGroupPrioridade 
        value={prioridade}
        onChange={setPrioridade} 
      />
      <Textarea
        placeholder="Digite a descrição do atendimento"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
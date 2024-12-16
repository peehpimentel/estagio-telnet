"use client";

import React, { SetStateAction, useEffect, useState } from 'react';
import AutocompleteInput from '../common/AutoCompleteInput';

interface Option {
  id: number;
  name: string;
  references?: number;
}

interface TicketFormProps {
  clientesData: Option[];
  funcionariosData: Option[];
  respostaData: Option[];
  ticketsData: Option[];
  clientesError: boolean;
  funcionariosError: boolean;
  respostaError: boolean;
  ticketsError: boolean;
}

export default function TicketForm({
  clientesData,
  funcionariosData,
  respostaData,
  ticketsData,
  clientesError,
  respostaError,
  funcionariosError,
  ticketsError,

}: TicketFormProps) {
  const [cliente, setCliente] = useState<Option | null>(null);
  const [ticket, setTicket] = useState<Option | null>(null);
  const [funcionarios, setFuncionarios] = useState<Option | null>(null);
  const [resposta, setResposta] = useState<Option | null>(null);
  const [horario, setHorario] = useState<string>(''); 
  const [menssagem, setMenssagem] = useState<string>('');
  const [date, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState<Option[]>(ticketsData);
  
  const submitData = async (payload: any) => {
    try {
      const response = await fetch('/api/os', {
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !cliente || 
      !resposta ||
      !horario ||
      !funcionarios ||
      !date
    ) {
      alert('Preencha todos os campos antes de enviar.');
      return;
    }

    function formatDateToBR(dateUS: string){
      const [year, month, day] = dateUS.split('-');
      return `${day}/${month}/${year}`
    }
  
    const dataUS = date;
    const dataBR = formatDateToBR(dataUS);

    const payload = {
      "menssagem": menssagem,
      "melhor_horario_reserva": horario,
      "id_resposta": resposta.id,
      "id_responsavel_tecnico": "1",
      "data_reservada": dataBR,
      "id_cliente": cliente.id,
    }  

    setIsLoading(true);
    submitData(payload);
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  }

  const funcionarioSelecionado = funcionariosData.find(
    (funcionario) => funcionario.id === 1
  );

  const handleClienteChange = (cliente: Option) => {
    setCliente(cliente);
    if (cliente) {
      const FilteredTickets = ticketsData.filter(
        (tickets) => tickets.references === cliente.id
      );
      setFilteredTickets(FilteredTickets);
      setTicket(null); 
    } else {
      setFilteredTickets(ticketsData); 
    }
  }

  return (
  <form onSubmit={handleSubmit}>
  <div className="grid gap-2 w-full max-w-lg mx-auto">

  <div className="grid grid-cols-3 items-center gap-5">      
    <label htmlFor="cliente" 
    className="text-md font-medium text-gray-300 
    whitespace-nowrap justify-self-end text-right">ID O.S: 
    </label>
    <div className="col-span-2">
      <AutocompleteInput
      placeholder="Escolha a O.S"
      initialData={filteredTickets}
      hasError={ticketsError}
      onChange={(value) => setTicket(value)} 
      value={ticket?.name || ''}
      />
    </div>
  </div>

  <div className="grid grid-cols-3 items-center gap-5">      
    <label htmlFor="cliente" 
    className="text-md font-medium text-gray-300 
    whitespace-nowrap justify-self-end text-right">Cliente: 
    </label>
    <div className="col-span-2">
      <AutocompleteInput
      placeholder="Escolha o cliente"
      initialData={clientesData}
      hasError={clientesError}
      onChange={handleClienteChange} 
      value={cliente?.name || ''}
      />
    </div>
  </div>

    <div className="grid grid-cols-3 items-center gap-5">      
      <label htmlFor="colaborador" 
      className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Colaborador responsável: </label>
      <div className="col-span-2">
        <AutocompleteInput
        initialData={funcionariosData}
        hasError={funcionariosError}
        onChange={(value) => setFuncionarios(value)} 
        value={funcionarioSelecionado?.name || ''} 
        />
      </div>
    </div>
    
  <div className="grid grid-cols-3 items-center gap-5">      
    <label htmlFor="data-reservada" 
    className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Data reservada: </label>
    <div className="col-span-2">
      <input type="date" name="date" id="date" className="border rounded-md shadow-sm
      focus:ring-blue-500 focus:border-blue-500 px-4 py-2 bg-gray-800 text-gray-200" value={date} onChange={handleDateChange}/>
    </div>
</div>

<div className="grid grid-cols-3 items-center gap-5">      
    <label htmlFor="resposta-padrao" 
    className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Resposta padrão: </label>
    <div className="col-span-2">
      <AutocompleteInput
      initialData={respostaData}
      hasError={respostaError}
      onChange={(value) => setResposta(value)} 
      value={resposta?.name || ''} 
      />
    </div>
  </div>

  <div className="grid grid-cols-3 items-center gap-5">      
    <label htmlFor="descricao-mensagem" 
    className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Descrição: </label>
    <div className="col-span-2">
    <textarea
      value={menssagem}
      onChange={(event) => setMenssagem(event.target.value)}
      rows={4}
      maxLength={2147483647}
      cols={100}
      className="w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 bg-gray-800 text-gray-200"
    />
    </div>
  </div>
  <div className="grid grid-cols-3 items-center gap-2">
      <div className="col-span-3">
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 mb-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  </div>
  </form>
  );
}
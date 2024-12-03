"use client";

import { useState } from 'react';
import AutocompleteInput from '../common/AutoCompleteInput';
import { Textarea, TextInput, Button, Datepicker } from "flowbite-react";
import RadioGroupPrioridade from '../common/RadioGroupPrioridade';
import RadioGroupEndereco from '../common/RadioGroupEndereco';
import RadioGroupHorario from '../common/RadioGroupHorario';
import RadioGroupOrigem from '../common/RadioGroupOrigem';

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
  const [horario, setHorario] = useState<string>(''); 
  const [origem, setOrigem] = useState<string>(''); 
  const [endereco, setEndereco] = useState<string>(''); 
  const [menssagem, setMenssagem] = useState<string>('');
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

    if (!cliente || !assunto || !prioridade || !menssagem || endereco) {
      alert('Preencha todos os campos antes de enviar.');
      return;
    }

    const payload = {
      "id_cliente": cliente.id,
      "id_assunto": assunto.id,
      "prioridade": prioridade,
      "menssagem": menssagem,
      "tipo": "C",
      "titulo": "Teste API",
      "id_ticket_setor": "5",
      "su_status": "N",
      "origem_endereco": endereco
    };
    console.log(payload);
    

    setIsLoading(true);
    submitData(payload);
  };

  return (
    <form onSubmit={handleSubmit} >

    <div className="grid gap-2 w-full max-w-lg mx-auto">

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="cliente" 
        className="text-md font-medium text-gray-300">Cliente: </label>
        <div className="col-span-2">
          <AutocompleteInput
          placeholder="Escolha o cliente"
          initialData={clientesData}
          hasError={clientesError}
          onChange={(value) => setCliente(value)} 
          value={cliente?.name || ''}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="filial" 
        className="text-md font-medium text-gray-300">Filial: </label>
        <div className="col-span-2">
          <AutocompleteInput
          placeholder="Escolha a filial"
          initialData={clientesData}
          hasError={clientesError}
          onChange={(value) => setCliente(value)} 
          value={cliente?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="assunto" 
        className="text-md font-medium text-gray-300">Assunto: </label>
        <div className="col-span-2">
          <AutocompleteInput
          placeholder="Escolha o assunto"
          initialData={assuntoData}
          hasError={assuntoError}
          onChange={(value) => setAssunto(value)} 
          value={assunto?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="descricao" 
        className="text-md font-medium text-gray-300">Descrição do assunto: </label>
        <div className="col-span-2">
          <AutocompleteInput
          placeholder=""
          initialData={assuntoData}
          hasError={assuntoError}
          onChange={(value) => setAssunto(value)} 
          value={assunto?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="origem-endereco" 
        className="text-md font-medium text-gray-300">Origem do endereço: </label>
        <div className="col-span-2">
          <RadioGroupEndereco
            value={endereco}
            onChange={setPrioridade} 
          />
        </div>  
      </div>

      <div className="grid grid-cols-3 items-center gap-2">
        <label
          htmlFor="endereco"
          className="text-md font-medium text-gray-300 col-span-1"
        >Endereço: </label>
      <div className="col-span-2 flex">
        <input
          id="endereco"
          type="text"
          className="flex-grow rounded-l-lg bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          color="blue"
          className="rounded-l-none px-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none whitespace-nowrap"
        >Marcar coordenadas</Button>
      </div>
    </div>

        <div className="grid grid-cols-3 items-center">      
          <label htmlFor="latitude" 
          className="text-md font-medium text-gray-300">Latitude: </label>
          <div className="col-span-2">
            <TextInput disabled/>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center">      
          <label htmlFor="longitude" 
          className="text-md font-medium text-gray-300">Longitude: </label>
          <div className="col-span-2">
            <TextInput disabled/>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center">      
          <label htmlFor="processo" 
          className="text-md font-medium text-gray-300">Processo: </label>
          <div className="col-span-2">
            <AutocompleteInput
            initialData={assuntoData}
            hasError={assuntoError}
            onChange={(value) => setAssunto(value)} 
            value={assunto?.name || ''} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 items-center">      
          <label htmlFor="departamento" 
          className="text-md font-medium text-gray-300">Departamento: </label>
          <div className="col-span-2">
            <AutocompleteInput
            initialData={assuntoData}
            hasError={assuntoError}
            onChange={(value) => setAssunto(value)} 
            value={assunto?.name || ''} 
            />
          </div>
        </div>

        <div className="grid grid-cols-3 items-center">      
          <label htmlFor="colaborador" 
          className="text-md font-medium text-gray-300">Colaborador responsável: </label>
          <div className="col-span-2">
            <AutocompleteInput
            initialData={assuntoData}
            hasError={assuntoError}
            onChange={(value) => setAssunto(value)} 
            value={assunto?.name || ''} 
            />
          </div>
        </div>
        
      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="prioridade" 
        className="text-md font-medium text-gray-300">Prioridade: </label>
        <div className="col-span-2">
          <RadioGroupPrioridade 
          value={prioridade}
          onChange={setEndereco} 
          />
        </div> 
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="data-reservada" 
        className="text-md font-medium text-gray-300 ">Data reservada: </label>
        <div className="col-span-2">
          <input type="date" name="date" id="date" className="border rounded-md shadow-sm
         focus:ring-blue-500 focus:border-blue-500 px-4 py-2 bg-gray-800 text-gray-200"/>
        </div>
    </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="horario" 
        className="text-md font-medium text-gray-300 ">Melhor horário reserva: </label>
        <div className="col-span-2">
          <RadioGroupHorario 
          value={horario}
          onChange={setHorario} 
          />
        </div> 
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="origem" 
        className="text-md font-medium text-gray-300">Origem: </label>
        <div className="col-span-2">
          <RadioGroupOrigem 
          value={origem}
          onChange={setOrigem} 
          />
        </div>
      </div>

    <div className="grid grid-cols-3 items-center">      
        <label htmlFor="resposta-padrao" 
        className="text-md font-medium text-gray-300">Resposta padrão: </label>
        <div className="col-span-2">
          <AutocompleteInput
          initialData={assuntoData}
          hasError={assuntoError}
          onChange={(value) => setAssunto(value)} 
          value={assunto?.name || ''} 
          />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="descricao-mensagem" 
        className="text-md font-medium text-gray-300">Descrição: </label>
        <div className="col-span-2">
          <textarea
            value={menssagem}
            onChange={(e) => setMenssagem(e.target.value)}
            rows={4}
            className="w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 bg-gray-800 text-gray-200"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="interacao" 
        className="text-md font-medium text-gray-300">Interação pendente: </label>
        <div className="col-span-2">
          <AutocompleteInput
          initialData={assuntoData}
          hasError={assuntoError}
          onChange={(value) => setAssunto(value)} 
          value={assunto?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="status" 
        className="text-md font-medium text-gray-300 ">Status: </label>
          <Button.Group className="cols-span-full mb-2">
            <Button className="bg-blue-600 text-white" disabled aria-selected>
              Novo
            </Button>
            <Button className="bg-gray-200 text-gray-800" disabled>
              Pendente
            </Button>
            <Button className="bg-gray-200 text-gray-800 whitespace-nowrap" disabled>
              Em progresso
            </Button>
            <Button className="bg-gray-200 text-gray-800" disabled>
              Solucionado
            </Button>
            <Button className="bg-gray-200 text-gray-800" disabled>
              Cancelado
            </Button>
          </Button.Group>
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="status-complementar" 
        className="text-md font-medium text-gray-300">Status complementar: </label>
        <div className="col-span-2">
          <AutocompleteInput
          initialData={assuntoData}
          hasError={assuntoError}
          onChange={(value) => setAssunto(value)} 
          value={assunto?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="canal-atendimento" 
        className="text-md font-medium text-gray-300">Canal de atendimento: </label>
        <div className="col-span-2">
          <AutocompleteInput
          initialData={assuntoData}
          hasError={assuntoError}
          onChange={(value) => setAssunto(value)} 
          value={assunto?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center">      
        <label htmlFor="ultima-atualizacao" 
        className="text-md font-medium text-gray-300">Última atualização: </label>
        <div className="col-span-2">
          <TextInput placeholder="CURRENT_TIMESTAMP"disabled/>
        </div>
      </div>
    </div>
    <div className=" flex flex-col items-center overflow-x-hidden">
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 px-4 py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
    </form>
  );
}
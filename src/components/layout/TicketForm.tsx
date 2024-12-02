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
      <div className="flex items-center space-x-2">      
        <legend>Cliente: </legend>
        <AutocompleteInput
        placeholder="Escolha o cliente"
        initialData={clientesData}
        hasError={clientesError}
        onChange={(value) => setCliente(value)} 
        value={cliente?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Filial: </legend>
        <AutocompleteInput
        placeholder="Escolha a filial"
        initialData={clientesData}
        hasError={clientesError}
        onChange={(value) => setCliente(value)} 
        value={cliente?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Assunto: </legend>
        <AutocompleteInput
        placeholder="Escolha o assunto"
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Descrição do assunto: </legend>
        <AutocompleteInput
        placeholder=""
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2 mb-2">      
        <legend>Origem do endereço: </legend>
        <RadioGroupEndereco
          value={endereco}
          onChange={setPrioridade} 
        />
      </div>
      <div className="flex items-center space-x-2 mb-2">      
        <legend>Endereço: </legend>
        <Button.Group>
        <TextInput/>
        <Button color="info">Marcar coordenadas</Button>
        </Button.Group>
      </div>

      <div className="flex items-center space-x-2 mb-2">      
        <legend>Latitude: </legend>
      <TextInput disabled/>
      </div>

      <div className="flex items-center space-x-2 mb-2">      
        <legend>Longitude: </legend>
      <TextInput disabled/>
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Processo: </legend>
        <AutocompleteInput
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>
      
      <div className="flex items-center space-x-2">      
        <legend>Departamento: </legend>
        <AutocompleteInput
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Colabordor responsável: </legend>
        <AutocompleteInput
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2 mb-2">      
        <legend>Prioridade: </legend>
        <RadioGroupPrioridade 
        value={prioridade}
        onChange={setEndereco} 
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Data reservada: </legend>
        <Datepicker language="pt-BR" labelTodayButton="Hoje" labelClearButton="Limpar" className='mb-2'/>
    </div>

    <div className="flex items-center space-x-2 mb-2">      
      <legend>Melhor horário reserva: </legend>
        <RadioGroupHorario 
        value={horario}
        onChange={setHorario} 
        />
      </div>

    <div className="flex items-center space-x-2 mb-2">      
      <legend>Origem: </legend>
        <RadioGroupOrigem 
        value={origem}
        onChange={setOrigem} 
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Resposta padrão: </legend>
        <AutocompleteInput
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2 mb-2">      
        <legend>Descrição: </legend>
        <Textarea
          value={menssagem}
          onChange={(e) => setMenssagem(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Interação pendente: </legend>
        <AutocompleteInput
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Status: </legend>
        <Button.Group className='mb-2'>
          <Button className="bg-blue-600 text-white" disabled aria-selected>
            Novo
          </Button>
          <Button className="bg-gray-200 text-gray-800" disabled>
            Pendente
          </Button>
          <Button className="bg-gray-200 text-gray-800" disabled>
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

      <div className="flex items-center space-x-2">      
        <legend>Status complementar: </legend>
        <AutocompleteInput
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2">      
        <legend>Canal de atendimento: </legend>
        <AutocompleteInput
        initialData={assuntoData}
        hasError={assuntoError}
        onChange={(value) => setAssunto(value)} 
        value={assunto?.name || ''} 
        />
      </div>

      <div className="flex items-center space-x-2 mb-2">      
        <legend>Última atualização: </legend>
      <TextInput placeholder="CURRENT_TIMESTAMP"disabled/>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 px-4 py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
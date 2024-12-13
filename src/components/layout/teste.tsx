"use client";

import React, { SetStateAction, useEffect, useState } from 'react';
import AutocompleteInput from '../common/AutoCompleteInput';
import { TextInput, Button, Datepicker } from "flowbite-react";
import RadioGroupPrioridade from '../common/RadioGroupPrioridade';
import RadioGroupEndereco from '../common/RadioGroupEndereco';
import RadioGroupHorario from '../common/RadioGroupHorario';
import RadioGroupOrigem from '../common/RadioGroupOrigem';
import RadioGroupTipo from '../common/RadioGroupTipo';

interface Option {
  id: number;
  name: string;
  message?: string,
  street?: string,
  streetNumber?: string,
  neighborhood?: string,
  cep?: string,
  lat?: string,
  long?: string,
  city?: string,
  state?: string,
  date?: Date,
  contract?: number,
}

interface OptionCliente {
  id: number;
  name: string;
  references?: number;
}

interface TesteFormProps {
  clientesData: Option[];
  contratoData: OptionCliente[];
  assuntoData: Option[];
  filialData: Option[];
  departamentoData: Option[];
  funcionariosData: Option[];
  respostaData: Option[];
  atendimentoData: Option[];
  statusData: Option[];
  processoData: Option[];
  loginData: OptionCliente[];
  clientesError: boolean;
  contratoError: boolean;
  assuntoError: boolean;
  filialError: boolean;
  departamentoError: boolean;
  funcionariosError: boolean;
  respostaError: boolean;
  atendimentoError: boolean;
  statusError: boolean;
  processoError: boolean;
  loginError: boolean;
}

export default function TesteForm({
  clientesData,
  contratoData,
  assuntoData,
  filialData,
  departamentoData,
  funcionariosData,
  respostaData,
  atendimentoData,
  statusData,
  processoData,
  loginData,
  clientesError,
  assuntoError,
  filialError,
  departamentoError,
  funcionariosError,
  respostaError,
  atendimentoError,
  statusError,
  processoError,
  loginError,
  contratoError,
}: TesteFormProps) {
  const [cliente, setCliente] = useState<Option | null>(null);
  const [contrato, setContrato] = useState<Option | null>(null);
  const [login, setLogin] = useState<Option | null>(null);
  const [assunto, setAssunto] = useState<Option | null>(null);
  const [filial, setFilial] = useState<Option | null>(null);
  const [departamento, setDepartamento] = useState<Option | null>(null);
  const [funcionarios, setFuncionarios] = useState<Option | null>(null);
  const [resposta, setResposta] = useState<Option | null>(null);
  const [atendimento, setAtendimento] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [processo, setProcesso] = useState<Option | null>(null);

  const [prioridade, setPrioridade] = useState<string>(''); 
  const [horario, setHorario] = useState<string>(''); 
  const [origem, setOrigem] = useState<string>(''); 
  const [tipo, setTipo] = useState<string>(''); 
  const [enderecoOrigem, setEnderecoOrigem] = useState<string>(''); 
  const [menssagem, setMenssagem] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [date, setSelectedDate] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [filteredContratos, setFilteredContratos] = useState<OptionCliente[]>(contratoData);
  const [filteredLogins, setFilteredLogins] = useState<OptionCliente[]>(loginData);

  const [selectedValue, setSelectedValue] = useState('N');
  const [coordenadas, setCoordenadas] = useState({ lat: "", long: "" });
  
  // seleciona por padrão o valor "Nenhuma" do campo "Interação pendente"
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedValue(event.target.value);
  }

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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !cliente || 
      !assunto || 
      !filial || 
      !resposta ||
      !prioridade ||
      !enderecoOrigem ||
      !tipo ||
      !horario ||
      !origem ||
      !atendimento ||
      !funcionarios ||
      !departamento ||
      !processo ||
      !date ||
      !contrato ||
      !login ||
      !formattedAddress ||
      !coordenadas.lat ||
      !coordenadas.long
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
      "id_login": login?.id,
      "id_contrato": contrato?.id,
      "id_cliente": cliente.id,
      "id_filial": filial.id,
      "id_assunto": assunto.id,
      "titulo": descricao,
      "origem_endereco": enderecoOrigem,
      "prioridade": prioridade,
      "menssagem": menssagem,
      "tipo": tipo,
      "interacao_pendente": selectedValue,
      "melhor_horario_reserva": horario,
      "id_ticket_origem": origem,
      "id_resposta": resposta.id,
      "id_canal_atendimento": atendimento?.id,
      "id_evento_status_processo": status?.id,
      "id_responsavel_tecnico": funcionarios.id,
      "id_ticket_setor": departamento?.id,
      "id_wfl_processo": processo.id,
      "data_reservada": dataBR,
      "endereco": formattedAddress,
      "latitude": coordenadas.lat,
      "longitude": coordenadas.long,
      "su_status": "N",
    }  

    setIsLoading(true);
    submitData(payload);
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  }

  const handleClienteChange = (cliente: Option) => {
    setCliente(cliente);
    if (cliente) {
      const filteredContrato = contratoData.filter(
        (contrato) => contrato.references === cliente.id
      );
      const filteredLogin = loginData.filter(
        (login) => login.references === cliente.id
      );
      setFilteredContratos(filteredContrato);
      setFilteredLogins(filteredLogin);
      setContrato(null); // Reseta o contrato selecionado
      setLogin(null); 
    } else {
      setFilteredContratos(contratoData); // Reseta para mostrar todos os contratos
      setFilteredLogins(loginData); 
    }
  }

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [street, streetNumber, neighborhood, city, state, cep] = e.target.value.split(', ');
    setCliente({
      ...cliente,
      street: street || '', // Atualiza o valor de street
      streetNumber: streetNumber || '', // Atualiza o valor de streetNumber
      neighborhood: neighborhood || '', // Atualiza o valor de neighborhood
      city: city || '', // Atualiza o valor de city
      state: state || '', // Atualiza o valor de state
      cep: cep || '', // Atualiza o valor de cep
    } as Option);
  };  

  const formattedAddress = cliente?.street || cliente?.streetNumber || cliente?.neighborhood || cliente?.city || cliente?.state || cliente?.cep
  ? `${cliente?.street || ''}, ${cliente?.streetNumber || ''} - ${cliente?.neighborhood || ''}, ${cliente?.city || ''} - ${cliente?.state || ''} ${cliente?.cep || ''}`
  : '';

  useEffect(() => {
    if(resposta?.message) {
      setMenssagem(resposta.message);
    }
  }, [resposta]);

  useEffect(() => {
    if(assunto?.name) {
      setDescricao(assunto.name);
    }
  }, [assunto]);
  console.log(selectedValue);
  return (
    <form onSubmit={handleSubmit}>

    <div className="grid gap-2 w-full max-w-lg mx-auto">

      <div className="grid grid-cols-3 items-center gap-5">      
          <label htmlFor="id_ticket" 
          className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">ID: </label>
          <div className="col-span-2">
            <TextInput className="rounded-md px-0 w-24 bg-gray-800 text-gray-200" maxLength={11} disabled/>
          </div>
      </div> 

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="origem" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Tipo: </label>
        <div className="col-span-2">
          <RadioGroupTipo 
          value={tipo}
          onChange={setTipo} 
          />
        </div>
      </div> 

      <div className="grid grid-cols-3 items-center gap-5">      
          <label htmlFor="protocolo" 
          className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Protocolo: </label>
          <div className="col-span-2">
            <TextInput 
            className="rounded-md px-0 w-40 bg-gray-800 text-gray-200" maxLength={15} disabled/>
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
        <label htmlFor="login" 
        className="text-md font-medium text-gray-300 
        whitespace-nowrap justify-self-end text-right">Login: 
        </label>
        <div className="col-span-2">
          <AutocompleteInput
          placeholder=""
          initialData={filteredLogins}
          hasError={loginError}
          onChange={(value) => setLogin(value)} 
          value={login?.name || ''}
          />
        </div>
      </div> 
      
      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="contrato" 
        className="text-md font-medium text-gray-300 
        whitespace-nowrap justify-self-end text-right">Contrato: 
        </label>
        <div className="col-span-2">
          <AutocompleteInput
          placeholder=""
          initialData={filteredContratos}
          hasError={contratoError}
          onChange={(value) => setContrato(value)} 
          value={contrato?.name || ''}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="filial" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Filial: </label>
        <div className="col-span-2">
          <AutocompleteInput
          placeholder="Escolha a filial"
          initialData={filialData}
          hasError={filialError}
          onChange={(value) => setFilial(value)} 
          value={filial?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="assunto" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Assunto: </label>
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

       <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="descricao" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Descrição do assunto: </label>
        <div className="col-span-2">
          <input
          type="text"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          className="w-full p-2 border-1 mb-2 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-gray-200" 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="origem-endereco" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Origem do endereço: </label>
        <div className="col-span-2">
          <RadioGroupEndereco
            value={enderecoOrigem}
            onChange={setEnderecoOrigem} 
          />
        </div>  
      </div>

       <div className="grid grid-cols-3 items-center gap-5">
        <label
          htmlFor="endereco"
          className="text-md font-medium text-gray-300 
          whitespace-nowrap justify-self-end text-right"
        >Endereço: </label>
      <div className="col-span-2 flex">
        <input
          value={formattedAddress}
          onChange={handleAddress}
          id="endereco"
          type="text"
          className="flex-grow rounded-l-lg bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          <button
            type="button"
            onClick={() => {
              // Atualiza o estado de coordenadas apenas ao clicar
              if (cliente?.lat && cliente?.long) {
                setCoordenadas({ lat: cliente.lat, long: cliente.long });
              } else {
                alert("As coordenadas não estão disponíveis para este cliente.");
              }
            }}
            className="rounded-l-none rounded-r-lg px-5 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none whitespace-nowrap"
          >
            Marcar coordenadas
          </button>
      </div>
    </div>
      
        <div className="mt-1.5 mb-1.5 grid grid-cols-3 items-center gap-5">      
          <label htmlFor="latitude" 
          className="text-md font-medium text-gray-300 
          whitespace-nowrap justify-self-end text-right">Latitude: 
          </label>
          <div className="col-span-2">
            <TextInput value={coordenadas.lat} className="rounded-md bg-gray-800 text-gray-200" maxLength={50} disabled/>
          </div>
        </div>

        <div className="mb-1.5 grid grid-cols-3 items-center gap-5">      
          <label htmlFor="longitude" 
          className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Longitude: </label>
          <div className="col-span-2">
            <TextInput value={coordenadas.long} className="rounded-md bg-gray-800 text-gray-200" maxLength={50} disabled/>
          </div>
        </div> 

        <div className="grid grid-cols-3 items-center gap-5">      
          <label htmlFor="processo" 
          className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Processo: </label>
          <div className="col-span-2">
            <AutocompleteInput
            initialData={processoData}
            hasError={processoError}
            onChange={(value) => setProcesso(value)} 
            value={processo?.name || ''} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 items-center gap-5">      
          <label htmlFor="departamento" 
          className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Departamento: </label>
          <div className="col-span-2">
          <AutocompleteInput
            initialData={departamentoData}
            hasError={departamentoError}
            onChange={(value) => setDepartamento(value)} 
            value={departamento?.name || ''} 
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
            value={funcionarios?.name || ''} 
            />
          </div>
        </div>
        
      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="prioridade" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Prioridade: </label>
        <div className="col-span-2">
          <RadioGroupPrioridade 
          value={prioridade}
          onChange={setPrioridade} 
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
        <label htmlFor="horario" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Melhor horário reserva: </label>
        <div className="col-span-2">
          <RadioGroupHorario 
          value={horario}
          onChange={setHorario} 
          />
        </div> 
      </div>

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="origem" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Origem: </label>
        <div className="col-span-2">
          <RadioGroupOrigem 
          value={origem}
          onChange={setOrigem} 
          />
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
      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="interacao" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Interação pendente: </label>
        <div className="col-span-2">
          <select value={selectedValue} onChange={handleChange} name="interacao_pendente" id="interacao_pendente" autoComplete="off" className="mb-1.5 mt-1.5 border rounded-md shadow-sm bg-gray-800 text-gray-200">
            <option value="">---</option>
            <option value="A">Ambos</option>
            <option value="E">Externa</option>
            <option value="I">Interna</option>
            <option value="N">Nenhuma</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="status" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Status: </label>
          <Button.Group className="cols-span-full mb-2">
            <Button className="bg-blue-600 text-white" disabled aria-selected>
              Novo
            </Button>
            <Button className="bg-gray-800 text-gray-200" disabled>
              Pendente
            </Button>
            <Button className="bg-gray-800 text-gray-200 whitespace-nowrap" disabled>
              Em progresso
            </Button>
            <Button className="bg-gray-800 text-gray-200" disabled>
              Solucionado
            </Button>
            <Button className="bg-gray-800 text-gray-200" disabled>
              Cancelado
            </Button>
          </Button.Group>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="status-complementar" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Status complementar: </label>
        <div className="col-span-2">
          <AutocompleteInput
          initialData={statusData}
          hasError={statusError}
          onChange={(value) => setStatus(value)} 
          value={status?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="canal-atendimento" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Canal de atendimento: </label>
        <div className="col-span-2">
          <AutocompleteInput
          initialData={atendimentoData}
          hasError={atendimentoError}
          onChange={(value) => setAtendimento(value)} 
          value={atendimento?.name || ''} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">      
        <label htmlFor="ultima-atualizacao" 
        className="text-md font-medium text-gray-300 whitespace-nowrap justify-self-end text-right">Última atualização: </label>
        <div className="col-span-2">
          <Datepicker placeholder="CURRENT_TIMESTAMP" language="pt-BR" labelTodayButton="Hoje" labelClearButton="Limpar"  className="rounded-md bg-gray-800 text-gray-200" disabled/>
        </div>
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
    </form>
  );
}
import { prisma } from "../Libs/prisma";
import  TicketForm  from '../../components/layout/TicketForm'

async function getClientes() {
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        ativo: 'S',
      },
      select: {
        id: true,
        razao: true,
        endereco: true,
        numero: true,
        bairro: true,
        cep: true,
        latitude: true,
        longitude: true,
        cidadeID: {
          select: {
            nome: true,
            ufID: {
              select: {
                sigla: true,
              }
            }
          },
        },
      },
    });
    return {
      data: clientes.map(cliente => ({
        id: cliente.id,
        name: cliente.razao,
        street: cliente.endereco ?? undefined,
        streetNumber: cliente.numero ?? undefined,
        neighborhood: cliente.bairro ?? undefined,
        cep: cliente.cep ?? undefined,
        lat: cliente.latitude ?? undefined,
        long: cliente.longitude ?? undefined,
        city: cliente.cidadeID?.nome ?? undefined,
        state: cliente.cidadeID?.ufID?.sigla ?? undefined,
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return {
      data: [],
      error: true
    };
  }
}

async function getFuncionarios() {
  try {
    const funcionarios = await prisma.funcionarios.findMany({
      select: {
        id: true,
        funcionario: true,
      },
    });
    return {
      data: funcionarios.map(funcionarios => ({
        id: funcionarios.id,
        name: funcionarios.funcionario
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    return {
      data: [],
      error: true
    };
  }
}

async function getResposta() {
  try {
    const resposta = await prisma.su_oss_respostas.findMany({
      select: {
        id: true,
        titulo: true,
        resposta: true,
      },
    });
    return {
      data: resposta.map(resposta => ({
        id: resposta.id,
        name: resposta.titulo,
        message: resposta.resposta,
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar respostas:', error);
    return {
      data: [],
      error: true
    };
  }
}

async function getTicketId() {
  try {
    const result = await prisma.su_oss_chamado.findMany({
      where: {
        status: 'A',
      },
      select: {
        id: true,
        ticketID: {
          select: {
            id: true,
            titulo: true,
        },
      },
        mensagem: true,
      },
    });
    return {
      data: result.map(result => ({
        id: result.id,
        name: result.ticketID?.titulo || '',
        references: result.ticketID?.id,
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar o ticket:', error);
    return {
      data: [],
      error: true
    };
  }
}

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

export default async function TicketPage() {

  const [
    clientesResponse, 
    funcionariosResponse, 
    respostaResponse,
    ticketResponse, 
  ] = await Promise.all([
    getClientes(),
    getFuncionarios(),
    getResposta(),
    getTicketId(),
  ]);

  const { data: clientesData, error: clientesError } = clientesResponse;
  const { data: funcionariosData, error: funcionariosError } = funcionariosResponse;
  const { data: respostaData, error: respostaError } = respostaResponse;
  const { data: ticketsData, error: ticketsError } = ticketResponse;
  const formData: TicketFormProps = {
    clientesData,
    funcionariosData,
    respostaData,
    ticketsData,
    clientesError,
    respostaError,
    funcionariosError,
    ticketsError,
  };

  return (
    
    <div className="w-screen h-screen flex flex-col  items-center overflow-x-hidden">

      <h1 className="text-2xl font-bold mb-4">Agendamento</h1>
      <TicketForm {...formData}/>

    </div>
 
  );
}

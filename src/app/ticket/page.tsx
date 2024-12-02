import { prisma } from "../Libs/prisma";
import  TicketForm  from '../../components/layout/TicketForm'

async function getClientes() {
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        ativo: "S",
      },
      select: {
        id: true,
        razao: true,
      },
    });
    return {
      data: clientes.map(cliente => ({
        id: cliente.id,
        name: cliente.razao
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

async function getAssunto() {
  try {
    const assunto = await prisma.su_oss_assunto.findMany({
      select: {
        id: true,
        assunto: true,
      },
    });
    return {
      data: assunto.map(assunto => ({
        id: assunto.id,
        name: assunto.assunto
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar assuntos:', error);
    return {
      data: [],
      error: true
    };
  }
}

interface Option {
  id: number,
  name: string,
}

interface TicketFormProps {
  clientesData: Option[];
  assuntoData: Option[];
  clientesError: boolean;
  assuntoError: boolean;
}

export default async function TicketPage() {

  const [clientesResponse, assuntosResponse] = await Promise.all([
    getClientes(),
    getAssunto(),
  ]);

  const { data: clientesData, error: clientesError } = await getClientes();
  const { data: assuntoData, error: assuntoError } = await getAssunto();

  const formData: TicketFormProps = {
    clientesData,
    assuntoData,
    clientesError,
    assuntoError,
  };

  return (
    
    <div className="w-screen h-screen flex flex-col  items-center overflow-x-hidden">

      <h1 className="text-2xl font-bold mb-4">Novo Ticket</h1>
      <TicketForm {...formData}/>

    </div>
 
  );
}

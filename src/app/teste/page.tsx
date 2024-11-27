import { prisma } from "../Libs/prisma";
import AutocompleteInput from "../../components/common/AutoCompleteInput";
import ParentComponent from "../../components/common/parentComponent"

async function getClientes() {
  try {
    const clientes = await prisma.cliente.findMany({
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

export default async function TicketPage() {
  const { data: clientesData, error: clienteError } = await getClientes();
  const { data: assuntoData, error: assuntoError } = await getAssunto();

  return (
    
    <div className="w-screen h-screen flex flex-col justify-center items-center">

      <h1 className="text-2xl font-bold mb-4">Novo Ticket</h1>
      <AutocompleteInput initialData={clientesData} hasError={clienteError} />
      <AutocompleteInput initialData={assuntoData} hasError={assuntoError} />
      <ParentComponent/>

    </div>
 
  );
}

import { prisma } from "../Libs/prisma";
import  TesteForm  from '../../components/layout/teste'

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

async function getFilial() {
  try {
    const filial = await prisma.filial.findMany({
      select: {
        id: true,
        fantasia: true,
      },
    });
    return {
      data: filial.map(filial => ({
        id: filial.id,
        name: filial.fantasia
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar filiais:', error);
    return {
      data: [],
      error: true
    };
  }
}

async function getDepartamento() {
  try {
    const departamento = await prisma.departamento.findMany({
      select: {
        id: true,
        descricao: true,
      },
    });
    return {
      data: departamento.map(departamento => ({
        id: departamento.id,
        name: departamento.descricao
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar departamentos:', error);
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
interface Option {
  id: number,
  name: string,
}

interface TesteFormProps {
  clientesData: Option[];
  assuntoData: Option[];
  filialData: Option[];
  departamentoData: Option[];
  funcionariosData: Option[];
  clientesError: boolean;
  assuntoError: boolean;
  filialError: boolean;
  departamentoError: boolean;
  funcionariosError: boolean;
}

export default async function TestePage() {

  const [clientesResponse, assuntosResponse, filialResponse, departamentoResponse, funcionariosResponse] = await Promise.all([
    getClientes(),
    getAssunto(),
    getFilial(),
    getDepartamento(),
    getFuncionarios(),
  ]);

  const { data: clientesData, error: clientesError } = clientesResponse;
  const { data: assuntoData, error: assuntoError } = assuntosResponse;
  const { data: filialData, error: filialError } = filialResponse;
  const { data: departamentoData, error: departamentoError } = departamentoResponse;
  const { data: funcionariosData, error: funcionariosError } = funcionariosResponse;

  const formData: TesteFormProps = {
    clientesData,
    assuntoData,
    filialData,
    departamentoData,
    funcionariosData,
    clientesError,
    assuntoError,
    filialError,
    departamentoError,
    funcionariosError,
  };

  return (
    
    <div className="w-screen h-screen flex flex-col  items-center overflow-x-hidden">

      <h1 className="text-2xl font-bold mb-4">Novo Ticket</h1>
      <TesteForm {...formData}/>

    </div>
 
  );
}

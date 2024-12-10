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
        street: cliente.endereco,
        streetNumber: cliente.numero,
        neighborhood: cliente.bairro,
        cep: cliente.cep,
        lat: cliente.latitude,
        long: cliente.longitude,
        city: cliente.cidadeID?.nome,
        state: cliente.cidadeID?.ufID?.sigla
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
    const departamento = await prisma.su_ticket_setor.findMany({
      select: {
        id: true,
        setor: true,
      },
    });
    return {
      data: departamento.map(su_ticket_setor => ({
        id: su_ticket_setor.id,
        name: su_ticket_setor.setor
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

async function getStatus() {
  try {
    const status = await prisma.su_evento_status.findMany({
      select: {
        id: true,
        descricao: true,
      },
    });
    return {
      data: status.map(status => ({
        id: status.id,
        name: status.descricao,
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar status:', error);
    return {
      data: [],
      error: true
    };
  }
}

async function getAtendimento() {
  try {
    const atendimento = await prisma.su_canal_atendimento.findMany({
      select: {
        id: true,
        canal_atendimento: true,
      },
    });
    return {
      data: atendimento.map(atendimento => ({
        id: atendimento.id,
        name: atendimento.canal_atendimento,
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar o canal de atendimento:', error);
    return {
      data: [],
      error: true
    };
  }
}

async function getProcesso() {
  try {
    const processo = await prisma.wfl_processo.findMany({
      select: {
        id: true,
        descricao: true,
      },
    });
    return {
      data: processo.map(processo => ({
        id: processo.id,
        name: processo.descricao,
      })),
      error: false
    };
  } catch (error) {
    console.error('Erro ao buscar o tipo de processo:', error);
    return {
      data: [],
      error: true
    };
  }
}

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
}

interface TesteFormProps {
  clientesData: Option[];
  assuntoData: Option[];
  filialData: Option[];
  departamentoData: Option[];
  funcionariosData: Option[];
  respostaData: Option[];
  atendimentoData: Option[];
  statusData: Option[];
  processoData: Option[];
  clientesError: boolean;
  assuntoError: boolean;
  filialError: boolean;
  departamentoError: boolean;
  funcionariosError: boolean;
  respostaError: boolean;
  atendimentoError: boolean;
  statusError: boolean;
  processoError: boolean;
}

export default async function TestePage() {

  const [
    clientesResponse, 
    assuntosResponse, 
    filialResponse, 
    departamentoResponse, 
    funcionariosResponse, 
    respostaResponse, 
    atendimentoResponse, 
    statusResponse,
    processoResponse,
  ] = await Promise.all([
    getClientes(),
    getAssunto(),
    getFilial(),
    getDepartamento(),
    getFuncionarios(),
    getResposta(),
    getAtendimento(),
    getStatus(),
    getProcesso(),
  ]);

  const { data: clientesData, error: clientesError } = clientesResponse;
  const { data: assuntoData, error: assuntoError } = assuntosResponse;
  const { data: filialData, error: filialError } = filialResponse;
  const { data: departamentoData, error: departamentoError } = departamentoResponse;
  const { data: funcionariosData, error: funcionariosError } = funcionariosResponse;
  const { data: respostaData, error: respostaError } = respostaResponse;
  const { data: atendimentoData, error: atendimentoError } = atendimentoResponse;
  const { data: statusData, error: statusError } = statusResponse;
  const { data: processoData, error: processoError } = processoResponse;

  const formData: TesteFormProps = {
    clientesData,
    assuntoData,
    filialData,
    departamentoData,
    funcionariosData,
    respostaData,
    atendimentoData,
    statusData,
    processoData,
    clientesError,
    assuntoError,
    filialError,
    departamentoError,
    funcionariosError,
    respostaError,
    atendimentoError,
    statusError,
    processoError,
  };

  return (
    
    <div className="w-screen h-screen flex flex-col  items-center overflow-x-hidden">

      <h1 className="text-2xl font-bold mb-4">Novo Ticket</h1>
      <TesteForm {...formData}/>

    </div>
 
  );
}

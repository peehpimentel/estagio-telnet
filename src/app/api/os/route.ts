import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv';
import { prisma } from '@/app/Libs/prisma';

export async function POST(req: Request) {
  dotenv.config();

  try {
    const body = await req.json();

    // Parâmetros que vêm do body
    const { id, menssagem, data_agenda } = body;

    const existingRecord = await prisma.su_oss_chamado.findFirst({
      where: {
        id_ticket: id,
      },
      select: {
        id: true,
      },
    });

    const tecnicoComMenosOrdens = await prisma.su_oss_chamado.groupBy({
      by: ['id_tecnico'],
      _count: {
        id: true, // Conta as ordens de serviço
      },
      where: {
        funcionariosID: {
          id_setor_padrao: {
            in: [25, 26],
          },
          ativo: 'S'
        },
      },
      orderBy: {
        _count: {
          id: 'asc', // Ordena pelo menor número de ordens
        },
      },
      take: 1, // Seleciona apenas o técnico com menos ordens
    });
    
    // Verifica se há técnicos disponíveis
    if (tecnicoComMenosOrdens.length === 0) {
      throw new Error('Nenhum técnico disponível para atribuir a ordem.');
    }
    
    // Obtém o ID do técnico com menos ordens
    const tecnicoId = tecnicoComMenosOrdens[0].id_tecnico;
    console.log('Técnico com menos ordens:', tecnicoId);

    if (!existingRecord) {
      console.error('No existing record found.');
      return NextResponse.json(
        { error: 'No existing record found for the given ID.' },
        { status: 404 }
      );
    }

    console.log('prisma:', existingRecord.id);

    const param = {
      id_chamado: existingRecord.id, // Renomeado conforme necessário
      mensagem: menssagem,
      data_agendamento: data_agenda,
      status: 'AG',
      id_tecnico: tecnicoId,
    };

    const url = `${process.env.SECRET_API}/su_oss_chamado_reagendar`!;
    const username = process.env.SECRET_USERNAME;
    const password = process.env.SECRET_KEY;
    const encodedToken = Buffer.from(`${username}:${password}`).toString('base64');

    const raw = JSON.stringify({
      ...param,
      redirect: 'follow',
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedToken}`,
      },
      body: raw,
    });

    const data = await response.json();
    console.log('Rota 2 - API 2 Response:', data);

    if (data.type == 'error') {
      return NextResponse.json({
        message: data.message,
        response: data.type,
        param: param,        
      })
    } else {
      return NextResponse.json({
        response: data,
        param: param,
      });
    }
  } catch (error: any) {
    console.error('Error in Rota 2:', error);
    return NextResponse.json(
      { error: 'Something went wrong in Rota 2', details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
// processo 27 - SUPORTE TÉCNICO
// assunto 117 - SEM CONEXÃO

/*
tabela de funcionarios, id_setor_padrao = 1, 25 e 26 ativo = s e escolher qual tem menos os agendada e -----| FEITO
recuperar o que tem menos e retornar o id do técnico para inserir ------------------------------------------| FEITO
su_oss_chamado e a funcionarios ----------------------------------------------------------------------------| FEITO

olhar prioridade de cada os e enviar para os que tem a prioridade mais baixa -------------------------------| A FAZER

olhar o status da conexão do login do cliente --------------------------------------------------------------| PRÓXIMO
olhar o melhor horário para atendimento --------------------------------------------------------------------| PRÓXIMO
analisar tudo isso e definir qual técnico tem os menores valores e agendar a os de acordo com esse técnico -| PRÓXIMO

*/
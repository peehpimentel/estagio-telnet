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
      id_tecnico: '1',
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

    return NextResponse.json({
      success: true,
      response: data,
      param: param, // Inclui o objeto param na resposta final
    });
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
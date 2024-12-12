import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv'

export async function POST(req: Request) {

  dotenv.config();



  try {
    
  const body = await req.json();
  const param = {
    "id_login": body.id_login,
    "id_contrato": body.id_contrato,
    "id_cliente": body.id_cliente,
    "id_assunto": body.id_assunto,
    "titulo": body.titulo,
    "prioridade": body.prioridade,
    "menssagem": body.menssagem,
    "su_status": body.su_status,
    "id_filial": body.id_filial,
    "origem_endereco": body.origem_endereco,
    "tipo": body.tipo,
    "melhor_horario_reserva": body.melhor_horario_reserva,
    "id_ticket_origem": body.id_ticket_origem,
    "id_resposta": body.id_resposta,
    "id_canal_atendimento": body.id_canal_atendimento,
    "id_evento_status_processo": body.id_evento_status_processo,
    "id_ticket_setor": body.id_ticket_setor,
    "id_responsavel_tecnico": body.id_responsavel_tecnico,
    "id_wfl_processo": body.id_wfl_processo,
    "data_reservada": body.data_reservada,
  }
    const url = process.env.SECRET_API!;
    const username = process.env.SECRET_USERNAME;
    const password = process.env.SECRET_KEY;
    const encodedToken = Buffer.from(`${username}:${password}`).toString('base64');

    const raw = JSON.stringify({
      ...param,
      redirect: "follow",
    });

    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedToken}`,
      },
      body: raw,
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong', details: error.message },
      { status: 500 }
    );
  }
}










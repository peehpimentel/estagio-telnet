import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv'
dotenv.config();

export async function POST(req: Request) {

  try {
    
  const body = await req.json();
  const param = {
    // "id_resposta": body.id_resposta,
    "data_agendamento": body.data_reservada,
    "mensagem": body.menssagem,
    "status": "AG",
    "id_tecnico": "1",
    "id_chamado": " ",
  }
    const url = `${process.env.SECRET_API}/su_oss_chamado_reagendar`!;
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
    console.log(data.id);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong', details: error.message },
      { status: 500 }
    );
  }
}
// receber o retorno da abert do ticket
// pegar o id do ticket e consultar as os abertas
// chamar api com o id da os
// acrescentar nos paramentos da api o que é necessário (data de inicio do agendamento, msg, técnico de id 1, resposta padrão)
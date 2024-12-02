import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv'

export async function POST(req: Request) {

  dotenv.config();

  try {

  const body = await req.json();
  const param = {
    "tipo": "C",
    "id_cliente": body.id_cliente,
    "id_assunto": body.assuntoID,
    "titulo": "Teste API",
    "id_ticket_setor": "5",
    "prioridade": body.prioridade,
    "menssagem": body.menssagem,
    "su_status": "N",
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










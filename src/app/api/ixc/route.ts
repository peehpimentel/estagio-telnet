import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const username = '23';
  const password = '9ca5c8569d7138f4c445ede486ec81ec6f411cfc9e8d93c9e53a707f2a43b0c9';
  const credentials = Buffer.from(${username}:${password}).toString('base64');

  // Corpo da requisição (vindo do cliente, se aplicável)
  const body = await request.json();

  try {
    const response = await fetch('https://179.191.12.8/webservice/v1/su_ticket', {
      method: 'POST',
      headers: {
        'Authorization': Basic ${credentials},
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), 
    });

    if (!response.ok) {
      throw new Error(Erro: ${response.status});
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}








































/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNÇÃO PARA TESTAR CONEXÃO AO BANCO

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function testConnection() {
//   try {
//     const users = await prisma.cliente.findMany(); // substitua "user" pelo nome de uma tabela do seu schema
//     console.log("Prisma Client funcionando! Dados:", users);
//   } catch (error) {
//     console.error("Erro ao conectar usando Prisma Client:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// testConnection();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
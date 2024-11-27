import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  require('dotenv').config();
  const username = '23';
  const password = process.env.SECRET_KEY;
  const credentials = Buffer.from(${username}:${password}).toString('base64');

  // Corpo da requisição (vindo do cliente, se aplicável)
  const body = await request.json();

  try {
    const response = await fetch(process.env.SECRET_API, {
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
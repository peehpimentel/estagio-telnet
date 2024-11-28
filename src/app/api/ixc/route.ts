import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv'
import { redirect } from 'next/dist/server/api-utils';

// process.env.* é um objeto que contém todas as variáveis de ambiente armazenadas em qualquer pasta .env. Nesse uso, estamos mascarando os dados sensíveis senha, usuário e API.
export async function POST(request: Request) {
  dotenv.config();
  const username = process.env.SECRET_USERNAME;
  const password = process.env.SECRET_KEY;
  //const credentials = Buffer.from(`${username}:${password}`).toString('base64');

  try {
  // Corpo da requisição (vindo do cliente, se aplicável)
  const body = await request.json();

  // Monta os dados do raw
  const raw = JSON.stringify({
    ...body,
    redirect: "follow",
  });

  const credentials = btoa(`${username}:${password}`);

  // O ! está dizendo ao TypeScript que a variável de ambiente SECRET_API não é indefinidade e nem vazia, e com isso não gera erro.
  const response = await fetch(process.env.SECRET_API!, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 
      AUTHORIZATION: `Basic ${credentials}`, // Inclua o token necessário`
     },
    body: raw,
  });

  const result = await response.json();
  
  // Retorna a resposta da API externa ao cliente
  return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao enviar dados para a API:', error);
    return NextResponse.json({ error: 'Falha ao processar a requisição' }, { status: 500 });
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
import { error } from "console";
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const apiResp = await fetch("https://179.191.12.8/webservice/v1/su_ticket");
        if (!apiResp.ok) {
            throw new Error('Erro ao buscar dados da API externa');
        }
        const data = await apiResp.json(); //espera a api acessar o json
        if (data.error) {
            return NextResponse.json(
              { error: "API retornou um erro" },
              { status: 404 }
            );
          }
          return NextResponse.json(data, { status: 200 }); 
    } catch (error: any) {
        console.error("Erro na API externa:", error.message || error);
        return NextResponse.json(
            { error: "Erro interno ao processar a solicitação" },
            { status: 500 }
          );
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
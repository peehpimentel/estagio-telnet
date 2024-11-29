import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv'
import axios from 'axios';


// process.env.* é um objeto que contém todas as variáveis de ambiente armazenadas em qualquer pasta .env. Nesse uso, estamos mascarando os dados sensíveis senha, usuário e API.
export async function POST(request: Request) {

  dotenv.config();
  const username = process.env.SECRET_USERNAME;
  const password = process.env.SECRET_KEY;
  const url = process.env.SECRET_API!;
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');

  try {
  // Corpo da requisição (vindo do cliente, se aplicável)
  const body = await request.json();
  const axios = require('axios');
  const FormData = require('form-data');
  let data = new FormData();
  data.append('tipo', 'C');
  data.append('id_cliente', body.id_cliente);
  data.append('id_assunto', body.id_assunto);
  data.append('titulo', 'Teste API');
  data.append('prioridade', body.prioridade);
  data.append('menssagem', body.mensagem);
  data.append('su_status', 'N');
  data.append('id_ticket_setor', '5');


  // Monta os dados do raw
  // const raw = JSON.stringify({
  //   ...param,
  //   redirect: "follow",
  // });

  // const credentials = btoa(${username}:${password});

  // O ! está dizendo ao TypeScript que a variável de ambiente SECRET_API não é indefinidade e nem vazia, e com isso não gera erro.
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}`,
    headers: { 
      'ixcsoft': '', 
      'Authorization': `${credentials}`, 
      'Cookie': 'IXC_Session=100te0jgst6hsla5v53ec6t2e6', 
      ...data.getHeaders()
    },
    data : data
  };

  const response = await axios(config);
  
  // Retorna a resposta da API externa ao cliente
  return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao enviar dados para a API:', error);
    return NextResponse.json({ error: 'Falha ao processar a requisição' }, { status: 500 });
  }
}











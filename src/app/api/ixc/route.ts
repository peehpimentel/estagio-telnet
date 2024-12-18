import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv'

type ParamType = {
  tipo: string;
  id_estrutura: string;
  protocolo: string;
  id_circuito: string;
  id_cliente: number;
  id_login: number;
  id_contrato: number;
  id_filial: number;
  id_assunto: number;
  titulo: string;
  origem_endereco: string;
  origem_endereco_estrutura: string;
  endereco: string;
  latitude: string;
  longitude: string;
  id_wfl_processo: number;
  id_ticket_setor: number;
  id_responsavel_tecnico: number;
  data_criacao: string;
  data_ultima_alteracao: string;
  prioridade: string;
  data_reservada: string;
  melhor_horario_reserva: string;
  id_ticket_origem: string;
  id_usuarios: number;
  id_resposta: number;
  menssagem: string;
  interacao_pendente: string;
  su_status: string;
  id_evento_status_processo: string;
  id_canal_atendimento: string;
  status: string;
  mensagens_nao_lida_cli: number;
  mensagens_nao_lida_sup: number;
  token: string;
  finalizar_atendimento: string;
  id_su_diagnostico: string;
  status_sla: string;
  origem_cadastro: string;
  ultima_atualizacao: string;
  cliente_fone: string;
  cliente_telefone_comercial: string;
  cliente_id_operadora_celular: number;
  cliente_telefone_celular: string;
  cliente_whatsapp: string;
  cliente_ramal: string;
  cliente_email: string;
  cliente_contato: string;
  cliente_website: string;
  cliente_skype: string;
  cliente_facebook: string;
  latitude_cli: string;
  longitude_cli: string;
  latitude_login: string;
  longitude_login: string;
};

export async function POST(req: Request) {

  dotenv.config();

  try {
    
  const body = await req.json();
  const paramStringified: ParamType =  {
    "tipo": body.tipo  
    ,"id_estrutura": ''
    ,"protocolo": ''
    ,"id_circuito": ''
    ,"id_cliente": body.id_cliente
    ,"id_login": body.id_login
    ,"id_contrato": body.id_contrato
    ,"id_filial": body.id_filial
    ,"id_assunto": body.id_assunto
    ,"titulo": body.titulo
    ,"origem_endereco": body.origem_endereco
    ,"origem_endereco_estrutura": 'E'
    ,"endereco": body.endereco
    ,"latitude": body.latitude
    ,"longitude": body.longitude
    ,"id_wfl_processo": body.id_wfl_processo
    ,"id_ticket_setor": body.id_ticket_setor
    ,"id_responsavel_tecnico": body.id_responsavel_tecnico
    ,"data_criacao": ''
    ,"data_ultima_alteracao": ''
    ,"prioridade": body.prioridade  //'M'
    ,"data_reservada": body.data_reservada
    ,"melhor_horario_reserva": body.melhor_horario_reserva  //'Q'
    ,"id_ticket_origem": body.id_ticket_origem
    ,"id_usuarios": 23
    ,"id_resposta": body.id_resposta
    ,"menssagem": body.menssagem
    ,"interacao_pendente": body.interacao_pendente // 'I'
    ,"su_status": 'N'
    ,"id_evento_status_processo": ''// body.id_evento_status_processo
    ,"id_canal_atendimento": ''//body.id_canal_atendimento
    ,"status": 'T'
    ,"mensagens_nao_lida_cli": 0
    ,"mensagens_nao_lida_sup": 0
    ,"token": ''
    ,"finalizar_atendimento": 'N'
    ,"id_su_diagnostico": ''
    ,"status_sla": ''
    ,"origem_cadastro": 'P'
    ,"ultima_atualizacao": 'CURRENT_TIMESTAMP'
    ,"cliente_fone": ''
    ,"cliente_telefone_comercial": ''
    ,"cliente_id_operadora_celular": 0
    ,"cliente_telefone_celular": body.cliente_telefone_celular
    ,"cliente_whatsapp": body.cliente_whatsapp
    ,"cliente_ramal": ''
    ,"cliente_email": ''
    ,"cliente_contato": ''
    ,"cliente_website": ''
    ,"cliente_skype": ''
    ,"cliente_facebook": ''
    ,"latitude_cli": body.latitude
    ,"longitude_cli": body.longitude
    ,"latitude_login": body.latitude
    ,"longitude_login": body.longitude
  }
    console.log('rota ',body.tipo)
    const url = `${process.env.SECRET_API}/su_ticket`!;
    const username = process.env.SECRET_USERNAME;
    const password = process.env.SECRET_KEY;
    const encodedToken = Buffer.from(`${username}:${password}`).toString('base64');
    
    const raw = JSON.stringify({
      ...paramStringified,
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
    console.log(paramStringified);

    const result = {
      id: data.id,
      menssagem: paramStringified.menssagem,
      data_reservada: paramStringified.data_reservada,
    };

    return NextResponse.json(result);
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
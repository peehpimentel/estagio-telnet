import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv'

export async function POST(req: Request) {

  dotenv.config();

  try {
    
  const body = await req.json();
  const param = {
    //  "tipo": "C"
    // ,"id_estrutura": ''
    // ,"protocolo": 202412108757
    // ,"id_circuito": ''
    // ,"id_cliente": 23097
    // ,"id_login": 34592
    // ,"id_contrato": 34872
    // ,"id_filial": 1
    // ,"id_assunto": 117
    // ,"titulo": "SEM CONEXÃO"
    // ,"origem_endereco": "L"
    // ,"origem_endereco_estrutura": "E"
    // ,"endereco": "MS Três Lagoas 79642-176 NOVA EUROPA  - João Farid Zogbi, 1895"
    // ,"latitude": -20.79091123155786
    // ,"longitude": -51.71255986126845
    // ,"id_wfl_processo": 27
    // ,"id_ticket_setor": 5
    // ,"id_responsavel_tecnico": 18966
    // ,"data_criacao": ''
    // ,"data_ultima_alteracao": ''
    // ,"prioridade": "M"
    // ,"data_reservada": ''
    // ,"melhor_horario_reserva": "Q"
    // ,"id_ticket_origem": "I"
    // ,"id_usuarios": 62
    // ,"id_resposta": 7
    // ,"menssagem": "PEDIDO DE MANUTENÇÃO Canal de Atendimento - Protocolo - Relato do Cliente - Sinal de potência da fibra (db) - Observação - Contato -  "
    // ,"interacao_pendente": "I"
    // ,"su_status": "N"
    // ,"id_evento_status_processo": ''
    // ,"id_canal_atendimento": ''
    // ,"status": "T"
    // ,"mensagens_nao_lida_cli": 0
    // ,"mensagens_nao_lida_sup": 0
    // ,"token": ''
    // ,"finalizar_atendimento": "N"
    // ,"id_su_diagnostico": ''
    // ,"status_sla": ''
    // ,"origem_cadastro": "P"
    // ,"ultima_atualizacao": "CURRENT_TIMESTAMP"
    // ,"cliente_fone": ''
    // ,"cliente_telefone_comercial": ''
    // ,"cliente_id_operadora_celular": 0
    // ,"cliente_telefone_celular": "(18) 99152-8771"
    // ,"cliente_whatsapp": "(18) 99152-8771"
    // ,"cliente_ramal": ''
    // ,"cliente_email": ''
    // ,"cliente_contato": ''
    // ,"cliente_website": ''
    // ,"cliente_skype": ''
    // ,"cliente_facebook": ''
    // ,"latitude_cli": -20.79091123155786
    // ,"longitude_cli": -51.71255986126845
    // ,"latitude_login": -20.79091123155786
    // ,"longitude_login": -51.71255986126845

    "id_login": body.id_login,
    "id_contrato": body.id_contrato,
    "id_cliente": body.id_cliente,
    "id_assunto": body.id_assunto,
    "titulo": body.titulo,
    "prioridade": body.prioridade,
    "menssagem": body.menssagem,
    "interacao_pendente": body.interacao_pendente,
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
    "endereco": body.endereco,
    "latitude": body.latitude,
    "longitude": body.longitude,
    "su_status": "N",
    // "protocolo": 202412108760,
    "ultima_atualizacao": "CURRENT_TIMESTAMP"
  }
    const url = `${process.env.SECRET_API}/su_ticket`!;
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
    console.log(param);

    const result = {
      id: data.id,
      menssagem: param.menssagem,
      data_reservada: param.data_reservada,
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
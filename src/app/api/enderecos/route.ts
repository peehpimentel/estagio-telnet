import { stat } from 'fs';
import { headers } from 'next/headers';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cep = searchParams.get('cep')
    if(!cep){
        return new Response(JSON.stringify({ error: "CEP não fornecido." }), {
        status: 400,
        headers: {"Content-type": "application/json"},
        });
    }
    try {
        const viaCepRes = await fetch("https://viacep.com.br/ws/"+ cep +"/json/");
        if (!viaCepRes.ok) {
            throw new Error('Erro ao buscar dados da API externa');
        }
        const data = await viaCepRes.json(); //espera o viacep acessar o json
        if(data.error){
            return new Response(JSON.stringify({ error: "CEP não encontrado." }), {
            status: 404,
            headers: {"Content-type": "application/json"}, //estou dizendo que o conteúdo que estou passando é do tipo json
            });
        }
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Content-type": "application/json"},
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: "CEP não encontrado." }), {
            status: 500,
            headers: {"Content-type": "application/json"},
        });
    }
}

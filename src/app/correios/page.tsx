"use client";

import { FloatingLabel } from "flowbite-react";
import { Button } from "flowbite-react";
import { ApiError } from "next/dist/server/api-utils";
import React, { useCallback, useState } from "react";

export default function Component() {

  // elementos que serão carregados através da api.
  interface Endereco{
   rua: string;
   bairro: string;
   cidade: string;
   uf: string; 
  }

  // valores para os elementos da interface quando iniciamos a página.
  const DEFAULT_ENDERECO: Endereco = {
    rua: "Não disponível.",
    bairro: "Não disponível.",
    cidade: "Não disponível.",
    uf: "Não disponível."
  };

  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<Endereco>(DEFAULT_ENDERECO);
  const [err, setError] =  useState<string | null>(null); // aqui está tratando erros, se for um erro conhecido aparece como string, caso contrário o erro será nulo.
  const [carregando, setCarregando] = useState(false);

  const handleCepChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if(value.length > 8) value = value.slice(0, 8);// verifica se o input do usuário tem mais que 8 digitos, caso true, diminui para 8
    if(value.length > 5) { 
      value = value.slice(0, 5) + '-' + value.slice(5);// essa condição modifica o jeito da consulta para 00000-000
    }
    setCep(value);
  }, [])

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    // remove os caracteres não numéricos. / \d / é uma expressão regular para tratar sobre caracteres não numéricos, já o g torna essa substituição global.
    const cepTrimm = cep.replace(/\D/g, '');                                         
    if(cepTrimm.length !== 8){
      setError('Cep inválido.');
      return
    }
    setCarregando(true);
    setError(null);
    setEndereco(DEFAULT_ENDERECO);

    try{
     const response = await fetch(`/api/enderecos?cep=${cepTrimm}`)
     console.log("dados recebidos: ", response)
     if(!response.ok){
      throw new Error(response.status === 404
        ? 'CEP não encontrado.'
        : 'Erro ao buscar o CEP.');
     }
    const data = await response.json();
    console.log(data)
    if(!data.logradouro && !data.bairro && !data.localidade && !data.uf){
      throw new Error("CEP Não econtrado.");
    }
    setEndereco({
      rua: data.logradouro || DEFAULT_ENDERECO.rua,
      bairro: data.bairro || DEFAULT_ENDERECO.bairro,
      cidade: data.localidade || DEFAULT_ENDERECO.cidade,
      uf: data.uf || DEFAULT_ENDERECO.uf,
    });
  } catch (err: unknown){
      if(err instanceof Error){
        setError(err.message);
      } else {
        setError("Error desconhecido.");
      }
      setEndereco(DEFAULT_ENDERECO);
    } finally {
      setCarregando(false);
    }
  }, [cep]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <form onSubmit={handleSearch}>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <FloatingLabel variant="outlined" label="Digite o CEP" value={cep} onChange={handleCepChange}/>
        <Button color="dark" type="submit" className="mb-2" disabled={carregando}>{carregando ? 'Buscando...' : 'Buscar'}</Button>
        <FloatingLabel variant="outlined" label="Rua" readOnly className="cursor-not-allowed" value={endereco.rua} />
        <FloatingLabel variant="outlined" label="Bairro" readOnly className="cursor-not-allowed" value={endereco.bairro} />
        <FloatingLabel variant="outlined" label="Cidade" readOnly className="cursor-not-allowed" value={endereco.cidade} />
        <FloatingLabel variant="outlined" label="Estado" readOnly className="cursor-not-allowed" value={endereco.uf} />
      </div>
    </form>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { Search, AlertCircle } from 'lucide-react';

//
interface Option {
  id: number;
  name: string;
}

// initialData está pegando os dados da interface Option.
interface AutocompleteInputProps {
  initialData: Option[];
  hasError: boolean;
}

export default function AutocompleteInput({ initialData, hasError }: AutocompleteInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Option[]>(initialData);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // se não ter erros e o valor do input for vazio, altera a sugestão para o primeiro valor do Option.
  useEffect(() => {
    if (!hasError) {
      if (inputValue.trim() === '') { 
        setSuggestions(initialData);
      } else {
        // caso não tenha espaço vazio, altera a sugestão para a selecionada.
        const filteredSuggestions = initialData.filter(item =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      }
    }
  }, [inputValue, initialData, hasError]);


// mostra "sugestões" caso não tenha nenhum erro, ou seja, mostra todos os valores para selecionar.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!hasError) {
      setShowSuggestions(true);
    }
  };

// mantém apenas o valor selecionado no input
  const handleSelectOption = (option: Option) => {
    setInputValue(option.name);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => !hasError && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // delay para o dropdown.
          className={`w-full p-2 border mb-2 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-gray-200 
            ${hasError ? 'focus:ring-yellow-500 border-yellow-300' : 'focus:ring-blue-500'}` }
          placeholder={hasError ? "Digite um opção..." : "Digite ou selecione uma opção..."}
        />

        {hasError ? (
          <AlertCircle className="absolute right-3 top-2.5 h-5 w-5 text-yellow-500" />
        ) : (
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-200" />
        )}
      </div>
      
      {!hasError && showSuggestions && (
        <ul className="absolute w-full mt-1 bg-gray-800  border rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {suggestions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelectOption(option)}
              className="px-4 py-2 hover:bg-slate-500 cursor-pointer text-gray-200"
            >
              {option.name}
            </li>
          ))}
          {/* se o tamanho da sugestão for igual a 0, aparece uma mensagem de erro. */}
          {suggestions.length === 0 && (
            <li className="px-4 py-2 text-red-700">Nenhum resultado encontrado</li>
          )}
        </ul>
      )}

      {hasError && (
        <p className="mt-2 text-sm text-yellow-600">
          Modo de digitação livre ativado devido a um erro na busca.
        </p>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  placeholder?: string;
  onChange?: (valeu: Option) => void;
  value: string;
}

export default function AutocompleteInput({ 
  initialData, 
  hasError, 
  placeholder, 
  onChange, 
  value 
}: AutocompleteInputProps) {

  const [suggestions, setSuggestions] = useState<Option[]>(initialData);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setSuggestions(initialData);
    }
  }, [initialData]);

  // se não ter erros e o valor do input for vazio, altera a sugestão para o primeiro valor do Option.
  const filteredSuggestions = (value: string) => {
    if (!hasError) {
      if (value.trim() === '') { 
        setSuggestions(initialData);
      } else {
        // caso não tenha espaço vazio, altera a sugestão para a selecionada.
        const filteredSuggestions = initialData.filter(item =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      }
    }
  };


// mostra "sugestões" caso não tenha nenhum erro, ou seja, mostra todos os valores para selecionar.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    filteredSuggestions(value);
    setShowSuggestions(true);
    if (onChange) {
      onChange({ id: 0, name: value }); // Atualiza o valor do campo com o texto digitado
    }
  };

// mantém apenas o valor selecionado no input
  const handleSelectOption = (option: Option) => {
    if (onChange) {
      onChange(option); // Passa a opção selecionada para o onChange
    }
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleFocus = () => {
    if (!hasError) {
      filteredSuggestions(value);
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur} // delay para o dropdown.
          className={`w-full p-2 border mb-2 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-gray-200 
            ${hasError ? 'focus:ring-yellow-500 border-yellow-300' : 'focus:ring-blue-500'}` }
          placeholder={placeholder || 'Escolha um registro'}
        />

        {hasError ? (
          <AlertCircle className="absolute right-3 top-2.5 h-5 w-5 text-yellow-500" />
        ) : (
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-200" />
        )}
      </div>
      
      {!hasError && showSuggestions && suggestions.length > 0 && (
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
          {!hasError && showSuggestions && suggestions.length === 0 && (
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

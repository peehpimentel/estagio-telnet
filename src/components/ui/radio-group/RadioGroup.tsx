import React from 'react';

interface RadioGroupProps {
  value: string; // Valor atualmente selecionado
  onValueChange: (value: string) => void; // Função chamada ao mudar o valor
  children: React.ReactNode; // Elementos filhos
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onValueChange, children }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value); // Passa o valor selecionado
  };

  return (
    <div role="radiogroup" onChange={handleChange}>
      {children}
    </div>
  );
};

interface RadioGroupItemProps {
    id: string; // ID do elemento
    value: string; // Valor associado ao botão de rádio
    name?: string; // Nome opcional do grupo de rádio
    className?: string; // Classe CSS opcional
  }
  
  export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
    id,
    value,
    name = 'radio-group', // Valor padrão para o nome do grupo
    className,
  }) => {
    return (
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        className={className || 'radio-input'} // Classe padrão caso não seja fornecida
      />
    );
  };
  
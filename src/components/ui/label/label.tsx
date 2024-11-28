import React from 'react';

interface LabelProps {
  htmlFor: string; // Define que o htmlFor é do tipo string
  children: React.ReactNode; // Define que children pode ser qualquer elemento React
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  );
};


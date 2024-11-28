import  { RadioGroup, RadioGroupItem }  from '../ui/radio-group/RadioGroup';
import { Label }  from '../ui/label/label';

interface RadioGroupPrioridadeProps {
    onChange: (value: string) => void; // Função para passar o valor selecionado
    value: string; // Valor controlado pelo estado
  }
  
  export default function RadioGroupPrioridade({ onChange, value }: RadioGroupPrioridadeProps) {
    return (
      <RadioGroup value={value} onValueChange={onChange} > {/* onValueChange em vez de onChange */}
     <fieldset className="relative w-64 mb-2 bg-gray-800 text-gray-200 px-4 py-2 
     rounded border border-gray-700 focus:outline-none focus:border-blue-500">
        <div className="flex items-center space-x-2">
            <legend>Prioridade: </legend>
            <RadioGroupItem value="b" id="r1" />
            <Label htmlFor="r1">Baixa</Label>
            <RadioGroupItem value="n" id="r2" />
            <Label htmlFor="r2">Normal</Label>
            <RadioGroupItem value="a" id="r3" />
            <Label htmlFor="r3">Alta</Label>
            <RadioGroupItem value="c" id="r4" />
            <Label htmlFor="r4">Crítica</Label>
        </div>
    </fieldset>
      </RadioGroup>
    );
  }
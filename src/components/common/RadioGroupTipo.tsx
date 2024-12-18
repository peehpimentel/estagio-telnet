import  { RadioGroup, RadioGroupItem }  from '../ui/radio-group/RadioGroup';
import { Label }  from '../ui/label/label';

interface RadioGroupTipoProps {
    onChange: (value: string) => void; // Função para passar o valor selecionado
    value: string; // Valor controlado pelo estado
  }
  
  export default function RadioGroupTipo({ onChange, value }: RadioGroupTipoProps) {
    return (
      <RadioGroup value={value} onValueChange={onChange} > {/* onValueChange em vez de onChange */}
     <fieldset className=" text-gray-200 px-4 py-2 
     rounded focus:outline-none focus:border-blue-500">
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="C" id="r1" name="type-group"/>
            <Label htmlFor="r1">Cliente</Label>
            <RadioGroupItem value="E" id="r2" name="type-group"/>
            <Label htmlFor="r2">Estrutura própria</Label>
        </div>
    </fieldset>
      </RadioGroup>
    );
  }
import  { RadioGroup, RadioGroupItem }  from '../ui/radio-group/RadioGroup';
import { Label }  from '../ui/label/label';

interface RadioGroupOrigemProps {
    onChange: (value: string) => void; // Função para passar o valor selecionado
    value: string; // Valor controlado pelo estado
  }
  
  export default function RadioGroupOrigem({ onChange, value }: RadioGroupOrigemProps) {
    return (
      <RadioGroup value={value} onValueChange={onChange} > {/* onValueChange em vez de onChange */}
     <fieldset className=" text-gray-200 px-4 py-2 
     rounded focus:outline-none focus:border-blue-500">
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="I" id="r1" name="origin-group"/>
            <Label htmlFor="r1">Interna</Label>
            <RadioGroupItem value="H" id="r2" name="origin-group"/>
            <Label htmlFor="r2">Hotsite</Label>
        </div>
    </fieldset>
      </RadioGroup>
    );
  }
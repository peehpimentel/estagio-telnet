import  { RadioGroup, RadioGroupItem }  from '../ui/radio-group/RadioGroup';
import { Label }  from '../ui/label/label';

interface RadioGroupHorarioProps {
    onChange: (value: string) => void; // Função para passar o valor selecionado
    value: string; // Valor controlado pelo estado
  }
  
  export default function RadioGroupHorario({ onChange, value }: RadioGroupHorarioProps) {
    return (
      <RadioGroup value={value} onValueChange={onChange} > {/* onValueChange em vez de onChange */}
     <fieldset className="text-gray-200 px-4 py-2 
     rounded focus:outline-none focus:border-blue-500">
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="m" id="r1" />
            <Label htmlFor="r1">Manhã</Label>
            <RadioGroupItem value="t" id="r2" />
            <Label htmlFor="r2">Tarde</Label>
            <RadioGroupItem value="n" id="r3" />
            <Label htmlFor="r3">Noite</Label>
            <RadioGroupItem value="q" id="r4" />
            <Label htmlFor="r4">Qualquer</Label>
        </div>
    </fieldset>
      </RadioGroup>
    );
  }
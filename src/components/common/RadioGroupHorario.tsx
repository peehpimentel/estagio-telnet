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
            <RadioGroupItem value="M" id="r1" name="hour-group"/>
            <Label htmlFor="r1">Manhã</Label>
            <RadioGroupItem value="T" id="r2" name="hour-group"/>
            <Label htmlFor="r2">Tarde</Label>
            <RadioGroupItem value="N" id="r3" name="hour-group"/>
            <Label htmlFor="r3">Noite</Label>
            <RadioGroupItem value="Q" id="r4" name="hour-group"/>
            <Label htmlFor="r4">Qualquer</Label>
        </div>
    </fieldset>
      </RadioGroup>
    );
  }
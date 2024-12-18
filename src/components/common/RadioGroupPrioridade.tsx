import  { RadioGroup, RadioGroupItem }  from '../ui/radio-group/RadioGroup';
import { Label }  from '../ui/label/label';

interface RadioGroupPrioridadeProps {
    onChange: (value: string) => void; // Função para passar o valor selecionado
    value: string; // Valor controlado pelo estado
  }
  
  export default function RadioGroupPrioridade({ onChange, value }: RadioGroupPrioridadeProps) {
    return (
      <RadioGroup value={value} onValueChange={onChange} > {/* onValueChange em vez de onChange */}
     <fieldset className=" text-gray-200 px-4 py-2 
     rounded focus:outline-none focus:border-blue-500">
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="B" id="r1" name="priority-group"/>
            <Label htmlFor="r1">Baixa</Label>
            <RadioGroupItem value="M" id="r2" name="priority-group"/>
            <Label htmlFor="r2">Normal</Label>
            <RadioGroupItem value="A" id="r3" name="priority-group"/>
            <Label htmlFor="r3">Alta</Label>
            <RadioGroupItem value="C" id="r4" name="priority-group"/>
            <Label htmlFor="r4">Crítica</Label>
        </div>
    </fieldset>
      </RadioGroup>
    );
  }
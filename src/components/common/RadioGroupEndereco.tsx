import  { RadioGroup, RadioGroupItem }  from '../ui/radio-group/RadioGroup';
import { Label }  from '../ui/label/label';

interface RadioGroupEnderecoProps {
    onChange: (value: string) => void; // Função para passar o valor selecionado
    value: string; // Valor controlado pelo estado
  }
  
  export default function RadioGroupEndereco({ onChange, value }: RadioGroupEnderecoProps) {
    return (
      <RadioGroup value={value} onValueChange={onChange} > {/* onValueChange em vez de onChange */}
     <fieldset className="text-gray-200 px-4 py-2 
     rounded focus:outline-none focus:border-blue-500">
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="C" id="r1" name="address-group"/>
            <Label htmlFor="r1">Cliente</Label>
            <RadioGroupItem value="L" id="r2" name="address-group"/>
            <Label htmlFor="r2">Login</Label>
            <RadioGroupItem value="CC" id="r3" name="address-group"/>
            <Label htmlFor="r3">Contrato</Label>
            <RadioGroupItem value="M" id="r4" name="address-group"/>
            <Label htmlFor="r4">Manual</Label>
        </div>
    </fieldset>
      </RadioGroup>
    );
  }
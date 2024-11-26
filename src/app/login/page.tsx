"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { PiEyeSlashBold } from "react-icons/pi";
import React, { useState } from "react";

export default function Component() {
  const [email, setEmail] = useState("");
  const [psswd, setPsswd] = useState("");
  const [psswd2, setPsswd2] = useState("");
  const [checked, setChecked] = useState(false);
  function cadastroEmail(event: { target: { value: React.SetStateAction<string>; }; }){
      setEmail(event.target.value);
  };
  function cadastroSenha(event: { target: { value: React.SetStateAction<string>; }; }){
      setPsswd(event.target.value);
  };
  function conferirSenha(event: { target: { value: React.SetStateAction<string>; }; }){
      setPsswd2(event.target.value);
  };
  function estaMarcado(event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }){
    setChecked(event.target.checked);
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Seu email"/>
          </div>
          <TextInput id="email2" type="email" value={email} onChange={cadastroEmail} icon={HiMail} placeholder="nome@flowbite.com" required shadow/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Sua senha" />
          </div>
          <TextInput id="password2" type="password" value={psswd} onChange={cadastroSenha} icon={PiEyeSlashBold} required shadow/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repita a senha" />
          </div>
          <TextInput id="repeat-password" type="password" value={psswd2} onChange={conferirSenha} icon={PiEyeSlashBold} required shadow/>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" checked={checked} onChange={estaMarcado} required />
          <Label htmlFor="agree" className="flex">
            Eu concordo com os&nbsp;
            <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500" >
              termos e condições.
            </Link>
          </Label>
        </div>
        <Button type="submit" className={`bg-red-700 ${!email || !psswd || !psswd2 || !checked ? 'cursor-not-allowed': 'hover:bg-red-500 cursor-pointer'} mx-2`} 
        disabled={!email || !psswd || !psswd2 || !checked}>Criar conta nova</Button>
      </form>
    </div>
  );
}

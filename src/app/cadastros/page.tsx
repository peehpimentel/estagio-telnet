"use client";

import { FloatingLabel, Button, Textarea, Select, Label, Modal, Radio, TextInput } from "flowbite-react";
import { ApiError } from "next/dist/server/api-utils";
import { TestContext } from "node:test";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { Search } from 'lucide-react';
import { PrismaClient } from '@prisma/client';


export default function SearchDropdown() {

    const wrapperRef = useRef(null);
    const wrapperRef2 = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    
    const id_clientes = [
        { id: '1', label: 'Caixa 1' },
        { id: '2', label: 'Caixa 2' },
        { id: '3', label: 'Banco 1' },
        { id: '47', label: 'Máquinas e equipamentos' },
        { id: '103', label: 'Frete - Compra (despesas)' }
    ];
    
    const filteredId_clientes = id_clientes.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm)
    );

    const id_assunto = [
        { id: '1', label: 'Assunto 1' },
        { id: '2', label: 'Assunto 2' },
        { id: '3', label: 'Assunto 3' },
        { id: '47', label: 'Assunto 47' },
        { id: '103', label: 'Assunto 103' }
    ];
    
    const filteredId_assunto = id_assunto.filter(item =>
        item.label.toLowerCase().includes(searchTerm2.toLowerCase()) ||
        item.id.includes(searchTerm2)
    );

    const handleKeyPress = (event: { key: string; }) => {
        if(event.key === "Escape"){
            setIsOpen(false);
            setIsOpen2(false);
        }
    };

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
        // Se clicar fora do elemento, o open passa para Falso, ou seja, fecha o menu.
            function handleClickOutside(event: { target: any; }) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyPress);
            return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyPress);
            };
        }, [ref]);
        }

    function useOutsideAlerter2(ref2: any) {
        useEffect(() => {
            // Se clicar fora do elemento, o open2 passa para Falso, ou seja, fecha o menu.
            function handleClickOutside2(event: { target: any; }) {
            if (ref2.current && !ref2.current.contains(event.target)) {
                setIsOpen2(false);
            }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside2);
            document.addEventListener("keydown", handleKeyPress);
            return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside2);
            document.removeEventListener("keydown", handleKeyPress);
            };
        }, [ref2]);
        }

    useOutsideAlerter(wrapperRef);
    useOutsideAlerter2(wrapperRef2);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
  return (
    <form className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="relative w-64 mb-2" ref={wrapperRef}>
            {/* Input de busca */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar clientes..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                    } }
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500" />
                <Search
                    className="absolute right-3 top-2.5 text-gray-400"
                    size={18} />
            </div>

            {/* Lista de resultados */}
            {isOpen && (
                <div
                    className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg max-h-60 overflow-auto z-50">
                    {filteredId_clientes.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                                setSearchTerm(item.label);
                                setIsOpen(false);
                            } }>
                            <span className="w-12 text-gray-400">{item.id}</span>
                            <span className="text-gray-200">{item.label}</span>
                        </div>
                    ))}
                    {filteredId_clientes.length === 0 && (
                        <div className="px-4 py-2 text-gray-400">
                            Nenhum resultado encontrado
                        </div>
                    )}
                </div>
            )}
        </div>

{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="relative w-64 mb-2" ref={wrapperRef2}>
            {/* Input de busca */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar assunto..."
                    value={searchTerm2}
                    onChange={(e) => {
                        setSearchTerm2(e.target.value);
                        setIsOpen2(true);
                    } }
                    onClick={() => setIsOpen2(true)}
                    className="w-full bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500" />
                <Search
                    className="absolute right-3 top-2.5 text-gray-400"
                    size={18} />
            </div>

            {/* Lista de resultados */}
            {isOpen2 && (
                <div
                    className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg max-h-60 overflow-auto z-50">
                    {filteredId_assunto.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                                setSearchTerm2(item.label);
                                setIsOpen2(false);
                            } }>
                            <span className="w-12 text-gray-400">{item.id}</span>
                            <span className="text-gray-200">{item.label}</span>
                        </div>
                    ))}
                    {filteredId_assunto.length === 0 && (
                        <div className="px-4 py-2 text-gray-400">
                            Nenhum resultado encontrado
                        </div>
                    )}
                </div>
            )}
        </div>

{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <input placeholder="Título" type="text" className="relative w-64 mb-2 bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500 " />
        <input placeholder="Setor" type="text" className="relative w-64 mb-2 bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500 " />
        <Textarea id="comment" placeholder="Sua mensagem..." required rows={4} className="relative w-64 mb-2 bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500" />
        <fieldset className="relative w-64 mb-2 bg-gray-800 text-gray-200 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500 ">
            <div className="flex items-center gap-2">
                <legend>Prioridade: </legend>
                <Radio id="baixa" name="prioridade" value="B" />
                <Label htmlFor="baixa" className="text-gray-200">Baixa</Label>
                <Radio id="normal" name="prioridade" value="N" />
                <Label htmlFor="normal" className="text-gray-200">Normal</Label>
                <Radio id="alta" name="prioridade" value="A" />
                <Label htmlFor="alta" className="text-gray-200">Alta</Label>
            </div>
        </fieldset>
        <Button color="dark" type="submit" className="mb-2">Buscar</Button>
    </form>
  );
}
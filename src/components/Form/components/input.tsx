'use client';

import { useContext } from "react";
import { FormContext } from "..";

interface InputProps {
    type?: "text" | "password";
    name: string;
    label: string;
    placeholder?: string;
}

export function Input({ type = "text", name, label, placeholder }: InputProps) {
    const { formValues, setFormValues } = useContext(FormContext)!;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [name]: e.target.value });
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm" htmlFor={name}>{label}</label>
            <input className="p-2.5 border rounded-md text-sm transition duration-300 outline outline-transparent text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={formValues[name] || ""}
                onChange={handleChange}
            />
        </div>
    );
}
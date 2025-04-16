import React from "react";
import { Input } from "../ui/input";
import { UseFormRegister } from "react-hook-form";

interface FormData {
  [key: string]: string;
}

interface InputProps {
  item: {
    name: string;
    label: string;
    fieldType?: string;
    required?: boolean;
  };
  register: UseFormRegister<FormData>;
}

export default function InputForm({ item, register }: InputProps) {
  return (
    <div>
      <Input
        id={item.name}
        {...register(item.name, { required: item.required })}
        type={item?.fieldType || "text"}
        placeholder={item.label}
        className="mt-1 w-full border rounded-md px-3 py-2"
      />
    </div>
  );
}

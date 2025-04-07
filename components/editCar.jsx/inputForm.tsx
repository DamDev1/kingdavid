import React from "react";
import { Input } from "../ui/input";

interface InputProps {
  item: {
    name: string;
    label: string;
    fieldType?: string;
    required?: boolean;
  };
  handleChange: (name: string, value: string) => void;
  formDetails: Record<string, string>;
}

export default function InputForm({ item, handleChange, formDetails }: InputProps) {
  return (  
    <div>
      <Input
        id={item.name}
        name={item.name}
        type={item?.fieldType || "text"} // Default to "text" if not provided
        required={item?.required || false}
        placeholder={item.label}
        onChange={(e) => handleChange(item.name, e.target.value)}
        value={formDetails[item.name] || ""}
        className="mt-1 w-full border rounded-md px-3 py-2"
      />
    </div>
  );
}

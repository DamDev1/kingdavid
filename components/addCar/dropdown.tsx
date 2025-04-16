import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  handleChange: (name: string, value: string) => void
  item: {
    name: string;
    label: string;
    fieldType?: string;
    required?: boolean;
    options?: string[]
  };
}

export default function Dropdown({item, handleChange}:Props) {
  return (
    <Select onValueChange={(value) => handleChange(item?.name, value)}>
      <SelectTrigger className="w-full">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        {item?.options?.map((option: string) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

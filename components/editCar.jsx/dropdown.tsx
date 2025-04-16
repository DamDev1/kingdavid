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
    formDetails: Record<string, string>;
  }
  

export default function Dropdown({item, handleChange, formDetails}:Props) {
  return (
    <Select onValueChange={(value) => handleChange(item?.name, value)}>
      <SelectTrigger className="w-full" >
        <SelectValue placeholder={formDetails[item?.name]} defaultValue={formDetails[item?.name] || ""}/>
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

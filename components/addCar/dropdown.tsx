import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dropdown({item, handleChange}:any) {
  return (
    <Select onValueChange={(value) => handleChange(item?.name, value)}>
      <SelectTrigger className="w-full">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        {item?.options?.map((option: any) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dropdown({item}:any) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={item?.name} />
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

import React from "react";
import { Input } from "../ui/input";

export default function InputForm({ item, handleChange }: any) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        required={item?.required}
        placeholder={item?.label}
        onChange={(e) => handleChange(item?.name, e.target.value)}
      />
    </div>
  );
}

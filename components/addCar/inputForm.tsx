import React from "react";
import { Input } from "../ui/input";

export default function InputForm({ item }: any) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        value={item?.name}
        required={item?.required}
        placeholder={item?.label}
      />
    </div>
  );
}

import React from "react";
import { Input } from "../ui/input";

export default function InputForm({ item }: any) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        required={item?.required}
        placeholder={item?.label}
      />
    </div>
  );
}

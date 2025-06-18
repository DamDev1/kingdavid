import { useRouter } from "next/navigation";
import React from "react";

export default function Logo() {
  const navigate = useRouter();
  return (
    <div
      className="cursor-pointer text-[20px] font-bold leading-tight tracking-wide"
      onClick={() => navigate.push("/")}
    >
      <span className="text-gray-800">King</span>
      <span className="text-blue-600">David</span>
      <span className="block text-[12px] font-medium text-gray-500 tracking-widest">
        AUTO LVC
      </span>
    </div>
  );
}

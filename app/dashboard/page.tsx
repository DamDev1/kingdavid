"use client";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Admin() {
  const navigate = useRouter();
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-4xl">My Listing</h2>
          <Button onClick={() => navigate.push("/dashboard/add-car")}>+Add Listing</Button>
        </div>
      </div>
    </div>
  );
}

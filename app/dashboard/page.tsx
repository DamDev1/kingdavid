"use client";
import Header from "@/components/shared/Header";
import { useRouter } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarListing from "@/components/dashboard/carListing/car-listing";

export default function Admin() {
  return (
    <div>
      <Header />
      <div className="px-10 my-10">
        <Tabs defaultValue="my-listing" className="w-full">
          <TabsList className="w-full justify-start flex">
            <TabsTrigger value="my-listing" className=" cursor-pointer">My Listing</TabsTrigger>
            <TabsTrigger value="inbox" className=" cursor-pointer">Inbox</TabsTrigger>
          </TabsList>
          <TabsContent value="my-listing">
            <CarListing/>
          </TabsContent>
          <TabsContent value="inbox">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

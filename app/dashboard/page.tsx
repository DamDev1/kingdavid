// app/dashboard/page.tsx
"use client";

import Header from "@/components/shared/Header";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarListing from "@/components/dashboard/carListing/car-listing";
import Chatbox from "@/components/dashboard/inbox/ChatBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useRouter()

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if(!userInfo){
      navigate.replace("/login")
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Header />
      <div className="px-10 my-10">
        <Tabs
          defaultValue={
            userInfo?.user?.role === "admin" ? "my-listing" : "inbox"
          }
          className="w-full"
        >
          <TabsList className="w-full justify-start flex">
            {userInfo?.user.role === "admin" && (
              <TabsTrigger value="my-listing" className="cursor-pointer">
                My Listing
              </TabsTrigger>
            )}
            <TabsTrigger value="inbox" className="cursor-pointer">
              Inbox
            </TabsTrigger>
            <TabsTrigger value="profile" className="cursor-pointer">
              Profile
            </TabsTrigger>
          </TabsList>

          {userInfo?.user.role === "admin" && (
            <TabsContent value="my-listing">
              <CarListing />
            </TabsContent>
          )}
          <TabsContent value="inbox">
            <Chatbox />
          </TabsContent>
          <TabsContent value="profile">
            <h1>Profile</h1>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

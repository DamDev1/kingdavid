"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
    // import axios from "axios";
    // import { useSelector } from "react-redux";
    // import { RootState } from "@/store/store";
import NotSignIn from "../Error/NotSignIn";
import CarDetailsProps from "@/types/carDetails";
import { MessageModal } from "../modal/messageModal";

export default function Owner({carData}: {carData: CarDetailsProps}) {
  // const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  // const [isloading, setIsloading] = useState(false);
  const [isSignedIn, setIsSignedIn]= useState(false);

  // const fullName = `${userInfo?.user?.firstName || ""} ${
  //   userInfo?.user?.lastName || ""
  // }`.trim();
  // const userId = userInfo?.user?.email?.split("@")[0] ?? "anonymous";

  // // const handleMessage = async () => {
  // //   if (!userInfo) {
  // //     setIsSignedIn(true);
  // //   } else {
  // //     setIsloading(true);
  // //     try {
  // //       const res = await axios.post("/api/message", {
  // //         user_id: userId,
  // //         nickname: fullName,
  // //         profile_url:
  // //           "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
  // //         title: "Car Inquiry",
  // //         userIds: [userId, "damilare12"],
  // //       });
  // //     } catch (error) {
  // //       console.log(error);
  // //     } finally {
  // //       setIsloading(false);
  // //     }
  // //   }
  // // };

  const handleMessage = async () => {
    setIsOpen(true);
  }
  return (
    <div className="bg-white p-8 shadow-md border rounded-md mt-4">
      <NotSignIn setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn}/>
      <h2 className="text-lg font-semibold">Dealer/Owner</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://storage.googleapis.com/pod_public/1300/121017.jpg"
        className="h-20 w-20 rounded-full object-cover mt-3"
        alt=""
      />
      <h2 className="text-lg font-semibold mt-1">KingDavidAuto</h2>
      <p className="mt-1.5">
        <Link href="tel:+1(718)883-0643" className="text-gray-500">
          Call: +1 (718) 883-0643
        </Link>
        <br />
        <Link
          href="mailto:samueldamilare622@gmail.com"
          className="text-gray-500"
        >
          Mail: samueldamilare622@gmail.com
        </Link>
      </p>
      <Button onClick={handleMessage} className="w-full mt-5 flex items-center">
        {/* {isloading ? "Creating chat" : "Message Dealer"} */}
        Message Dealer
      </Button>
      <MessageModal isOpen={isOpen} setIsOpen={setIsOpen} carName={carData?.listingTitle || ""}/>
    </div>
  );
}

"use client";
import Heading from "@/components/carDetails/Heading";
import LeftDetails from "@/components/carDetails/LeftDetails";
import RightDetails from "@/components/carDetails/RightDetails";
import Header from "@/components/shared/Header";
import CarDetailsProps from "@/types/carDetails";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SingleCarDetails() {
  const [carData, setCarData] = useState<CarDetailsProps | null>(null);
  const params = useParams();
  const handleGetDetails = async () => {
    try {
      const res = await axios.get(`/api/single-car`, {
        params: { id: params.id },
      });
      console.log(res);
      setCarData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDetails();
  }, []);
  return (
    <section>
      {carData && (
        <>
          <Header />
          <div className="p-10 max-md:p-5 overflow-hidden">
            <Heading carData={carData} />
            <div className="gap-5 grid mt-10 grid-cols-1 md:grid-cols-3 w-full">
              <div className="md:col-span-2">
                <LeftDetails carData={carData} />
              </div>
              <RightDetails carData={carData}/>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SingleCarDetailsContextValue {
  setCarData: (data: CarDetailsProps) => void;
  carData: CarDetailsProps | [];
}
interface CarDetailsProps {
  listingTitle: string;
  tagline?: string;
  originalPrice: number;
  category: string;
  condition: string;
  make: string;
  carModel: string;
  year: number;
  driveType: string;
  transmission: string;
  fuelType: string;
  mileage: number;
  engineSize?: string;
  cylinder?: number;
  color: string;
  sellingPrice: number;
  door: number;
  vin?: string;
  offerType?: string;
  listingDescription: string;
  features: string[];
  imageUrls: string[];
}

const singleCarDetailsContext = createContext<SingleCarDetailsContextValue | undefined>(
  undefined
);

export const SingleCarDetailsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [carData, setCarData] = useState<CarDetailsProps | []>([]);
  return (
    <singleCarDetailsContext.Provider value={{ setCarData, carData }}>
      {children}
    </singleCarDetailsContext.Provider>
  );
};

export const useSingleCarDetails = () => {
  const context = useContext(singleCarDetailsContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a singleCarDetailsContext");
  }
  return context;
};

export default singleCarDetailsContext;

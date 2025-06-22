import CarDetailsProps from "@/types/carDetails";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaTag } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaChargingStation } from "react-icons/fa";
import { FaIndustry } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRoad } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { FaGasPump } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import Owner from "./owner";
import NotSignIn from "../Error/NotSignIn";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSingleCarDetails } from "@/context/useSingleCarDetails";
import { useRouter } from "next/navigation";

const iconMap = {
  originalPrice: <FaDollarSign />,
  sellingPrice: <FaMoneyBillAlt />,
  category: <FaCar />,
  condition: <FaCheckCircle />,
  FaChargingStation: <FaChargingStation />,
  make: <FaIndustry />,
  carModel: <FaCarSide />,
  year: <FaCalendarAlt />,
  driveType: <FaRoad />,
  transmission: <FaCogs />,
  fuelType: <FaGasPump />,
  mileage: <FaTachometerAlt />,
  engineSize: <FaWrench />,
  cylinder: <FaCircle />,
  color: <FaPalette />,
  door: <FaDoorClosed />,
  vin: <FaIdCard />,
  offerType: <FaTags />,
};

export default function RightDetails({
  carData,
}: {
  carData: CarDetailsProps;
}) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useRouter();
  const { setCarData } = useSingleCarDetails();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const price = Number(carData.sellingPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleMessage = async () => {
    if (!userInfo) {
      setIsSignedIn(true);
    } else {
      setCarData(carData);
      navigate.push(`/car-details/${carData._id}/checkout`);
    }
  };
  return (
    <div>
      <NotSignIn setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
      <div className="bg-white p-8 shadow-md border rounded-md">
        <h2 className="text-lg font-semibold">Our Price</h2>
        <h2 className="text-3xl font-bold mt-2">{price}</h2>
        <Button
          className="w-full mt-5 flex items-center"
          onClick={handleMessage}
        >
          Make an Offer Price
          <FaTag className="h-3 w-3" />
        </Button>
      </div>

      <div className="bg-white p-8 shadow-md border rounded-md mt-4">
        <ul className=" flex flex-col gap-5">
          {Object.entries(carData)
            .filter(([key]) => key in iconMap)
            .map(([key, value]) => (
              <li key={key} className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-blue-600 bg-blue-100 p-1.5 rounded-full">
                    {iconMap[key as keyof typeof iconMap]}
                  </div>
                  <span className="capitalize">{key}</span>
                </div>
                <span>{value}</span>
              </li>
            ))}
        </ul>
      </div>

      <Owner carData={carData} />
    </div>
  );
}

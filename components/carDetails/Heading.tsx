import CarDetailsProps from "@/types/carDetails"
import React, { Fragment } from "react";
import { FaCalendarAlt, FaGasPump } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { TbBrandSpeedtest } from "react-icons/tb";

type HeadingProps = {
  carData: CarDetailsProps;
};

export default function Heading({carData}: HeadingProps) {
  return (
    <Fragment>
      <div>
        <h1 className="text-3xl font-semibold">{carData.listingTitle}</h1>
        <p className="mt-2">{carData.tagline}</p>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <div className="bg-blue-100 text-blue-500 flex text-center items-center gap-2 p-2 rounded-lg">
          <FaCalendarAlt />
          <span>{carData.year}</span>
        </div>
        <div className="bg-blue-100 text-blue-500 flex text-center items-center gap-2 p-2 rounded-lg">
          <TbBrandSpeedtest />
          <span>{carData.mileage.toLocaleString()} miles</span>
        </div>
        <div className="bg-blue-100 text-blue-500 flex text-center items-center gap-2 p-2 rounded-lg">
          <GiGearStickPattern />
          <span>{carData.transmission}</span>
        </div>
        <div className="bg-blue-100 text-blue-500 flex text-center items-center gap-2 p-2 rounded-lg">
          <FaGasPump />
          <span>{carData.fuelType}</span>
        </div>
      </div>
    </Fragment>
  );
}

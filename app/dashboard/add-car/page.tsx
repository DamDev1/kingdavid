"use client";
import Header from "@/components/shared/Header";
import React, { useState } from "react";
import carDetails from "@/lib/carDetails.json";
import InputForm from "@/components/addCar/inputForm";
import Dropdown from "@/components/addCar/dropdown";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import features from "@/lib/featuresData.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";
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
import { FaFileAlt } from "react-icons/fa";
import UploadImage from "@/components/addCar/UploadImage";

const iconMap = {
  FaClipboardList: <FaClipboardList />,
  FaTag: <FaTag />,
  FaDollarSign: <FaDollarSign />,
  FaMoneyBillAlt: <FaMoneyBillAlt />,
  FaCar: <FaCar />,
  FaCheckCircle: <FaCheckCircle />,
  FaChargingStation: <FaChargingStation />,
  FaIndustry: <FaIndustry />,
  FaCarSide: <FaCarSide />,
  FaCalendarAlt: <FaCalendarAlt />,
  FaRoad: <FaRoad />,
  FaCogs: <FaCogs />,
  FaGasPump: <FaGasPump />,
  FaTachometerAlt: <FaTachometerAlt />,
  FaWrench: <FaWrench />,
  FaCircle: <FaCircle />,
  FaPalette: <FaPalette />,
  FaDoorClosed: <FaDoorClosed />,
  FaIdCard: <FaIdCard />,
  FaTags: <FaTags />,
  FaFileAlt: <FaFileAlt />,
};

export default function AddCar() {
  const [formDetails, setFormDetails] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);
  const [featuresContainer, setFeaturesContainer] = useState<string[]>([]);

  const handleChange = (name: string, value: string) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleGetFeatures = (feature: string) => {
    setFeaturesContainer((prevFeatures) =>
      prevFeatures.includes(feature)
        ? prevFeatures.filter((f) => f !== feature) // Remove if already selected
        : [...prevFeatures, feature] // Add if not selected
    );

    console.log(featuresContainer.slice(0,10))
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formDetails,
        features: featuresContainer.slice(0), // Include features object
      };
      const res = await axios.post("/api/add-car", payload);
      console.log("Success:", res.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Car</h2>
        <form onSubmit={handleSubmit} className="mt-10 p-10 border rounded-xl">
          {/* Car Details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((detail, index) => (
                <div key={index}>
                  {detail.fieldType === "text" ||
                  detail.fieldType === "number" ? (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm flex gap-1.5 items-center">
                        <div className="text-blue-600 bg-blue-100 p-1.5 rounded-full">
                          {iconMap[detail?.icon as keyof typeof iconMap] && (
                            <span className="text-blue-600">
                              {iconMap[detail.icon as keyof typeof iconMap]}
                            </span>
                          )}
                        </div>
                        {detail.label}{" "}
                        {detail.required && (
                          <span className="text-red-600">*</span>
                        )}
                      </label>
                      <InputForm item={detail} handleChange={handleChange} />
                    </div>
                  ) : detail.fieldType === "dropdown" ? (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm flex gap-1.5 items-center">
                        <div className="text-blue-600 bg-blue-100 p-1.5 rounded-full">
                          {iconMap[detail?.icon as keyof typeof iconMap] && (
                            <span className="text-blue-600">
                              {iconMap[detail.icon as keyof typeof iconMap]}
                            </span>
                          )}
                        </div>
                        {detail.label}{" "}
                        {detail.required && (
                          <span className="text-red-600">*</span>
                        )}
                      </label>
                      <Dropdown item={detail} handleChange={handleChange} />
                    </div>
                  ) : detail.fieldType === "textarea" ? (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm flex gap-1.5 items-center">
                        <div className="text-blue-600 bg-blue-100 p-1.5 rounded-full">
                          {iconMap[detail?.icon as keyof typeof iconMap] && (
                            <span className="text-blue-600">
                              {iconMap[detail.icon as keyof typeof iconMap]}
                            </span>
                          )}
                        </div>
                        {detail.label}{" "}
                        {detail.required && (
                          <span className="text-red-600">*</span>
                        )}
                      </label>
                      <Textarea
                        onChange={(e) =>
                          handleChange(detail?.name, e.target.value)
                        }
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className="mt-10" />

          {/* Features Details */}
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {features.features.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    checked={featuresContainer.includes(feature.label)}
                    onCheckedChange={() => handleGetFeatures(feature.label)}
                  />

                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
          <Separator className="mt-10" />
          <UploadImage/>

          <div className="mt-10">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

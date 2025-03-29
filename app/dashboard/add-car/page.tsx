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

export default function AddCar() {
  const [formDetails, setFormDetails] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/add-car", formDetails);
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
                  {detail.fieldType === "text" || detail.fieldType === "number" ? (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm">
                        {detail.label} {detail.required && <span className="text-red-600">*</span>}
                      </label>
                      <InputForm item={detail} handleChange={handleChange} />
                    </div>
                  ) : detail.fieldType === "dropdown" ? (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm">
                        {detail.label} {detail.required && <span className="text-red-600">*</span>}
                      </label>
                      <Dropdown item={detail} handleChange={handleChange} />
                    </div>
                  ) : detail.fieldType === "textarea" ? (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm">
                        {detail.label} {detail.required && <span className="text-red-600">*</span>}
                      </label>
                      <Textarea onChange={(e) => handleChange(detail?.name, e.target.value)} />
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
                    onCheckedChange={(checked) => handleChange(feature?.name, checked ? "yes" : "no")}
                  />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

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

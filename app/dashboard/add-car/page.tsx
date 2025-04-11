// Optimized AddCar.tsx using React Hook Form
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Header from "@/components/shared/Header";
import carDetails from "@/lib/carDetails.json";
import features from "@/lib/featuresData.json";
import InputForm from "@/components/addCar/inputForm";
import Dropdown from "@/components/addCar/dropdown";
import UploadImage from "@/components/addCar/UploadImage";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import axios from "axios";

import * as Icons from "react-icons/fa";

export default function AddCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [featuresContainer, setFeaturesContainer] = useState<string[]>([]);
  const [selectedImageFile, setSelectedImageFile] = useState<File[]>([]);
  const [imagesLinks, setImagesLinks] = useState<string[]>([]);
  const router = useRouter();

  const handleGetFeatures = (feature: string) => {
    setFeaturesContainer((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    const isFormValid =
      Object.values(data).every((val) => val !== "" && val !== null) &&
      featuresContainer.length > 0;

    if (!isFormValid) {
      toast.error("Please fill all required fields and add features.");
      setLoading(false);
      return;
    }

    try {
      let uploadedUrls = imagesLinks;

      if (!uploadedUrls.length && selectedImageFile.length > 0) {
        const formData = new FormData();
        selectedImageFile.forEach((file) => formData.append("images", file));

        const res = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedUrls = res.data.imageUrls;
        setImagesLinks(uploadedUrls);
      }

      const payload = {
        ...data,
        features: featuresContainer,
        imageUrls: uploadedUrls,
      };

      await axios.post("/api/add-car", payload);
      toast.success("Car Added Successfully");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Car</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 p-10 border rounded-xl">
          {/* Car Details */}
          <h2 className="font-medium text-xl mb-6">Car Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {carDetails.carDetails.map((detail, index) => {
              const Icon = Icons[detail.icon as keyof typeof Icons];
              return (
                <div key={index} className="flex flex-col gap-2">
                  <label className="text-sm flex gap-1.5 items-center">
                    <span className="text-blue-600 bg-blue-100 p-1.5 rounded-full">
                      <Icon />
                    </span>
                    {detail.label} {detail.required && <span className="text-red-600">*</span>}
                  </label>

                  {detail.fieldType === "textarea" ? (
                    <Textarea {...register(detail.name, { required: detail.required })} />
                  ) : detail.fieldType === "dropdown" ? (
                    <Dropdown item={detail} handleChange={(name, value) => setValue(name, value)} />
                  ) : (
                    <InputForm item={detail} register={register} />
                  )}

                  {errors[detail.name] && (
                    <span className="text-red-500 text-xs">This field is required</span>
                  )}
                </div>
              );
            })}
          </div>

          <Separator className="mt-10" />

          {/* Features */}
          <h2 className="font-medium text-xl my-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {features.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Checkbox
                  checked={featuresContainer.includes(feature.label)}
                  onCheckedChange={() => handleGetFeatures(feature.label)}
                />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>

          <Separator className="mt-10" />
          <UploadImage selectedImageFile={selectedImageFile} setSelectedImageFile={setSelectedImageFile} />

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

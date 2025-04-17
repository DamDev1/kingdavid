'use client';
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import carDetails from "@/lib/carDetails.json";
import {
  FaCalendarAlt,
  FaCar,
  FaCarSide,
  FaChargingStation,
  FaCheckCircle,
  FaCircle,
  FaClipboardList,
  FaCogs,
  FaDollarSign,
  FaDoorClosed,
  FaFileAlt,
  FaGasPump,
  FaIdCard,
  FaIndustry,
  FaMoneyBillAlt,
  FaPalette,
  FaRoad,
  FaTachometerAlt,
  FaTag,
  FaTags,
  FaWrench,
} from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import features from "@/lib/featuresData.json";
import UploadEditImage from "@/components/editCar.jsx/UploadImage";
import { toast } from "react-toastify";
import InputForm from "@/components/editCar.jsx/inputForm";
import Dropdown from "@/components/editCar.jsx/dropdown";
import handlerError from "@/lib/errorHandler";
import { useDispatch } from "react-redux";

interface ICar {
  _id: string;
  imageUrls: string[];
  listingTitle: string;
  tagline: string;
  category: string;
  condition: string;
  make: string;
  carModel: string;
  year: string;
  driveType: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  engineSize: string;
  cylinder: string;
  color: string;
  sellingPrice: string;
  door: string;
  vin: string;
  offerType: string;
  listingDescription: string;
  features: string[];
}

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

export default function EditCar() {
  const params = useParams();
  const [carData, setCarData] = useState<ICar | null>(null);
  const [formDetails, setFormDetails] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [featuresContainer, setFeaturesContainer] = useState<string[]>([]);
  const [selectedImageFile, setSelectedImageFile] = useState<(File | string)[]>(
    []
  );
  const [imagesLinks, setImagesLinks] = useState<string[]>([]);
  const navigate = useRouter();
  const dispatch = useDispatch()

  const handleSingleCar = async () => {
    try {
      const res = await axios.get(`/api/single-car`, {
        params: { id: params.id },
      });
      setCarData(res.data.data);
    } catch (error) {
      const err = handlerError(error, navigate, dispatch);
      toast.error(`${err}`);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleGetFeatures = (feature: string) => {
    setFeaturesContainer(
      (prevFeatures) =>
        prevFeatures.includes(feature)
          ? prevFeatures.filter((f) => f !== feature) // Remove if already selected
          : [...prevFeatures, feature] // Add if not selected
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic form validation
    const isFormValid =
      Object.values(formDetails).every((val) => val !== "" && val !== null) &&
      featuresContainer.length > 0;

    if (!isFormValid) {
      toast.error("Please fill all required fields and add features.");
      setLoading(false);
      return;
    }

    try {
      let uploadedUrls = imagesLinks;

      // Upload only if no previous links exist
      if (!uploadedUrls || uploadedUrls.length === 0) {
        if (selectedImageFile.length === 0) {
          toast.error("Please select at least one image.");
          setLoading(false);
          return;
        }

        const formData = new FormData();

        selectedImageFile.forEach((file) => {
          formData.append("images", file);
        });

        const res = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        uploadedUrls = res.data.imageUrls;
        setImagesLinks(uploadedUrls);
      }

      // Proceed to submit the car form
      const payload = {
        ...formDetails,
        features: featuresContainer,
        imageUrls: uploadedUrls,
      };

      await axios.patch("/api/cars", payload, {
        params: { id: params.id },
      });
      toast.success("Car Added Successfully");
      navigate.push("/dashboard");
    } catch (error) {
      const err = handlerError(error, navigate, dispatch);
      toast.error(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSingleCar();
  }, []);

  useEffect(() => {
    if (carData) {
      const formDetails = Object.fromEntries(
        Object.keys(carData).map((key) => [key, (carData[key as keyof ICar] ?? "").toString()])
      );      
      setFormDetails(formDetails);
      setSelectedImageFile(carData.imageUrls);
      setFeaturesContainer(carData.features || []);
    }
  }, [carData]);
  return (
    <section>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Edit Car</h2>

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
                      <InputForm formDetails={formDetails} item={detail} handleChange={handleChange} />
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
                      <Dropdown item={detail} handleChange={handleChange}  formDetails={formDetails}/>
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
                      value={formDetails?.[detail?.name as keyof typeof formDetails]}
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
          <UploadEditImage
            setSelectedImageFile={setSelectedImageFile}
            selectedImageFile={selectedImageFile}
          />

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

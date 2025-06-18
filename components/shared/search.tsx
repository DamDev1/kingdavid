import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchProps {
  id: number;
  amount: number;
}

const CarMakes = [
  {
    id: 1,
    name: "Audi",
  },
  {
    id: 2,
    name: "BMW",
  },
  {
    id: 3,
    name: "Chevrolet",
  },
  {
    id: 4,
    name: "Ferrari",
  },
  {
    id: 5,
    name: "Ford",
  },
  {
    id: 6,
    name: "Honda",
  },
  {
    id: 7,
    name: "Hyundai",
  },
  {
    id: 8,
    name: "Jaguar",
  },
  {
    id: 9,
    name: "Lamborghini",
  },
  {
    id: 10,
    name: "Land Rover",
  },
  {
    id: 11,
    name: "Lexus",
  },
  {
    id: 12,
    name: "Mazda",
  },
  {
    id: 13,
    name: "Mercedes-Benz",
  },
  {
    id: 14,
    name: "Nissan",
  },
  {
    id: 15,
    name: "Porsche",
  },
  {
    id: 16,
    name: "Subaru",
  },
  {
    id: 17,
    name: "Tesla",
  },
  {
    id: 18,
    name: "Toyota",
  },
  {
    id: 19,
    name: "Volkswagen",
  },
  {
    id: 20,
    name: "Volvo",
  },
];

const Pricing = [
  {
    id: 1,
    amount: 1000,
  },
  {
    id: 2,
    amount: 2000,
  },
  {
    id: 3,
    amount: 5000,
  },
  {
    id: 4,
    amount: 10000,
  },
];

const MaxPricing = [
  {
    id: 1,
    amount: 50000,
  },
  {
    id: 2,
    amount: 60000,
  },
  {
    id: 3,
    amount: 70000,
  },
  {
    id: 4,
    amount: 100000,
  },
];

export default function SearchCar() {
  const [car, setCar] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [make, setMake] = useState("");

  const route = useRouter();
  return (
    <div className="flex items-center p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex-row max-md:gap-3 gap-10 px-5 w-[70%] max-md:w-full">
      <Select onValueChange={(value) => setCar(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shawdow-none text-lg">
          <SelectValue placeholder="Car" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Used">Used</SelectItem>
          <SelectItem value="New">New</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shawdow-none text-lg">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {CarMakes.map((make) => (
            <SelectItem key={make.id} value={make.name}>
              {make.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setMinPrice(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shawdow-none text-lg">
          <SelectValue placeholder="Min Price" />
        </SelectTrigger>
        <SelectContent>
          {Pricing.map((price: SearchProps) => (
            <SelectItem key={price.id} value={`${price.amount}`}>
              {price.amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setMaxPrice(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shawdow-none text-lg">
          <SelectValue placeholder="Max Price" />
        </SelectTrigger>
        <SelectContent>
          {MaxPricing.map((price: SearchProps) => (
            <SelectItem key={price.id} value={`${price.amount}`}>
              {price.amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div
        className="bg-blue-600 font-medium hover:scale-105 transition-all cursor-pointer p-2 rounded-full flex items-center justify-center"
        onClick={() =>
          route.push(`/search?car=${car}&make=${make}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
        }
      >
        <SearchIcon className="text-white" />
      </div>
    </div>
  );
}

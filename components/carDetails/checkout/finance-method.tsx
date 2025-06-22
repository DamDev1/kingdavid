import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function FinanceMethod() {
  return (
    <div className="mt-4">
      <h1 className="text-xl font-semibold">Personal Information</h1>
      <div className="grid grid-cols-2 gap-5 mt-4 max-md:grid-cols-1">
        <div>
          <Label>First Name</Label>
          <Input className="mt-2" type="text" placeholder="John" />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input className="mt-2" type="text" placeholder="Doe" />
        </div>
        <div>
          <Label>Email</Label>
          <Input className="mt-2" type="email" placeholder="john@example.com" />
        </div>
        <div>
          <Label>Phone Number</Label>
          <Input className="mt-2" type="tel" placeholder="(555) 123-4567" />
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Input className="mt-2" type="date" />
        </div>
        <div>
          <Label>Social Security Number</Label>
          <Input className="mt-2" type="text" placeholder="123-45-6789" />
        </div>
        <div>
          <Label>Driver’s License Number</Label>
          <Input className="mt-2" type="text" />
        </div>
        <div>
          <Label>State of Issuance</Label>
          <Input className="mt-2" type="text" placeholder="CA" />
        </div>
      </div>

      {/* 2. Residence Info */}
      <h1 className="text-xl font-semibold mt-5">Residence Info</h1>
      <div className="grid grid-cols-2 gap-5 mt-4 max-md:grid-cols-1">
        <div className="col-span-2">
          <Label>Street Address</Label>
          <Input className="mt-2" type="text" placeholder="123 Main St" />
        </div>
        <div>
          <Label>City</Label>
          <Input className="mt-2" type="text" />
        </div>
        <div>
          <Label>State</Label>
          <Input className="mt-2" type="text" />
        </div>
        <div>
          <Label>ZIP Code</Label>
          <Input className="mt-2" type="text" placeholder="90210" />
        </div>
        <div>
          <Label>Do you rent or own?</Label>
          <select className="mt-2 w-full border rounded px-2 py-1">
            <option value="rent">Rent</option>
            <option value="own">Own</option>
          </select>
        </div>
        <div>
          <Label>Monthly Rent / Mortgage</Label>
          <Input className="mt-2" type="number" placeholder="$1,200" />
        </div>
        <div>
          <Label>Time at Current Address</Label>
          <Input className="mt-2" type="text" placeholder="2 years" />
        </div>
        <div className="col-span-2">
          <Label>Previous Address (if {"<"} 2 years)</Label>
          <Input className="mt-2" type="text" />
        </div>
      </div>

      {/* 3. Employment Info */}
      <h1 className="text-xl font-semibold mt-5">Employment Info</h1>
      <div className="grid grid-cols-2 gap-5 mt-4 max-md:grid-cols-1">
        <div>
          <Label>Employment Status</Label>
          <select className="mt-2 w-full border rounded px-2 py-1">
            <option>Employed</option>
            <option>Self-employed</option>
            <option>Student</option>
            <option>Unemployed</option>
          </select>
        </div>
        <div>
          <Label>Employer Name</Label>
          <Input className="mt-2" type="text" />
        </div>
        <div>
          <Label>Employer Phone</Label>
          <Input className="mt-2" type="tel" />
        </div>
        <div>
          <Label>Job Title</Label>
          <Input className="mt-2" type="text" />
        </div>
        <div>
          <Label>Time at Employer</Label>
          <Input className="mt-2" type="text" placeholder="3 years" />
        </div>
        <div>
          <Label>Gross Monthly Income</Label>
          <Input className="mt-2" type="number" placeholder="$4,000" />
        </div>
        <div>
          <Label>Other Sources of Income?</Label>
          <select className="mt-2 w-full border rounded px-2 py-1">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="col-span-2">
          <Label>Describe Additional Income</Label>
          <Textarea
            className="mt-2"
            placeholder="e.g., freelance work, rental income"
          />
        </div>
      </div>

      {/* 4. Co-Buyer Info */}
      <h1 className="text-xl font-semibold mt-5"> Co-Buyer Info</h1>
      <div className="grid grid-cols-2 gap-5 mt-4 max-md:grid-cols-1">
        <div>
          <Label>Add a Co-Buyer?</Label>
          <select className="mt-2 w-full border rounded px-2 py-1">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div>
          <Label>Co-Buyer Full Name</Label>
          <Input className="mt-2" type="text" />
        </div>
        <div>
          <Label>Relationship</Label>
          <Input
            className="mt-2"
            type="text"
            placeholder="Spouse, Parent, etc."
          />
        </div>
        <div>
          <Label>Co-Buyer Email</Label>
          <Input className="mt-2" type="email" />
        </div>
        <div>
          <Label>Co-Buyer Employment Status</Label>
          <Input className="mt-2" type="text" />
        </div>
      </div>

      {/* 5. Desired Car Info */}
      <h1 className="text-xl font-semibold mt-5"> Co-Buyer Info</h1>
      <div className="grid grid-cols-2 gap-5 mt-4 max-md:grid-cols-1">
        <div className="col-span-2">
          <Label>Are you purchasing from our inventory?</Label>
          <select className="mt-2 w-full border rounded px-2 py-1">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <Label>Desired Make & Model</Label>
          <Input className="mt-2" type="text" placeholder="Toyota Camry" />
        </div>
        <div>
          <Label>Preferred Year Range</Label>
          <Input className="mt-2" type="text" placeholder="2018-2022" />
        </div>
        <div>
          <Label>Budget Range</Label>
          <Input className="mt-2" type="text" placeholder="$20,000-$25,000" />
        </div>
      </div>

      {/* 6. Trade-in Vehicle */}
      <h1 className="text-xl font-semibold mt-5"> Co-Buyer Info</h1>
      <div className="grid grid-cols-2 gap-5 mt-4 max-md:grid-cols-1">
        <div className="col-span-2">
          <Label>Are you purchasing from our inventory?</Label>
          <select className="mt-2 w-full border rounded px-2 py-1">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <Label>Desired Make & Model</Label>
          <Input className="mt-2" type="text" placeholder="Toyota Camry" />
        </div>
        <div>
          <Label>Preferred Year Range</Label>
          <Input className="mt-2" type="text" placeholder="2018-2022" />
        </div>
        <div>
          <Label>Budget Range</Label>
          <Input className="mt-2" type="text" placeholder="$20,000-$25,000" />
        </div>
      </div>
      

      {/* 7. Financing Info */}
      <h1 className="text-xl font-semibold mt-5"> Co-Buyer Info</h1>
      <div className="grid grid-cols-2 gap-5 mt-4 max-md:grid-cols-1">
        <div className="col-span-2">
          <Label>Are you purchasing from our inventory?</Label>
          <select className="mt-2 w-full border rounded px-2 py-1">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <Label>Desired Make & Model</Label>
          <Input className="mt-2" type="text" placeholder="Toyota Camry" />
        </div>
        <div>
          <Label>Preferred Year Range</Label>
          <Input className="mt-2" type="text" placeholder="2018-2022" />
        </div>
        <div>
          <Label>Budget Range</Label>
          <Input className="mt-2" type="text" placeholder="$20,000-$25,000" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="mt-5">Apply for finance</Button>
      </div>
    </div>
  );
}

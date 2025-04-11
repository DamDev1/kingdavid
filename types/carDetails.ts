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

export default CarDetailsProps
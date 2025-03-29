import React from "react";

export default function Category() {
  const Category = [
    {
      id: 1,
      name: "SUV",
      icon: "https://cdn-icons-png.flaticon.com/128/13584/13584003.png",
    },
    {
      id: 2,
      name: "Sedan",
      icon: "https://cdn-icons-png.flaticon.com/128/3202/3202003.png",
    },
    {
      id: 3,
      name: "Hatchback",
      icon: "https://cdn-icons-png.flaticon.com/128/5035/5035167.png",
    },
    {
      id: 4,
      name: "Electric",
      icon: "https://cdn-icons-png.flaticon.com/128/4564/4564336.png",
    },
    {
      id: 5,
      name: "Convertible",
      icon: "https://cdn-icons-png.flaticon.com/128/5035/5035202.png",
    },
    {
      id: 6,
      name: "Hybrid",
      icon: "https://cdn-icons-png.flaticon.com/128/3202/3202003.png",
    },
    {
      id: 7,
      name: "Coupe",
      icon: "https://cdn-icons-png.flaticon.com/128/4391/4391630.png",
    },
    {
      id: 8,
      name: "Van",
      icon: "https://cdn-icons-png.flaticon.com/128/1433/1433678.png",
    },
    {
      id: 9,
      name: "Truck",
      icon: "https://cdn-icons-png.flaticon.com/128/5814/5814855.png",
    },
  ];
  return (
    <section className="mt-40">
      <h1 className="text-3xl font-bold text-center mb-16">Browse By Type</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20 max-md:px-5">
        {Category.map((type) => (
          <div key={type.id} className="border rounded-xl p-3 items-center flex flex-col hover:shadow-md cursor-pointer">
            <img width={35} height={35} src={type.icon} alt={type.name} />
            <h1 className="mt-2">{type.name}</h1>
          </div>
        ))}
      </div>
    </section>
  );
}

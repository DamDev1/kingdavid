import React from "react";
import { Button } from "../ui/button";
import Logo from "./logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-5 flex justify-between items-center shadow-sm">
      <Logo />
      <nav className="md:flex gap-10 list-none hidden ">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-blue-600">
          Home
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-blue-600">
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-blue-600">
          Contact
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-blue-600">
          Win a car
        </li>
      </nav>
     <Link href={'/login'}><Button>Sign in</Button></Link>
    </header>
  );
}

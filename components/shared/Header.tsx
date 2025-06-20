import React, { Fragment } from "react";
import { Button } from "../ui/button";
import Logo from "./logo";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";

export default function Header() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");


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
      <div className="flex gap-2.5 items-center">
        {userInfo && !isDashboard ? (
          isDashboard ? (
            <Link href="/">
              <Button>Home</Button>
            </Link>
          ) : (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          )
        ) : (
          <Fragment>
            <Link href={"/login"}>
              <Button variant={"outline"}>Login</Button>
            </Link>
            <Link href={"/signup"}>
              <Button>Sign up</Button>
            </Link>
          </Fragment>
        )}
      </div>
    </header>
  );
}

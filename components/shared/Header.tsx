import React, { Fragment } from "react";
import { Button } from "../ui/button";
import Logo from "./logo";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { clearCredentials } from "@/slice/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(clearCredentials())
    toast.success("Logout successful");
    navigate.push('/login');
  };

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
        {userInfo ? (
          isDashboard ? (
            <div className="flex gap-2">
              <Link href="/">
                <Button>Home</Button>
              </Link>
              <Button onClick={handleLogin} variant={'destructive'}>Logout</Button>
            </div>
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

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCredentials } from "@/slice/authSlice";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const userInfo = useSelector((state: any) => state.auth.userInfo);

  if (userInfo) {
    navigate.push("/dashboard");
  }


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/login", { email, password });
      dispatch(setCredentials(res.data));
      toast.success("Login successful");
      if (res.data.user.role === "admin") {
        navigate.push("/dashboard");
      }else{
        navigate.push("/");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  }
  return (
    <form onSubmit={(e) => handleLogin(e)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          {isLoading ? <Loader2Icon className="animate-spin"/> : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}

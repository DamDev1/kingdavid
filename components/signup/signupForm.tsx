import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import handlerError from "@/lib/errorHandler";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/sign-up", {
        firstName,
        lastName,
        email,
        password,
        role: "user",
      });
      toast.success("Sign up successful!");
      navigate.push("/login");
      setIsLoading(false);
    } catch (error) {
      const err = handlerError(error, navigate, dispatch);
      toast.error(`${err}`);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstname">Firstname</Label>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            id="firstname"
            type="text"
            placeholder="John"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastname">Lastname</Label>
          <Input
            onChange={(e) => setLastName(e.target.value)}
            id="lastname"
            type="text"
            placeholder="Deo"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {isLoading ? <Loader2Icon className="animate-spin" /> : "Signup"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}

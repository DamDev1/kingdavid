import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../shared/logo";
import React, { useState } from "react";
import useOtpVerification from "@/hooks/useOtpVerification";
import { useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import useResendOtp from "@/hooks/useResendOtp";

export function VerifyOtpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [code, setCode] = React.useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const [step, setStep] = useState(2);


  const { verifyOtp, isLoading, } = useOtpVerification({
    debug: true,
    onSuccess: (response) => {
      console.log("OTP verified successfully!", response);
      // Handle successful verification (e.g., redirect user)
    },
    onError: (error) => {
      console.error("OTP verification failed:", error);
      // Handle error (e.g., show error message)
    },
  });

  const { resendOtp, isLoading: isResending } = useResendOtp({
    debug: true, // Enable debug logging
    onSuccess: (response) => {
      return response;
    },
    onError: (error) => {
      return error;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await verifyOtp(code, email);
    console.log(result)
  };

  const handleResend = async () => {
    if (!email) return;
    const result = await resendOtp(email);
    if (result.message) {
      setStep(2);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {step === 1 ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-5">
            <div className='mb-10'>
              <Logo/>
            </div>
            <h1 className="text-xl font-bold">Verify your account</h1>
            <div className="text-center text-sm">
              Otp has been sent your gmail. Please enter the otp below.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Button onClick={handleResend}>
              {isResending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Send Code"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Logo />
              <h1 className="text-xl font-bold">Verify your account</h1>
              <div className="text-center text-sm">
                Otp has been sent your gmail. Please enter the otp below.
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="otp">Code</Label>
                <Input
                  id="otp"
                  type="number"
                  required
                  className="text-center"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Verify Otp"
                )}
              </Button>
              <div onClick={handleResend} className="text-center text-sm -mt-3 cursor-pointer hover:text-blue-600">
                {isResending ? "resending..." :"resend otp?"}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

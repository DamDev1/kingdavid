import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function NotSignIn({isSignedIn, setIsSignedIn}:{isSignedIn: boolean, setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>}) {
    const navigate = useRouter();
  return (
    <AlertDialog open={isSignedIn}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be signed in to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsSignedIn(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => navigate.push("/login")}>Sign in</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

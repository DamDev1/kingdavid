import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
//   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { useState } from "react"

export function MessageModal({isOpen, setIsOpen, carName}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void, carName: string}) {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = `Hello, my name is ${name}. I'm interested in this vehicle: ${carName}.\n\n${message}`;        
        const url = `https://wa.me/+2349134422903?text=${text}`
        window.open(url, "_blank");
        setIsOpen(false);
    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={handleSubmit}>
        {/* <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsOpen(true)}>Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Message Owner</DialogTitle>
            <DialogDescription>
              Send a message to the owner of the car.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Car Name</Label>
              <Input id="name-1" name="name" defaultValue={carName} disabled />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Message</Label>
              <Textarea id="username-1" name="username" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!name || !message} onClick={() => handleSubmit}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

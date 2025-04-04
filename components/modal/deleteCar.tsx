import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2Icon } from "lucide-react";

export default function DeleteCarModal({
  isDeleteModal,
  carId,
  handleGetCars,
  setIsDeleteModal,
}: {
  handleGetCars: () => void;
  isDeleteModal: boolean;
  setIsDeleteModal: (value: boolean) => void;
  carId: string;
}) {
  const [isloading, setIsLoading] = React.useState(false);
  const handleDeleteCar = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/cars`, {
        params: {
          id: carId,
        },
      });
      toast.success("Successfully deleted cars");
      setTimeout(() => {
        setIsDeleteModal(false);
        setIsLoading(false);
        handleGetCars();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to delete cars");
      console.log(error);
    }
  };
  return (
    <Dialog open={isDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Once you click on delete this car will be deleted from the website
            <div className="mt-10 flex gap-2">
              <Button
                className="w-[50%]"
                variant="outline"
                onClick={() => setIsDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-[50%]"
                variant="destructive"
                onClick={handleDeleteCar}
              >
                {isloading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

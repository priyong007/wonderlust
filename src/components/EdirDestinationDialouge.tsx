"use client";

import * as React from "react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Pencil } from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type DestinationFormData = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type EditDestinationDialogueProps = {
  destination: DestinationFormData & { _id: string };
};

const EditDestinationDialogue = ({
  destination,
}: EditDestinationDialogueProps) => {
    console.log(destination);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<DestinationFormData>({
    destinationName: destination.destinationName,
    country: destination.country,
    category: destination.category,
    price: String(destination.price),
    duration: destination.duration,
    departureDate: destination.departureDate?.slice(0, 10) ?? "",
    imageUrl: destination.imageUrl,
    description: destination.description,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (name: string, value: string) => {
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleCancel = () => {
    setFormData({
      destinationName: destination.destinationName,
      country: destination.country,
      category: destination.category,
      price: String(destination.price),
      duration: destination.duration,
      departureDate: destination.departureDate?.slice(0, 10) ?? "",
      imageUrl: destination.imageUrl,
      description: destination.description,
    });

    setErrors({});
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!formData.destinationName.trim())
      nextErrors.destinationName = "Destination name is required.";

    if (!formData.country.trim())
      nextErrors.country = "Country is required.";

    if (!formData.category)
      nextErrors.category = "Please select a category.";

    if (!formData.price.trim() || Number(formData.price) <= 0)
      nextErrors.price = "Enter a valid price.";

    if (!formData.duration.trim())
      nextErrors.duration = "Duration is required.";

    if (!formData.departureDate)
      nextErrors.departureDate = "Departure date is required.";

    if (!formData.imageUrl.trim())
      nextErrors.imageUrl = "Image URL is required.";

    if (!formData.description.trim())
      nextErrors.description = "Description is required.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const token = await getTokenFromClient()

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update destination.");
      }

      alert("Destination updated successfully!");
      setOpen(false);

      // Refresh the page data after a successful update.
      window.location.reload();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update destination. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "h-9 rounded-none border-0 bg-slate-50 px-2 text-[12px] shadow-none placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-cyan-500";

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (nextOpen) {
          setFormData({
            destinationName: destination.destinationName,
            country: destination.country,
            category: destination.category,
            price: String(destination.price),
            duration: destination.duration,
            departureDate: destination.departureDate?.slice(0, 10) ?? "",
            imageUrl: destination.imageUrl,
            description: destination.description,
          });

          setErrors({});
        }
      }}
    >
      <DialogTrigger>
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 rounded-none px-4 py-2 text-xs"
        >
          <Pencil size={13} />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Edit Destination
          </DialogTitle>

          <DialogDescription className="text-xs text-slate-500">
            Update the destination details below.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="w-full border border-slate-100 bg-white px-4 pb-4 pt-4 shadow-[0_2px_2px_rgba(0,0,0,0.12)]"
        >
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="destinationName" className="text-[9px] font-medium">
                Destination Name
              </Label>

              <Input
                id="destinationName"
                value={formData.destinationName}
                onChange={(e) =>
                  updateField("destinationName", e.target.value)
                }
                placeholder="Bali Paradise"
                className={fieldClass}
              />

              {errors.destinationName && (
                <p className="text-[10px] text-red-500">
                  {errors.destinationName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="country" className="text-[9px] font-medium">
                  Country
                </Label>

                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  placeholder="Indonesia"
                  className={fieldClass}
                />

                {errors.country && (
                  <p className="text-[10px] text-red-500">
                    {errors.country}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="category" className="text-[9px] font-medium">
                  Category
                </Label>

                <Select
                  value={formData.category}
                  onValueChange={(value) => updateField("category", value ?? "")}
                >
                  <SelectTrigger id="category" className={fieldClass}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="beach">Beach</SelectItem>
                    <SelectItem value="mountain">Mountain</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                  </SelectContent>
                </Select>

                {errors.category && (
                  <p className="text-[10px] text-red-500">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="price" className="text-[9px] font-medium">
                  Price (USD)
                </Label>

                <Input
                  id="price"
                  type="number"
                  min="1"
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="e.g., 1299"
                  className={fieldClass}
                />

                {errors.price && (
                  <p className="text-[10px] text-red-500">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="duration" className="text-[9px] font-medium">
                  Duration
                </Label>

                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  placeholder="e.g., 7 Days/6 Nights"
                  className={fieldClass}
                />

                {errors.duration && (
                  <p className="text-[10px] text-red-500">
                    {errors.duration}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="departureDate" className="text-[9px] font-medium">
                Departure Date
              </Label>

              <Input
                id="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={(e) =>
                  updateField("departureDate", e.target.value)
                }
                className={fieldClass}
              />

              {errors.departureDate && (
                <p className="text-[10px] text-red-500">
                  {errors.departureDate}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="imageUrl" className="text-[9px] font-medium">
                Image URL
              </Label>

              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => updateField("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={fieldClass}
              />

              {errors.imageUrl && (
                <p className="text-[10px] text-red-500">
                  {errors.imageUrl}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-[9px] font-medium">
                Description
              </Label>

              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe the travel experience..."
                className="min-h-16 resize-y rounded-none border-0 bg-slate-50 px-2 py-2 text-[12px] shadow-none placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-cyan-500"
              />

              {errors.description && (
                <p className="text-[10px] text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="h-7 rounded-none border-red-300 px-3 text-[10px] font-normal text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-7 rounded-none bg-cyan-600 px-3 text-[10px] font-normal text-white hover:bg-cyan-700"
            >
              {isSubmitting ? "Updating..." : "Update Destination"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialogue;
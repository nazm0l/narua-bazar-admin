"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IEvent } from "@/lib/events.interface";
import { useState } from "react";
import { ImageUpload } from "./image-upload";

interface AddEventDialogProps {
  onAddEvent: (event: IEvent) => void;
}

export function AddEventDialog({ onAddEvent }: AddEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    date: "",
    time: "",
    location: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.imgUrl ||
        !formData.date ||
        !formData.time ||
        !formData.location
      ) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add event");
      }

      const createdEvent = await response.json();
      onAddEvent(createdEvent);

      setFormData({
        title: "",
        description: "",
        imgUrl: "",
        date: "",
        time: "",
        location: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
      alert(error instanceof Error ? error.message : "Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Create a new event for Narua Bazar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Event title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Event description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imgUrl">Image URL</Label>
            <ImageUpload
              onUpload={(url) =>
                setFormData((prev) => ({ ...prev, imgUrl: url }))
              }
              value={formData.imgUrl}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Event location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding Event..." : "Add Event"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { INews } from "@/lib/news.interface";
import { useState } from "react";
import { ImageUpload } from "./image-upload";

interface AddNewsDialogProps {
  onAddNews: (news: INews) => void;
}

export function AddNewsDialog({ onAddNews }: AddNewsDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgUrl: "",
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
      if (!formData.title || !formData.description || !formData.imgUrl) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add news");
      }

      const createdNews = await response.json();
      onAddNews(createdNews);

      setFormData({
        title: "",
        description: "",
        imgUrl: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding news:", error);
      alert(error instanceof Error ? error.message : "Failed to add news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add News</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New News Article</DialogTitle>
          <DialogDescription>
            Create a new news article for Narua Bazar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="News title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="News description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <ImageUpload
            label="News Image"
            value={formData.imgUrl}
            onUpload={(url) =>
              setFormData((prev) => ({ ...prev, imgUrl: url }))
            }
          />
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 cursor-pointer"
            >
              {loading ? "Adding..." : "Add News"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

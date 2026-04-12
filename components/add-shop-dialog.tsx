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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IShop } from "@/lib/shop.interface";
import { useState } from "react";
import { ImageUpload } from "./image-upload";

interface AddShopDialogProps {
  onAddShop: (shop: IShop) => void;
}

export function AddShopDialog({ onAddShop }: AddShopDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "মুদিখানা",
    address: "",
    phoneNumber: "",
    ownerName: "",
    imageUrl: "",
    website: "",
    isOpen: true,
    isVerified: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.name ||
        !formData.description ||
        !formData.ownerName ||
        !formData.address
      ) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/shops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("AddShopDialog: response status", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("AddShopDialog: error response", errorData);
        throw new Error(errorData.message || "Failed to add shop");
      }

      const createdShop = await response.json();
      console.log("AddShopDialog: created shop", createdShop);
      onAddShop(createdShop);

      setFormData({
        name: "",
        description: "",
        category: "মুদিখানা",
        address: "",
        phoneNumber: "",
        ownerName: "",
        imageUrl: "",
        website: "",
        isOpen: true,
        isVerified: false,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding shop:", error);
      alert("Failed to add shop. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Shop</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Shop</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new shop to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Shop Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter shop name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="মুদিখানা">মুদিখানা</SelectItem>
                <SelectItem value="হোটেল">হোটেল</SelectItem>
                <SelectItem value="মাংসের দোকান">মাংসের দোকান</SelectItem>
                <SelectItem value="চায়ের দোকান">চায়ের দোকান</SelectItem>
                <SelectItem value="ফার্মেসী">ফার্মেসী</SelectItem>
                <SelectItem value="ফলের দোকান">ফলের দোকান</SelectItem>
                <SelectItem value="মিষ্টির দোকান">মিষ্টির দোকান</SelectItem>
                <SelectItem value="আসবাবপত্র">আসবাবপত্র</SelectItem>
                <SelectItem value="টেইলার্স">টেইলার্স</SelectItem>
                <SelectItem value="সেলুন">সেলুন</SelectItem>
                <SelectItem value="মেরামতকারী দোকান">
                  মেরামতকারী দোকান
                </SelectItem>
                <SelectItem value="প্রসাধনী">প্রসাধনী</SelectItem>
                <SelectItem value="ফ্লেক্সিলোড ও বিকাশ">
                  ফ্লেক্সিলোড ও বিকাশ
                </SelectItem>
                <SelectItem value="মাছ ও মাংস">মাছ ও মাংস</SelectItem>
                <SelectItem value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</SelectItem>
                <SelectItem value="হার্ডওয়্যার">হার্ডওয়্যার</SelectItem>
                <SelectItem value="পোশাকের দোকান">পোশাকের দোকান</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter shop description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="ownerName">Owner Name *</Label>
            <Input
              id="ownerName"
              name="ownerName"
              placeholder="Enter owner name"
              value={formData.ownerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter shop address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              placeholder="Enter website URL"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>

          <ImageUpload
            label="Shop Image"
            value={formData.imageUrl}
            onUpload={(url) =>
              setFormData((prev) => ({ ...prev, imageUrl: url }))
            }
          />

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Shop"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

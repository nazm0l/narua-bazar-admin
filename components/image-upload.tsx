"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
  label?: string;
}

export function ImageUpload({ onUpload, value, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/v1/upload/image", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        onUpload(result.data.secure_url);
      } else {
        console.error("Upload Error:", result);
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && (
        <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
      )}
      {value && (
        <img
          src={value}
          alt="Preview"
          className="w-full h-32 object-cover rounded mt-2"
        />
      )}
    </div>
  );
}

"use client";

import { DataTable } from "@/components/table/data-table";
import { IShop } from "@/lib/shop.interface";
import { useEffect, useState } from "react";
import { columns } from "./columns";

export default function ShopsPage() {
  const [shops, setShops] = useState<IShop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch("/api/shops", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch shops");
        const data = await res.json();
        setShops(data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleAddShop = (newShop: IShop) => {
    setShops((prevShops) => [newShop, ...prevShops]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        Loading shops...
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={shops} onAddItem={handleAddShop} />
    </div>
  );
}

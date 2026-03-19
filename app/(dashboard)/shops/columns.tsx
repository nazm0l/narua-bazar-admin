"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IShop } from "@/lib/shop.interface";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, EllipsisVerticalIcon, XCircle } from "lucide-react";

export const columns: ColumnDef<IShop>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Shop Name",
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.name}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "ownerName",
    header: "Owner",
    cell: ({ row }) => row.original.ownerName,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.address}
      </span>
    ),
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.isVerified ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "isOpen",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.isOpen ? "default" : "secondary"}
        className={row.original.isOpen ? "bg-green-500" : ""}
      >
        {row.original.isOpen ? "Open" : "Closed"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <EllipsisVerticalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>View Products</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              try {
                const response = await fetch(`/api/shops/${row.original._id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ isVerified: !row.original.isVerified }),
                });
                if (!response.ok) throw new Error("Failed to update shop");
                window.location.reload(); // Quick way to refresh
              } catch (error) {
                console.error("Error updating shop:", error);
                alert("Failed to update shop");
              }
            }}
          >
            {row.original.isVerified ? "Unverify" : "Verify"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this shop?")) {
                try {
                  const response = await fetch(`/api/shops/${row.original._id}`, {
                    method: "DELETE",
                  });
                  if (!response.ok) throw new Error("Failed to delete shop");
                  window.location.reload(); // Quick way to refresh
                } catch (error) {
                  console.error("Error deleting shop:", error);
                  alert("Failed to delete shop");
                }
              }
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

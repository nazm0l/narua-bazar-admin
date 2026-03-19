"use client";

import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { AddEventDialog } from "../add-event-dialog";
import { AddNewsDialog } from "../add-news-dialog";
import { AddShopDialog } from "../add-shop-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

const verificationStatus = [
  { label: "Verified", value: "true" },
  { label: "Unverified", value: "false" },
];

const shopStatus = [
  { label: "Open", value: "true" },
  { label: "Closed", value: "false" },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onAddItem?: (item: TData) => void;
}

export function DataTableToolbar<TData>({
  table,
  onAddItem,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isShopTable = table.getColumn("name") !== undefined;
  const isNewsTable =
    table.getColumn("title") !== undefined &&
    table.getColumn("description") !== undefined;
  const isEventTable = table.getColumn("date") !== undefined;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder={
            isShopTable
              ? "Filter shops by name..."
              : isNewsTable
                ? "Filter by title..."
                : "Filter by title..."
          }
          value={
            (table
              .getColumn(isShopTable ? "name" : "title")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(isShopTable ? "name" : "title")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={[
              { label: "মুদিখানা", value: "মুদিখানা" },
              { label: "হোটেল", value: "হোটেল" },
              { label: "মাংসের দোকান", value: "মাংসের দোকান" },
              { label: "চায়ের দোকান", value: "চায়ের দোকান" },
              { label: "ফার্মেসী", value: "ফার্মেসী" },
              { label: "ফলের দোকান", value: "ফলের দোকান" },
              { label: "মিষ্টির দোকান", value: "মিষ্টির দোকান" },
              { label: "আসবাবপত্র", value: "আসবাবপত্র" },
              { label: "টেইলার্স", value: "টেইলার্স" },
              { label: "সেলুন", value: "সেলুন" },
              { label: "মেরামতকারী দোকান", value: "মেরামতকারী দোকান" },
              { label: "প্রসাধনী", value: "প্রসাধনী" },
              { label: "ফ্লেক্সিলোড ও বিকাশ", value: "ফ্লেক্সিলোড ও বিকাশ" },
              { label: "মাছ ও মাংস", value: "মাছ ও মাংস" },
              { label: "ইলেকট্রনিক্স", value: "ইলেকট্রনিক্স" },
              { label: "হার্ডওয়্যার", value: "হার্ডওয়্যার" },
              { label: "পোশাকের দোকান", value: "পোশাকের দোকান" },
            ]}
          />
        )}
        {table.getColumn("isVerified") && (
          <DataTableFacetedFilter
            column={table.getColumn("isVerified")}
            title="Verification"
            options={verificationStatus}
          />
        )}
        {table.getColumn("isOpen") && (
          <DataTableFacetedFilter
            column={table.getColumn("isOpen")}
            title="Status"
            options={shopStatus}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        {onAddItem && isShopTable && (
          <AddShopDialog onAddShop={onAddItem as any} />
        )}
        {onAddItem && isNewsTable && (
          <AddNewsDialog onAddNews={onAddItem as any} />
        )}
        {onAddItem && isEventTable && (
          <AddEventDialog onAddEvent={onAddItem as any} />
        )}
      </div>
    </div>
  );
}

import { SectionCards } from "@/components/section-cards";
import { DataTable } from "@/components/table/data-table";

import data from "../../dashboardh/data.json";
export default function ShopsPage() {
  return (
    <div>
      <SectionCards />
      <DataTable data={data} />
    </div>
  );
}

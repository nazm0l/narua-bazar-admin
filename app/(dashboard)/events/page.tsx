"use client";

import { DataTable } from "@/components/table/data-table";
import { IEvent } from "@/lib/events.interface";
import { useEffect, useState } from "react";
import { columns } from "./columns";

export default function EventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = (newEvent: IEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        Loading events...
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={events} onAddItem={handleAddEvent} />
    </div>
  );
}

"use client";

import { DataTable } from "@/components/table/data-table";
import { INews } from "@/lib/news.interface";
import { useEffect, useState } from "react";
import { columns } from "./columns";

export default function NewsPage() {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleAddNews = (newNews: INews) => {
    setNews((prevNews) => [newNews, ...prevNews]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        Loading news...
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={news} onAddItem={handleAddNews} />
    </div>
  );
}

import { useState, useMemo } from "react";
import type { Report, ReportCategory } from "../types";

export const useFiltering = (reports: Report[]) => {
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | "all">("all");

  const filteredReports = useMemo(() => {
    return reports.filter(
      (report) =>
        selectedCategory === "all" || report.category === selectedCategory
    );
  }, [reports, selectedCategory]);

  return {
    selectedCategory,
    filteredReports,
    setSelectedCategory,
  };
};
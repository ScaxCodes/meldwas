import { useState, useCallback } from "react";
import type { Report, Location } from "../types";

export const useUI = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [clickedLocation, setClickedLocation] = useState<Location | null>(null);

  const handleToggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  const handleCreateReport = useCallback(() => {
    setIsReportFormOpen(true);
  }, []);

  const handleMapClick = useCallback((location: Location) => {
    setClickedLocation(location);
    setIsReportFormOpen(true);
  }, []);

  const handleReportFormClose = useCallback(() => {
    setIsReportFormOpen(false);
    setClickedLocation(null);
  }, []);

  const handleReportClick = useCallback((report: Report, isMobile: boolean) => {
    setSelectedReport(report);
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, []);

  const handleReportDetailClose = useCallback(() => {
    setSelectedReport(null);
  }, []);

  return {
    isMobileSidebarOpen,
    isReportFormOpen,
    selectedReport,
    clickedLocation,
    handleToggleMobileSidebar,
    handleCreateReport,
    handleMapClick,
    handleReportFormClose,
    handleReportClick,
    handleReportDetailClose,
  };
};
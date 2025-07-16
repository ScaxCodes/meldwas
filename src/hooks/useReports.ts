import { useState, useCallback } from "react";
import { dummyReports, currentUser } from "../utils/dummyData";
import type { Report, CreateReportData } from "../types";

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>(dummyReports);

  const handleReportSubmit = useCallback((data: CreateReportData) => {
    const newReport: Report = {
      id: crypto.randomUUID(),
      ...data,
      status: "pending",
      votes: { supports: 0 },
      comments: [],
      createdAt: new Date(),
      userId: currentUser.id,
      userName: currentUser.name,
    };

    setReports((prev) => [newReport, ...prev]);
  }, []);

  const handleSupport = useCallback((reportId: string) => {
    setReports((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          const currentSupport = report.votes.userSupport;
          const newVotes = { ...report.votes };

          // Toggle support
          if (currentSupport) {
            newVotes.supports -= 1;
            newVotes.userSupport = null;
          } else {
            newVotes.supports += 1;
            newVotes.userSupport = true;
          }

          return { ...report, votes: newVotes };
        }
        return report;
      })
    );
  }, []);

  const handleAddComment = useCallback((reportId: string, content: string) => {
    const newComment = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      userName: currentUser.name,
      content,
      createdAt: new Date(),
    };

    setReports((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          return { ...report, comments: [...report.comments, newComment] };
        }
        return report;
      })
    );
  }, []);

  return {
    reports,
    handleReportSubmit,
    handleSupport,
    handleAddComment,
  };
};
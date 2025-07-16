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
      votes: { upvotes: 0, downvotes: 0 },
      comments: [],
      createdAt: new Date(),
      userId: currentUser.id,
      userName: currentUser.name,
    };

    setReports((prev) => [newReport, ...prev]);
  }, []);

  const handleVote = useCallback((reportId: string, vote: "up" | "down") => {
    setReports((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          const currentVote = report.votes.userVote;
          const newVotes = { ...report.votes };

          // Remove previous vote if exists
          if (currentVote === "up") {
            newVotes.upvotes -= 1;
          } else if (currentVote === "down") {
            newVotes.downvotes -= 1;
          }

          // Add new vote if different from current
          if (currentVote !== vote) {
            if (vote === "up") {
              newVotes.upvotes += 1;
              newVotes.userVote = "up";
            } else {
              newVotes.downvotes += 1;
              newVotes.userVote = "down";
            }
          } else {
            newVotes.userVote = null;
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
    handleVote,
    handleAddComment,
  };
};
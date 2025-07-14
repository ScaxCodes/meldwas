import { useState } from "react";
import { MapView } from "./components/Map/MapView";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ReportForm } from "./components/UI/ReportForm";
import { ReportDetail } from "./components/UI/ReportDetail";
import { dummyReports, currentUser } from "./utils/dummyData";
import type {
  Report,
  CreateReportData,
  ReportCategory,
  Location,
} from "./types";

function App() {
  const [reports, setReports] = useState<Report[]>(dummyReports);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    ReportCategory | "all"
  >("all");
  const [clickedLocation, setClickedLocation] = useState<Location | null>(null);

  // Filter reports based on selected category
  const filteredReports = reports.filter(
    (report) =>
      selectedCategory === "all" || report.category === selectedCategory
  );

  const handleCreateReport = () => {
    setIsReportFormOpen(true);
  };

  const handleMapClick = (location: Location) => {
    setClickedLocation(location);
    setIsReportFormOpen(true);
  };

  const handleReportSubmit = (data: CreateReportData) => {
    const newReport: Report = {
      id: `report_${Date.now()}`,
      ...data,
      status: "pending",
      votes: { upvotes: 0, downvotes: 0 },
      comments: [],
      createdAt: new Date(),
      userId: currentUser.id,
      userName: currentUser.name,
    };

    setReports((prev) => [newReport, ...prev]);
    setClickedLocation(null);
  };

  const handleVote = (reportId: string, vote: "up" | "down") => {
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

    // Update selected report if it's the one being voted on
    if (selectedReport?.id === reportId) {
      const updatedReport = reports.find((r) => r.id === reportId);
      if (updatedReport) {
        setSelectedReport(updatedReport);
      }
    }
  };

  const handleAddComment = (reportId: string, content: string) => {
    const newComment = {
      id: `comment_${Date.now()}`,
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

    // Update selected report if it's the one being commented on
    if (selectedReport?.id === reportId) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, newComment],
            }
          : null
      );
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        reports={reports}
        isExpanded={isSidebarExpanded}
        onToggleExpanded={() => setIsSidebarExpanded(!isSidebarExpanded)}
        onCreateReport={handleCreateReport}
        onReportClick={setSelectedReport}
        selectedCategory={selectedCategory}
        onCategoryFilter={setSelectedCategory}
      />

      {/* Map */}
      <div
        className={`transition-all duration-300 ${
          isSidebarExpanded ? "ml-96" : "ml-16"
        }`}
      >
        <MapView
          reports={filteredReports}
          onMapClick={handleMapClick}
          onReportClick={setSelectedReport}
          selectedReport={selectedReport}
        />
      </div>

      {/* Report Creation Form */}
      <ReportForm
        isOpen={isReportFormOpen}
        onClose={() => {
          setIsReportFormOpen(false);
          setClickedLocation(null);
        }}
        onSubmit={handleReportSubmit}
        initialLocation={clickedLocation}
      />

      {/* Report Detail Modal */}
      {selectedReport && (
        <ReportDetail
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onVote={handleVote}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}

export default App;

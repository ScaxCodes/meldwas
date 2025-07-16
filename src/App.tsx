import { MapView } from "./components/Map/MapView";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ReportForm } from "./components/UI/ReportForm";
import { ReportDetail } from "./components/UI/ReportDetail";
import { useResponsive } from "./hooks/useResponsive";
import { useReports } from "./hooks/useReports";
import { useUI } from "./hooks/useUI";
import { useFiltering } from "./hooks/useFiltering";

function App() {
  const { isMobile } = useResponsive();
  const { reports, handleReportSubmit, handleVote, handleAddComment } = useReports();
  const {
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
  } = useUI();
  const { selectedCategory, filteredReports, setSelectedCategory } = useFiltering(reports);

  // Sidebar logic: Desktop always expanded, Mobile toggleable
  const isSidebarVisible = isMobile ? isMobileSidebarOpen : true;

  const handleReportSubmitWithCleanup = (data: any) => {
    handleReportSubmit(data);
    handleReportFormClose();
  };

  const handleVoteWithUpdate = (reportId: string, vote: "up" | "down") => {
    handleVote(reportId, vote);
    
    // Update selected report if it's the one being voted on
    if (selectedReport?.id === reportId) {
      const updatedReport = reports.find((r) => r.id === reportId);
      if (updatedReport) {
        // This will be handled by the useUI hook in a future update
      }
    }
  };

  const handleAddCommentWithUpdate = (reportId: string, content: string) => {
    handleAddComment(reportId, content);
    
    // Update selected report if it's the one being commented on
    if (selectedReport?.id === reportId) {
      // This will be handled by the useUI hook in a future update
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        reports={reports}
        isMobile={isMobile}
        isVisible={isSidebarVisible}
        onToggleMobile={handleToggleMobileSidebar}
        onCreateReport={handleCreateReport}
        onReportClick={(report) => handleReportClick(report, isMobile)}
        selectedCategory={selectedCategory}
        onCategoryFilter={setSelectedCategory}
      />

      {/* Map */}
      <div
        className={`transition-all duration-300 ${
          isMobile ? "ml-0" : "ml-96"
        }`}
      >
        <MapView
          reports={filteredReports}
          onMapClick={handleMapClick}
          onReportClick={(report) => handleReportClick(report, isMobile)}
          selectedReport={selectedReport}
        />
      </div>

      {/* Report Creation Form */}
      <ReportForm
        isOpen={isReportFormOpen}
        onClose={handleReportFormClose}
        onSubmit={handleReportSubmitWithCleanup}
        initialLocation={clickedLocation}
      />

      {/* Report Detail Modal */}
      {selectedReport && (
        <ReportDetail
          report={selectedReport}
          onClose={handleReportDetailClose}
          onVote={handleVoteWithUpdate}
          onAddComment={handleAddCommentWithUpdate}
        />
      )}
    </div>
  );
}

export default App;

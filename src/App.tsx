import { MapView } from "./components/Map/MapView";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ReportForm } from "./components/UI/ReportForm";
import { ReportDetail } from "./components/UI/ReportDetail";
import { useResponsive } from "./hooks/useResponsive";
import { useReports } from "./hooks/useReports";
import { useUI } from "./hooks/useUI";
import { useFiltering } from "./hooks/useFiltering";
import type { CreateReportData } from "./types";

function App() {
  const { isMobile } = useResponsive();
  const { reports, handleReportSubmit, handleSupport, handleAddComment } = useReports();
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

  const handleReportSubmitWithCleanup = (data: CreateReportData) => {
    handleReportSubmit(data);
    handleReportFormClose();
  };

  const handleSupportWithUpdate = (reportId: string) => {
    handleSupport(reportId);
  };

  const handleAddCommentWithUpdate = (reportId: string, content: string) => {
    handleAddComment(reportId, content);
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
      {selectedReport && (() => {
        const currentReport = reports.find(r => r.id === selectedReport.id);
        return currentReport ? (
          <ReportDetail
            report={currentReport}
            onClose={handleReportDetailClose}
            onSupport={handleSupportWithUpdate}
            onAddComment={handleAddCommentWithUpdate}
          />
        ) : null;
      })()}
    </div>
  );
}

export default App;

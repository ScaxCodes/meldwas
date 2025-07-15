import { useState, memo } from 'react';
import { FiMenu, FiPlus, FiFilter, FiX } from 'react-icons/fi';
import type { Report, ReportCategory } from '../../types';
import { REPORT_CATEGORIES } from '../../utils/dummyData';

interface SidebarProps {
  reports: Report[];
  isMobile: boolean;
  isVisible: boolean;
  onToggleMobile: () => void;
  onCreateReport: () => void;
  onReportClick?: (report: Report) => void;
  selectedCategory?: ReportCategory | 'all';
  onCategoryFilter: (category: ReportCategory | 'all') => void;
}

const SidebarComponent = ({
  reports,
  isMobile,
  isVisible,
  onToggleMobile,
  onCreateReport,
  onReportClick,
  selectedCategory = 'all',
  onCategoryFilter,
}: SidebarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const userReports = reports.filter(report => report.userId === 'user1'); // Mock current user

  // Mobile: overlay mode, Desktop: always visible
  const sidebarPosition = isMobile ? 'fixed' : 'fixed';
  const sidebarWidth = isVisible ? (isMobile ? '320px' : '384px') : '0px';
  const sidebarTransform = isMobile && !isVisible ? 'translateX(-100%)' : 'translateX(0)';
  
  if (isMobile && !isVisible) {
    // Mobile collapsed: show floating create button
    return (
      <>
        {/* Floating hamburger menu */}
        <button
          onClick={onToggleMobile}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FiMenu size={20} />
        </button>
        
        {/* Floating create button */}
        <button
          onClick={onCreateReport}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '16px',
            borderRadius: '50%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FiPlus size={24} />
        </button>
      </>
    );
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={onToggleMobile}
        />
      )}
      
      {/* Sidebar */}
      <div
        style={{
          position: sidebarPosition,
          left: 0,
          top: 0,
          height: '100vh',
          width: sidebarWidth,
          backgroundColor: 'white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          transform: sidebarTransform,
          transition: 'all 0.3s ease-in-out',
          zIndex: isMobile ? 1000 : 10,
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Meldwas</h1>
          {isMobile && (
            <button
              onClick={onToggleMobile}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX size={20} />
            </button>
          )}
        </div>

        {/* Content - Always expanded */}
        <div className="p-4 space-y-6">
          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={onCreateReport}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiPlus size={20} />
              Create Report
            </button>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <FiFilter size={16} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Filter by Category</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onCategoryFilter('all')}
                  className={`p-2 text-xs rounded transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {REPORT_CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => onCategoryFilter(category.value)}
                    className={`p-2 text-xs rounded transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* My Reports */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">My Reports ({userReports.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {userReports.length === 0 ? (
                <p className="text-gray-500 text-sm">No reports yet</p>
              ) : (
                userReports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => onReportClick?.(report)}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h4 className="font-medium text-sm text-gray-800 truncate">
                      {report.title}
                    </h4>
                    <p className="text-xs text-gray-600 capitalize">
                      {report.category.replace('_', ' ')}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          report.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : report.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {report.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        ↑ {report.votes.upvotes}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Memoized export for performance
export const Sidebar = memo(SidebarComponent);
import { useState } from 'react';
import { FiMenu, FiPlus, FiFilter, FiList, FiX } from 'react-icons/fi';
import type { Report, ReportCategory } from '../../types';
import { REPORT_CATEGORIES } from '../../utils/dummyData';

interface SidebarProps {
  reports: Report[];
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onCreateReport: () => void;
  onReportClick?: (report: Report) => void;
  selectedCategory?: ReportCategory | 'all';
  onCategoryFilter: (category: ReportCategory | 'all') => void;
}

export const Sidebar = ({
  reports,
  isExpanded,
  onToggleExpanded,
  onCreateReport,
  onReportClick,
  selectedCategory = 'all',
  onCategoryFilter,
}: SidebarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const userReports = reports.filter(report => report.userId === 'user1'); // Mock current user

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-10 ${
        isExpanded ? 'w-96' : 'w-16'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <button
          onClick={onToggleExpanded}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isExpanded ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        
        {isExpanded && (
          <h1 className="text-xl font-bold text-gray-800">Meldwas</h1>
        )}
      </div>

      {/* Compact view */}
      {!isExpanded && (
        <div className="p-2 space-y-4">
          <button
            onClick={onCreateReport}
            className="w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            title="Create Report"
          >
            <FiPlus size={20} />
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-12 h-12 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            title="Filter Reports"
          >
            <FiFilter size={20} />
          </button>
          
          <button
            onClick={onToggleExpanded}
            className="w-12 h-12 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            title="My Reports"
          >
            <FiList size={20} />
          </button>
        </div>
      )}

      {/* Expanded view */}
      {isExpanded && (
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
      )}
    </div>
  );
};
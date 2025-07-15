import { useState } from 'react';
import { FiThumbsUp, FiThumbsDown, FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import type { Report } from '../../types';
import { getCategoryColor } from '../../utils/categoryIcons';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
  onVote: (reportId: string, vote: 'up' | 'down') => void;
  onAddComment: (reportId: string, comment: string) => void;
}

export const ReportDetail = ({ report, onClose, onVote, onAddComment }: ReportDetailProps) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    onAddComment(report.id, newComment.trim());
    setNewComment('');
    setIsSubmittingComment(false);
  };

  const handleVote = (vote: 'up' | 'down') => {
    onVote(report.id, vote);
  };

  const categoryColor = getCategoryColor(report.category);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          width: '100%',
          maxWidth: '672px',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', margin: 0 }}>
                {report.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#4b5563' }}>
                <span
                  style={{ 
                    backgroundColor: categoryColor,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {report.category.replace('_', ' ').toUpperCase()}
                </span>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: report.status === 'published' 
                      ? '#dcfce7' 
                      : report.status === 'pending' 
                      ? '#fef3c7' 
                      : '#f3f4f6',
                    color: report.status === 'published' 
                      ? '#166534' 
                      : report.status === 'pending' 
                      ? '#92400e' 
                      : '#374151'
                  }}
                >
                  {report.status.toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                padding: '4px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* Report Details */}
          <div className="mb-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-800">
                {report.description || 'No description provided.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Reported by:</span> {report.userName}
              </div>
              <div>
                <span className="font-medium">Date:</span> {report.createdAt.toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Location:</span> {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
              </div>
            </div>
          </div>

          {/* Voting */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Community Feedback</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleVote('up')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  report.votes.userVote === 'up'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                <FiThumbsUp size={16} />
                <span>{report.votes.upvotes}</span>
              </button>
              
              <button
                onClick={() => handleVote('down')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  report.votes.userVote === 'down'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                <FiThumbsDown size={16} />
                <span>{report.votes.downvotes}</span>
              </button>
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <FiMessageSquare size={16} />
              Comments ({report.comments.length})
            </h3>
            
            {/* Comment List */}
            <div className="space-y-3 mb-4">
              {report.comments.length === 0 ? (
                <p className="text-gray-500 text-sm py-4">No comments yet. Be the first to comment!</p>
              ) : (
                report.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-800">{comment.userName}</span>
                      <span className="text-xs text-gray-500">
                        {comment.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmittingComment}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend size={16} />
                  {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
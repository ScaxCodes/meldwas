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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{report.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span
                  className="px-2 py-1 rounded text-white text-xs font-medium"
                  style={{ backgroundColor: categoryColor }}
                >
                  {report.category.replace('_', ' ').toUpperCase()}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    report.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : report.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {report.status.toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
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
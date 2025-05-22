export default function BugList({ bugs, onUpdate, onDelete }) {
  if (bugs.length === 0) return <p className="text-white">No bugs yet.</p>;

  return (
  <div className="space-y-4">
    {bugs.length === 0 ? (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-400 text-lg">No bugs reported yet</p>
        <p className="text-gray-500 text-sm mt-1">Submit your first bug report to get started</p>
      </div>
    ) : (
      bugs.map(bug => (
        <div key={bug._id} className="bg-gray-700 border border-gray-600 rounded-xl p-6 hover:bg-gray-650 transition-all duration-200 hover:shadow-lg">
          {/* Header with title and status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-medium text-white">{bug.title}</h3>
                {bug.status === 'resolved' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 bg-opacity-20 text-green-400 border border-green-600 border-opacity-30">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Resolved
                  </span>
                )}
              </div>
            </div>
            
            {/* Priority indicator */}
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
              bug.severity === 'high' ? 'bg-red-500' : 
              bug.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`} title={`${bug.severity} priority`}></div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4 leading-relaxed">{bug.description}</p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                bug.severity === 'high' ? 'bg-red-500' : 
                bug.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <span className="text-gray-400">
                <span className="font-medium text-gray-300 capitalize">{bug.severity}</span> Priority
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-400">
                Assigned to: <span className="font-medium text-gray-300">{bug.assignedTo || 'Unassigned'}</span>
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-600">
            <div className="flex items-center space-x-3">
              {bug.status !== 'resolved' && (
                <button
                  onClick={() => onUpdate(bug._id, { status: 'resolved' })}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark Resolved
                </button>
              )}
              
              <button
                onClick={() => onDelete(bug._id)}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>

            {/* Creation timestamp if available */}
            {bug.createdAt && (
              <span className="text-xs text-gray-500">
                {new Date(bug.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      ))
    )}
  </div>
);
}

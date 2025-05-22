import { useState } from 'react';

export default function BugForm({ onSubmit }) {
  const [bug, setBug] = useState({
    title: '',
    description: '',
    severity: 'low',
    assignedTo: ''
  });

  const handleChange = e => setBug({ ...bug, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!bug.title || !bug.description) return alert('Title and description required');
    onSubmit(bug);
    setBug({ title: '', description: '', severity: 'low', assignedTo: '' });
  };

  // return (
  //   <form onSubmit={handleSubmit} className="mb-4 space-y-3 bg-gray-100 p-4 rounded">
  //     <input
  //       name="title"
  //       value={bug.title}
  //       onChange={handleChange}
  //       placeholder="Bug Title"
  //       className="w-full p-2 border"
  //     />
  //     <textarea
  //       name="description"
  //       value={bug.description}
  //       onChange={handleChange}
  //       placeholder="Description"
  //       className="w-full p-2 border"
  //     />
  //     <div className="flex gap-4">
  //       <select name="severity" value={bug.severity} onChange={handleChange} className="p-2 border">
  //         <option value="low">Low</option>
  //         <option value="medium">Medium</option>
  //         <option value="high">High</option>
  //       </select>
  //       <input
  //         name="assignedTo"
  //         value={bug.assignedTo}
  //         onChange={handleChange}
  //         placeholder="Assign to (username)"
  //         className="p-2 border flex-1"
  //       />
  //     </div>
  //     <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Bug</button>
  //   </form>
  // );
  return (
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Title Input */}
    <div className="space-y-2">
      <label className="text-gray-300 text-sm font-medium block">Bug Title</label>
      <input
        name="title"
        value={bug.title}
        onChange={handleChange}
        placeholder="Enter a descriptive title..."
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>

    {/* Description Textarea */}
    <div className="space-y-2">
      <label className="text-gray-300 text-sm font-medium block">Description</label>
      <textarea
        name="description"
        value={bug.description}
        onChange={handleChange}
        placeholder="Describe the bug in detail, including steps to reproduce..."
        rows="4"
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
      />
    </div>

    {/* Severity and Assignee Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Severity Select */}
      <div className="space-y-2">
        <label className="text-gray-300 text-sm font-medium block">Severity Level</label>
        <div className="relative">
          <select 
            name="severity" 
            value={bug.severity} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="low" className="bg-gray-700">🟢 Low Priority</option>
            <option value="medium" className="bg-gray-700">🟡 Medium Priority</option>
            <option value="high" className="bg-gray-700">🔴 High Priority</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Assignee Input */}
      <div className="space-y-2">
        <label className="text-gray-300 text-sm font-medium block">Assign To</label>
        <div className="relative">
          <input
            name="assignedTo"
            value={bug.assignedTo}
            onChange={handleChange}
            placeholder="Enter username..."
            className="w-full px-4 py-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Priority Indicator */}
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${
          bug.severity === 'high' ? 'bg-red-500' : 
          bug.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
        }`}></div>
        <span className="text-gray-300 text-sm">
          Current Priority: <span className="font-medium text-white capitalize">{bug.severity || 'Low'}</span>
        </span>
      </div>
    </div>

    {/* Submit Button */}
    <button 
      type="submit" 
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span>Add Bug Report</span>
    </button>
  </form>
);
}

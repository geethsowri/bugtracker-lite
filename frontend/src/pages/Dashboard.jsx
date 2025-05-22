import { useEffect, useState } from 'react';
import axios from 'axios';
import BugForm from '../components/BugForm';
import BugList from '../components/BugList';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ token }) {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/');
    fetchBugs();
  }, [token]);

  const fetchBugs = async () => {
    const res = await axios.get('http://localhost:5000/api/bugs', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBugs(res.data);
  };

  const addBug = async bug => {
    await axios.post('http://localhost:5000/api/bugs', bug, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBugs();
  };

  const updateBug = async (id, updatedFields) => {
    await axios.put(`http://localhost:5000/api/bugs/${id}`, updatedFields, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBugs();
  };

  const deleteBug = async id => {
    await axios.delete(`http://localhost:5000/api/bugs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBugs();
  };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Dashboard</h2>
//         <button onClick={() => navigate('/activity')} className="bg-green-600 text-white px-4 py-2 rounded">View Heatmap</button>
//       </div>
//       <BugForm onSubmit={addBug} />
//       <BugList bugs={bugs} onUpdate={updateBug} onDelete={deleteBug} />
//     </div>
//   );
return (
  <div className="min-h-screen bg-gray-900">
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-light text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your bugs and track activity</p>
        </div>
        <button 
          onClick={() => navigate('/activity')} 
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>View Heatmap</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Bug Form Section */}
        <div className="xl:col-span-1">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white">Add New Bug</h3>
            </div>
            <BugForm onSubmit={addBug} />
          </div>
        </div>

        {/* Bug List Section */}
        <div className="xl:col-span-2">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white">Bug Tracker</h3>
              </div>
              <div className="text-sm text-gray-400">
                {bugs?.length || 0} {bugs?.length === 1 ? 'bug' : 'bugs'} total
              </div>
            </div>
            <BugList bugs={bugs} onUpdate={updateBug} onDelete={deleteBug} />
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Bugs</p>
              <p className="text-2xl font-bold text-white mt-1">{bugs?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-red-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Active Issues</p>
              <p className="text-2xl font-bold text-white mt-1">{bugs?.filter(bug => bug.status !== 'resolved').length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Resolved</p>
              <p className="text-2xl font-bold text-white mt-1">{bugs?.filter(bug => bug.status === 'resolved').length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
